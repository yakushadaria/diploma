import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (response.ok) {
                alert("Успішний вхід ✅");
            } else {
                alert("Невірний логін або пароль ❌");
            }

        } catch (error) {
            console.error(error);
            alert("Помилка з'єднання");
        }
    };

    return (
        <div style={{ maxWidth: "300px", margin: "50px auto" }}>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ display: "block", marginBottom: "10px", width: "100%" }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ display: "block", marginBottom: "10px", width: "100%" }}
                />

                <button type="submit" style={{ width: "100%" }}>
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;