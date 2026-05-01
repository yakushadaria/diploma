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
          <div className="grid">
            {courses.length === 0 && <p>Курсів поки немає</p>}
            {courses.map(course => (
                <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    language={course.language?.name || ""}
                    level={course.level || ""}
                    description={course.description}
                    teacher={course.teacher?.username || ""}
                />
            ))}
          </div>
        </div>
      </div>
  );
}

export default HomePage;