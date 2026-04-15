import Sidebar from "./Sidebar";
import CourseCard from "./CourseCard";
import "./HomePage.css"


function HomePage() {
  return (
    <div className="layout">
      <Sidebar />

      <div style={{ padding: "10px" }}>
        <h1 style={{ textAlign: "center" }}>Курси</h1>

        <div className="grid">
          <CourseCard
            title="English for Beginners"
            language="English"
            level="Beginner"
            description="Learn basic grammar, vocabulary and everyday conversation."
          />

          <CourseCard
            title="Ukrainian for Foreigners"
            language="Ukrainian"
            level="Beginner"
            description="Start speaking Ukrainian from zero with simple phrases and dialogues."
          />

          <CourseCard
            title="Czech for Daily Life"
            language="Czech"
            level="Beginner"
            description="Essential Czech for travel, shopping and everyday communication."
          />

          <CourseCard
            title="English Conversation Practice"
            language="English"
            level="Intermediate"
            description="Improve speaking skills with real-life dialogues and topics."
          />

          <CourseCard
            title="Ukrainian Grammar Basics"
            language="Ukrainian"
            level="Intermediate"
            description="Understand grammar rules and sentence structure step by step."
          />

          <CourseCard
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

export default HomePage;