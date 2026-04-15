import "./CourseCard.css";

function CourseCard({ title, language, level, description }) {
  return (
    <div className="card">
      <h2 className="title">{title}</h2>

      <div className="meta">
        <span>🌍 {language}</span>
        <span>📊 {level}</span>
      </div>

      <p className="desc">{description}</p>
    </div>
  );
}

export default CourseCard;