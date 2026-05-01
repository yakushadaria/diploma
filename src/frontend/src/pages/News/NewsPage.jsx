import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./NewsPage.css";


function NewsPage() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/news")
            .then(res => res.json())
            .then(data => setNews(data));
    }, []);

    return (
        <div className="news-page">
            
            {news.length === 0 && <p>Новин поки немає</p>}

            <div className="news-list">
                {news.map(item => (
                    <div key={item.id} className="news-card">

                        {item.imageUrl && (
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="news-image"
                            />
                        )}

                        <div className="news-body">
                            <h2>{item.title}</h2>

                            <p className="news-date">
                                {new Date(item.createdAt).toLocaleDateString("uk-UA")}
                            </p>

                            <p className="news-content">
                                {item.content}
                            </p>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}

export default NewsPage;