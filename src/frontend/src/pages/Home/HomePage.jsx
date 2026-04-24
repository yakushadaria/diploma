/*


import Sidebar from "../../layouts/Sidebar/Sidebar";
import CourseCard from "../../components/CourseCard";
import "./HomePage.css"


function HomePage() {
  return (
    <div className="layout">
      <Sidebar />

      <div style={{ padding: "10px" }}>
        <h1 style={{ textAlign: "center" }}>Курси</h1>

        <div className="grid">
          <CourseCard
            id={1}
            title="English for Beginners"
            language="English"
            level="Beginner"
            description="Learn basic grammar, vocabulary and everyday conversation."
          />

          <CourseCard
            id={2}
            title="Ukrainian for Foreigners"
            language="Ukrainian"
            level="Beginner"
            description="Start speaking Ukrainian from zero with simple phrases and dialogues."
          />

          <CourseCard
            id={3}
            title="Czech for Daily Life"
            language="Czech"
            level="Beginner"
            description="Essential Czech for travel, shopping and everyday communication."
          />

          <CourseCard
            id={4}
            title="English Conversation Practice"
            language="English"
            level="Intermediate"
            description="Improve speaking skills with real-life dialogues and topics."
          />

          <CourseCard
            id={5}
            title="Ukrainian Grammar Basics"
            language="Ukrainian"
            level="Intermediate"
            description="Understand grammar rules and sentence structure step by step."
          />

          <CourseCard
            id={6}
            title="Czech Survival Course"
            language="Czech"
            level="Beginner"
            description="Quick phrases to survive in Czechia as a foreigner."
          />
        </div>

      </div>
    </div>
  );
}

export default HomePage; */




import { useState, useEffect } from "react";
import Sidebar from "../../layouts/Sidebar/Sidebar";
import CourseCard from "../../components/CourseCard";
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
        <div style={{ padding: "10px" }}>
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