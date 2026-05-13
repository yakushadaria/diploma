import "./AboutPage.css";

function AboutPage() {
    return (
        <div className="about-page">
            <section className="about-hero">

                <p>
                    CozyLingua — сучасна освітня платформа для вивчення іноземних мов.
                    Ми об'єднуємо студентів та викладачів, щоб зробити навчання
                    доступним, зручним та ефективним.
                </p>

            </section>

            <section className="about-features">
                <h2>Що ми пропонуємо ?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <span className="feature-icon">📚</span>
                        <h3>Різноманітні курси</h3>
                        <p>Англійська, українська, чеська, іспанська та інші мови</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">👨‍🏫</span>
                        <h3>Досвідчені викладачі</h3>
                        <p>Сертифіковані спеціалісти з практичним досвідом</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🎯</span>
                        <h3>Індивідуальний підхід</h3>
                        <p>Навчання у власному темпі з відстеженням прогресу</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">💬</span>
                        <h3>Інтерактивність</h3>
                        <p>Вправи, тести та спілкування в реальному часі</p>
                    </div>
                </div>
            </section>



            <section className="rules-list">
                <h2>Правила використання</h2>

                <div className="rules-content">
                    <div className="rules-image">
                        <img src="/images/cat.jpg" alt="Rules" />
                    </div>

                <ol>
                    <li>Користувач зобов'язаний поважати інших учасників платформи та дотримуватись норм етичної поведінки.</li>
                    <li>Забороняється публікація образливого, дискримінаційного, спам-контенту або матеріалів, що порушують законодавство.</li>
                    <li>Усі навчальні матеріали є власністю платформи та призначені лише для особистого використання.</li>
                    <li>Забороняється передавати дані свого облікового запису третім особам.</li>
                    <li>Один користувач може мати лише один акаунт.</li>
                    <li>Студент може бути записаний не більше ніж на 25 курсів одночасно.</li>
                    <li>Викладач може створити до 25 курсів на платформі.</li>
                    <li>Забороняється використання ботів або спроби злому системи.</li>
                    <li>Платформа має право видаляти контент або блокувати користувачів у разі порушення правил.</li>
                    <li>Користувач погоджується з політикою конфіденційності та обробкою персональних даних.</li>
                </ol>
                </div>
            </section>



            <section className="about-contacts">
                <div className="contacts-columns">
                    <div className="col">
                        <h4>Графік роботи</h4>
                        <p>Пн – Пт: 09:00 – 18:00</p>
                        <p>Сб – Нд: 10:00 – 12:00</p>
                    </div>

                    <div className="col">
                        <h4>Телефони</h4>
                        <p>+380 44 123 45 67</p>
                        <p>+380 67 987 65 43</p>
                    </div>

                    <div className="col">
                        <h4>Email</h4>
                        <p>support@cozylingua.com</p>
                        <p>admin@cozylingua.com</p>
                    </div>
                </div>

                <div className="contacts-bottom">
                    <p>
                        Telegram:
                        <a href= "https://t.me/ddd_yk" target="_blank" rel="noreferrer"> @ddd_yk</a>
                    </p>
                    <p>© 2026 CozyLingua. Всі права захищені.</p>
                </div>
                </section>
        </div>
    );
}

export default AboutPage;


