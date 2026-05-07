import { useState, useEffect } from "react";
import Sidebar from "../../layouts/Home/Sidebar/Sidebar";
import CourseCard from "../../components/CourseCard/CourseCard";
import "./HomePage.css";


function HomePage() {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [filterLang, setFilterLang] = useState("");
    const [filterLevel, setFilterLevel] = useState("");

    const [ratings, setRatings] = useState({});
    const [filterRating, setFilterRating] = useState(0);



    useEffect(() => {
    fetch("http://localhost:8080/api/courses")
        .then(res => res.ok ? res.json() : [])
        .then(async (data) => {
            setCourses(data);
            const ratingsMap = {};
            for (const course of data) {
                const res = await fetch("http://localhost:8080/api/courses/" + course.id + "/rating");
                if (res.ok) {
                    const r = await res.json();
                    ratingsMap[course.id] = r.average || 0;
                }
            }
            setRatings(ratingsMap);
        })
        .catch(console.error);
}, []);



    const filtered = courses.filter(course => {
        const searchMatch = !search ||
            course.title.toLowerCase().includes(search.toLowerCase()) ||
            course.teacher?.username?.toLowerCase().includes(search.toLowerCase());
        const langMatch = !filterLang || course.language?.name === filterLang;
        const levelMatch = !filterLevel || course.level === filterLevel;
        const ratingMatch = !filterRating || (ratings[course.id] || 0) >= Number(filterRating);
        return searchMatch && langMatch && levelMatch && ratingMatch;
    });



    const handleReset = () => {
        setSearch("");
        setFilterLang("");
        setFilterLevel("");
        setFilterRating(0);
    };



  return (
      <div className="layout">
        <Sidebar
            search={search}
            setSearch={setSearch}
            filterLang={filterLang}
            setFilterLang={setFilterLang}
            filterLevel={filterLevel}
            setFilterLevel={setFilterLevel}
            filterRating={filterRating}
            setFilterRating={setFilterRating}
            onReset={handleReset}
        />
        <div className="home-page-content" style={{ padding: "10px" }}>

          <div className="grid">
              {filtered.length === 0 && <p>Курсів не знайдено</p>}
              {filtered.map(course => (
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