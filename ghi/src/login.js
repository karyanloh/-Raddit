import { useState } from "react";
import { useToken } from "./utils";
import raddit from "./raddit_new.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, login] = useToken();
  console.log('required console log for lintr', token)

  return (
    <>
      <div className="wrapper ">
        <div className="logo">
          <img src={raddit} alt="" />
        </div>
        <div className="text-center mt-4 name">Raddit</div>
        <form className="p-3 mt-3">
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-user"></span>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <button
            className="btn mt-3"
            onClick={() => {
              login(username, password);
            }}
            type="button"
          >
            Log in
          </button>
        </form>
        <div className="text-center fs-6">
          <a href="/signup">Not a user? Sign up now</a>
        </div>
      </div>
    </>
  );
}
export default Login;
