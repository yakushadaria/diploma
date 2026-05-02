export const sidebarItems = {
  STUDENT: [
    {
      title: "Профіль",
      items: [
        { id: "view", label: "Вигляд" },
        { id: "avatar", label: "Змінити аватар" },
        { id: "email", label: "Змінити пошту" },
      ],
    },
    {
      title: "Навчання",
      items: [
        { id: "active", label: "Активні курси" },
        { id: "completed", label: "Завершені курси" },
        { id: "progress", label: "Перегляд прогресу" },
      ],
    },
    {
      title: "Система",
      items: [
        { id: "logout", label: "Вихід з акаунту" },
      ],
    },
  ],

  ADMIN: [
    {
      title: "Профіль",
      items: [
        { id: "view", label: "Вигляд" },
        { id: "avatar", label: "Змінити аватар" },
        { id: "email", label: "Змінити пошту" },
      ],
    },
    {
      title: "Керування",
      items: [
        { id: "users", label: "Перегляд користувачів" },
        { id: "roles", label: "Надати роль" },
        { id: "delete-user", label: "Видалити користувача" },
        { id: "delete-course", label: "Видалити курс" },
      ],
    },
    {
      title: "Новини",
      items: [
        { id: "news-list", label: "Усі новини" },
        { id: "news-add", label: "Додати новину" },
      ],
    },
    {
      title: "Система",
      items: [
        { id: "logout", label: "Вихід з акаунту" },
      ],
    },
  ],

  TEACHER: [
    {
      title: "Профіль",
      items: [
        { id: "view", label: "Вигляд" },
        { id: "avatar", label: "Змінити аватар" },
        { id: "email", label: "Змінити пошту" },
        { id: "description", label: "Змінити опис" },
      ],
    },
    {
      title: "Навчання",
      items: [
        { id: "add-course", label: "Додати курс" },
        { id: "delete-course", label: "Видалити курс" },
        { id: "manage-lessons", label: "Керування заняттями" },
      ],
    },
    {
      title: "Система",
      items: [
        { id: "logout", label: "Вихід з акаунту" },
      ],
    },
  ],
};