import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Фільтр</h2>

      <h3>Пошук курсу</h3>
      <input type="text" placeholder="Введіть назву..." />

      <h3>Мова</h3>
      <select>
        <option>Усі</option>
        <option>Українська</option>
        <option>Англійська</option>
      </select>

      <h3>Рівень</h3>
      <select>
        <option>Усі</option>
        <option>Початковий</option>
        <option>Середній</option>
        <option>Просунутий</option>
      </select>

      <button>Застосувати</button>
    </div>
  );
}

export default Sidebar;