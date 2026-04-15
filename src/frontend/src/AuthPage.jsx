import { useState } from "react";
import "./AuthPage.css";

function AuthPage() {
  const [mode, setMode] = useState("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (res.ok) {
        alert("Registered successfully ✅");
        setMode("login");
      } else {
        alert("Register error ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        alert("Login success ✅");
      } else {
        alert("Invalid credentials ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Connection error");
    }
  };

  return (
    <div className="auth">
      <div className="auth-card">
        <h2>{mode === "login" ? "Login" : "Register"}</h2>

        <form onSubmit={mode === "login" ? handleLogin : handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <p className="switch">
          {mode === "login" ? "No account?" : "Already have an account?"}{" "}
          <span onClick={() => setMode(mode === "login" ? "register" : "login")}>
            {mode === "login" ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;