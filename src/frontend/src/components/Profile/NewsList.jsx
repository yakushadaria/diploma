import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import NewsForm from "./NewsCreate.jsx";
import "./styles/NewsList.css";


function NewsList() {
    const { user } = useAuth();

    const [news, setNews] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const loadNews = async () => {
        const data = await fetch("http://localhost:8080/api/news").then(r => r.json());
        setNews(data);
    };

    useEffect(() => {
        loadNews();
    }, []);

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

            {showForm && (
                <NewsForm
                    editingItem={editingItem}
                    onSuccess={() => {
                        setShowForm(false);
                        setEditingItem(null);
                        loadNews();
                    }}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingItem(null);
                    }}
                />
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
                                    <button onClick={() => {
                                        setEditingItem(item);
                                        setShowForm(true);
                                    }}>
                                        Редагувати
                                    </button>

                                    <button onClick={() => handleDelete(item.id)}>
                                        Видалити
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewsList;