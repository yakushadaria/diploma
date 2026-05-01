import {useEffect, useState} from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./styles/NewsCreate.css";



function NewsForm({ onSuccess, editingItem, onCancel }) {
    const { user } = useAuth();

    const [form, setForm] = useState({ title: "", content: "", imageUrl: "" });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (editingItem) {
            setForm({
                title: editingItem.title,
                content: editingItem.content,
                imageUrl: editingItem.imageUrl || ""
            });

            if (editingItem.imageUrl) {
                setImagePreview("http://localhost:8080" + editingItem.imageUrl);
            }
        }
    }, [editingItem]);

    if (user?.role !== "ADMIN") {
        return <p>Доступ заборонено</p>;
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        if (!form.title || !form.content) {
            setMsg("Заповніть всі поля");
            return;
        }

        let imageUrl = form.imageUrl;

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

        const url = editingItem
            ? "http://localhost:8080/api/news/" + editingItem.id
            : "http://localhost:8080/api/news";

        const method = editingItem ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, imageUrl }),
        });

        if (res.ok) {
            onSuccess();
        }
    };

    return (
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
                <img src={imagePreview} alt="preview"
                     style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }} />
            )}

            <input type="file" accept="image/*" onChange={handleImageChange} />

            <button onClick={handleSubmit}>
                {editingItem ? "Зберегти зміни" : "Опублікувати"}
            </button>

            <button onClick={onCancel}>Скасувати</button>

            {msg && <p>{msg}</p>}
        </div>
    );
}

export default NewsForm;