import { useState } from "react";
import Register from "./Register";
import Login from "./Login";

function App() {
    const [page, setPage] = useState("register");

    return (
        <div style={{ padding: 20 }}>
            <h1>My App</h1>

            <button onClick={() => setPage("register")}>
                Register
            </button>

            <button onClick={() => setPage("login")}>
                Login
            </button>

            <hr />

            {page === "register" ? <Register /> : <Login />}
        </div>
    );
}

export default App;