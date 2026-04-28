import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <h3>LinguaLearn</h3>
                    <p>Сучасна платформа для вивчення мов</p>
                </div>

                <div className="footer-contacts">
                    <h4>Контакти</h4>
                    <p>📧 support@linguallearn.com</p>
                    <p>📧 admin@linguallearn.com</p>
                    <p>📞 +380 44 123 45 67</p>
                    <p>📞 +380 67 987 65 43</p>
                </div>

                <div className="footer-info">
                    <h4>Інформація</h4>
                    <p>© 2026 LinguaLearn</p>
                    <p>Всі права захищені</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;