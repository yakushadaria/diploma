import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./NewsPage.css";

function NewsPage() {
    const { user } = useAuth();
    const [news, setNews] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ title: "", content: "", imageUrl: "" });
    const [showForm, setShowForm] = useState(false);
    const [msg, setMsg] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        if (!form.title || !form.content) { setMsg("Заповніть всі поля"); return; }

        let imageUrl = form.imageUrl;

        // загружаем фото если выбрано
        if (imageFile) {
            const formData = new FormData();
            formData.append("file", imageFile);

            const uploadRes = await fetch("http://localhost:8080/api/news/upload-image", {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            if (uploadRes.ok) {
                imageUrl = await uploadRes.text();
            }
        }

        const url = editing
            ? "http://localhost:8080/api/news/" + editing
            : "http://localhost:8080/api/news";

        const method = editing ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, imageUrl }),
        });

        if (res.ok) {
            const updated = await fetch("http://localhost:8080/api/news").then(r => r.json());
            setNews(updated);
            setForm({ title: "", content: "", imageUrl: "" });
            setImageFile(null);
            setImagePreview("");
            setEditing(null);
            setShowForm(false);
            setMsg("");
        }
    };

    const handleEdit = (item) => {
        setEditing(item.id);
        setForm({ title: item.title, content: item.content, imageUrl: item.imageUrl || "" });
        setImagePreview(item.imageUrl ? "http://localhost:8080" + item.imageUrl : "");
        setShowForm(true);
    };


    const handleDelete = async (id) => {
        const ok = window.confirm("Видалити новину?");
        if (!ok) return;

        const res = await fetch("http://localhost:8080/api/news/" + id, {
            method: "DELETE",
            credentials: "include",
        });

        if (res.ok) {
            setNews(news.filter(n => n.id !== id));
        }
    };

    return (
        <div className="news-page">

            {user?.role === "ADMIN" && (
                <button className="news-add-btn" onClick={() => { setShowForm(!showForm); setEditing(null); setForm({ title: "", content: "", imageUrl: "" }); }}>
                    {showForm ? "Скасувати" : "+ Додати новину"}
                </button>
            )}

            {showForm && user?.role === "ADMIN" && (
                <div className="news-form">
                    <input
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="Заголовок"
                    />
                    <textarea
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        placeholder="Текст новини"
                        rows={5}
                    />

                    {imagePreview && (
                        <img src={imagePreview} alt="preview" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }} />
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    <button onClick={handleSubmit}>
                        {editing ? "Зберегти зміни" : "Опублікувати"}
                    </button>
                    {msg && <p>{msg}</p>}
                </div>
            )}

            <div className="news-list">
                {news.length === 0 && <p>Новин поки немає</p>}
                {news.map(item => (
                    <div key={item.id} className="news-card">
                        {item.imageUrl && (
                            <img src={item.imageUrl} alt={item.title} className="news-image" />
                        )}
                        <div className="news-body">
                            <h2>{item.title}</h2>
                            <p className="news-date">
                                {new Date(item.createdAt).toLocaleDateString("uk-UA")}
                            </p>
                            <p className="news-content">{item.content}</p>

                            {user?.role === "ADMIN" && (
                                <div className="news-actions">
                                    <button onClick={() => handleEdit(item)}>Редагувати</button>
                                    <button onClick={() => handleDelete(item.id)}>Видалити</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewsPage;