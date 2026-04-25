import { useState, useEffect } from "react";
import Sidebar from "../../layouts/Home/Sidebar/Sidebar";
import CourseCard from "../../components/CourseCard/CourseCard";
import "./HomePage.css";

function HomePage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/courses")
        .then(res => res.ok ? res.json() : [])
        .then(data => setCourses(data))
        .catch(console.error);
  }, []);

  return (
      <div className="layout">
        <Sidebar />
        <div className="home-page-content" style={{ padding: "10px" }}>
          <h1 style={{ textAlign: "center" }}>Курси</h1>
          <div className="grid">
            {courses.length === 0 && <p>Курсів поки немає</p>}
            {courses.map(course => (
                <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    language={course.language?.name || ""}
                    description={course.description}
                />
            ))}
          </div>
        </div>
      </div>
  );
}

export default HomePage;