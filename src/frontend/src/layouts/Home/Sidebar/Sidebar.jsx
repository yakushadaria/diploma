import "./Sidebar.css";

const languages = ["Англійська", "Українська", "Іспанська", "Французька", "Німецька", "Чеська", "Польська", "Японська", "Китайська", "Італійська"];
const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

function Sidebar({ search, setSearch, filterLang, setFilterLang, filterLevel, setFilterLevel, filterRating, setFilterRating, onReset }) {
  return (
    <div className="sidebar">
      <h2>Фільтр</h2>

      <h3>Пошук курсу</h3>
        <input
            type="text"
            placeholder="Введіть назву..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />


      <h3>Мова</h3>
        <select value={filterLang} onChange={(e) => setFilterLang(e.target.value)}>
            <option value="">Усі</option>
            {languages.map(l => (
                <option key={l} value={l}>{l}</option>
            ))}
        </select>


      <h3>Рівень</h3>
        <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)}>
            <option value="">Усі</option>
            {levels.map(l => (
                <option key={l} value={l}>{l}</option>
            ))}
        </select>

        <h3>Рейтинг</h3>
        <div style={{ display: "flex",
            gap: "3px",
            cursor: "pointer",
            fontSize: "18px", flexDirection: "column", }}>
            {[0, 3, 4, 5].map(r => (
                <label key={r} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "18px" }}>
                    <input
                        type="radio"
                        name="rating"
                        checked={filterRating === r}
                        onChange={() => setFilterRating(r)}
                        style={{
                            width: "20px",
                            height: "20px",
                            margin: "0",
                        }}
                    />
                    {r === 0 ? "Всі" : "від " + r + " ★"}
                </label>
            ))}
        </div>


      <button onClick={onReset}>Скинути</button>

    </div>
  );
}

export default Sidebar;



