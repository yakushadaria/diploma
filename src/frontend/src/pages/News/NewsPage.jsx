import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./NewsPage.css";


import aus from "../../assets/news/Australia.jpg";
import beg from "../../assets/news/Belgium.jpg";
import brz from "../../assets/news/Brazil.jpg";
import can from "../../assets/news/Canada.jpg";
import col from "../../assets/news/Colombia.jpg";
import egp from "../../assets/news/Egypt.jpg";
import fra from "../../assets/news/France.jpg";
import gre from "../../assets/news/Greece.jpg";
import ind from "../../assets/news/India.jpg";
import itl from "../../assets/news/Italy.jpg";
import mex from "../../assets/news/Mexico.jpg";
import nth from "../../assets/news/Netherlands.jpg";
import prt from "../../assets/news/Portugal.jpg";
import stk from "../../assets/news/SouthKorea.jpg";
import spn from "../../assets/news/Spain.jpg";
import thl from "../../assets/news/Thailand.jpg";
import trk from "../../assets/news/Turkey.jpg";

/*
export const newsImages = [
    { img: aus, label: "Australia" },
    { img: beg, label: "Belgium" },
    { img: brz, label: "Brazil" },
    { img: can, label: "Canada" },
    { img: col, label: "Colombia" },
    { img: egp, label: "Egypt" },
    { img: fra, label: "France" },
    { img: gre, label: "Greece" },
    { img: ind, label: "India" },
    { img: itl, label: "Italy" },
    { img: mex, label: "Mexico" },
    { img: nth, label: "Netherlands" },
    { img: prt, label: "Portugal" },
    { img: stk, label: "South Korea" },
    { img: spn, label: "Spain" },
    { img: thl, label: "Thailand" },
    { img: trk, label: "Turkey" }
];



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
                                src={`http://localhost:8080${item.imageUrl}`}
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

 */



function NewsPage() {
    const [news, setNews] = useState([]);

    const images = [
        aus, beg, brz, can, col, egp, fra,
        gre, ind, itl, mex, nth, prt, stk,
        spn, thl, trk
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/api/news")
            .then(res => res.json())
            .then(data => setNews(data));
    }, []);

    return (
        <div className="news-layout">

            {/* LEFT - NEWS */}
            <div className="news-page">

                {news.length === 0 && <p>Новин поки немає</p>}

                <div className="news-list">

                    {news.map(item => (
                        <div key={item.id} className="news-card">

                            {item.imageUrl && (
                                <img
                                    src={`http://localhost:8080${item.imageUrl}`}
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

            {/* RIGHT - SIDEBAR SLIDER */}
            <div className="news-sidebar">



                <div className="slider">
                    <img
                        src={images[index]}
                        alt="country"
                        className="slider-image"
                    />


                </div>

            </div>

        </div>
    );
}

export default NewsPage;