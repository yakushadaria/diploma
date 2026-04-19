import { useState } from "react";
import "./AuthPage.css";

function AuthPage() {
  const [mode, setMode] = useState("login");

  const [login, setLogin] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");


  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !email) {
      alert("Fill all fields");
      return;
    }

    if (username.length > 15) {
      alert("Username max 15 characters");
      return;
    }


    try {
      const res = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      });

      const text = await res.text();

      if (res.ok) {
        alert("Registered successfully ");

        setUsername("");
        setPassword("");
        setEmail("");

        setMode("login");
      } else {
        alert(text);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };


  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!login || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: login,
          password,
        }),
      });

      const text = await response.text();

      if (response.ok) {
        alert("Login success ");
        setLogin("");
        setPassword("");
      } else {
        alert(text || "Invalid credentials");
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

          {/* LOGIN */}
          {mode === "login" && (
              <>
                <input
                    type="text"
                    placeholder="Username or Email"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </>
          )}


          {/* REGISTER */}
          {mode === "register" && (
              <>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </>
          )}



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