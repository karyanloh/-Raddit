import { useState } from "react";
import { useToken } from "./utils";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, login] = useToken();

  return (
    <>
      <div className="row login-style">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4 loginfont">
            <h2 style={{ color: "black" }}>Please Login</h2>
            <form>
              <div className="form-floating mb-3">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                  type="text"
                  className="form-control"
                  id="username"
                />
                <label htmlFor="username">UserName</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  type="password"
                  className="form-control"
                  id="password"
                />
                <label htmlFor="password">Password</label>
              </div>

              <button
                className="btn btn-pink-moon"
                onClick={() => {
                  login(username, password);
                }}
                type="button"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
