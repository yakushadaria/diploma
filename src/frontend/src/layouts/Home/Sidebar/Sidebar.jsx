import "./Sidebar.css";

const languages = ["Англійська", "Українська", "Іспанська", "Французька", "Німецька", "Чеська", "Польська", "Японська", "Китайська", "Італійська"];
const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

function Sidebar({ search, setSearch, filterLang, setFilterLang, filterLevel, setFilterLevel, onReset }) {
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


      <button onClick={onReset}>Скинути</button>

    </div>
  );
}

export default Sidebar;



// <button>Застосувати</button>