import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";


import CourseCard from "../../components/CourseCard/CourseCard";


/*
function MyCoursesPage() {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (!user) return;
        fetch("http://localhost:8080/api/courses/my", {
            credentials: "include",
        })
            .then(res => res.ok ? res.json() : [])
            .then(data => setCourses(data))
            .catch(console.error);
    }, [user]);

    if (!user) { window.location.href = "/auth"; return null; }

    return (
        <div style={{ padding: "20px" }}>
            {courses.length === 0 && <p>Курсів поки немає</p>}
            <div className="grid">
                {courses.map(course => (
                    <Link key={course.id} to={"/course/" + course.id} style={{ textDecoration: "none", color: "inherit" }}>
                        <div className="card">
                            <h2>{course.title}</h2>
                            <p>{course.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MyCoursesPage;
*/




function MyCoursesPage() {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (!user) return;
        fetch("http://localhost:8080/api/courses/my", {
            credentials: "include",
        })
            .then(res => res.ok ? res.json() : [])
            .then(data => setCourses(data))
            .catch(console.error);
    }, [user]);

    const handleToggle = async (courseId) => {
        const res = await fetch("http://localhost:8080/api/courses/" + courseId + "/toggle", {
            method: "POST",
            credentials: "include",
        });

        const text = await res.text();
        if (res.ok) {
            setCourses(courses.map(c =>
                c.id === courseId ? { ...c, active: !c.active } : c
            ));
        } else {
            setMsg(text);
        }
    };

    if (!user) { window.location.href = "/auth"; return null; }

    return (
        <div style={{ padding: "20px" }}>
            {msg && <p style={{ color: "red" }}>{msg}</p>}
            {courses.length === 0 && <p>Курсів поки немає</p>}
            <div className="grid">
                {courses.map(course => (
                    <div key={course.id}>
                        <CourseCard
                            id={course.id}
                            title={course.title}
                            language={course.language?.name || ""}
                            level={course.level || ""}
                            description={course.description}
                            teacher={course.teacher?.username || ""}
                        />
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                            <span style={{ fontSize: "13px", color: course.active ? "#4a8a4a" : "#c44a4a" }}>
                                {course.active ? "✅ Активний" : "❌ Закритий"}
                            </span>
                            <button
                                onClick={() => handleToggle(course.id)}
                                style={{ fontSize: "13px", padding: "4px 12px", borderRadius: "8px", border: "1px solid #e8ddd2", cursor: "pointer" }}
                            >
                                {course.active ? "Закрити" : "Відкрити"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyCoursesPage;






