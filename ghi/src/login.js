import { useState } from "react";
import { handleErrorMessage } from "./utils";
import { useToken } from "./utils";

function Login() {
  const [token, login] = useToken();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="username">User Name</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter ursername"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
          />
        </div>
      </form>
      <button
        className="btn btn-primary"
        onClick={() => login(username, password)}
        type='button'
      >
        Submit
      </button>
    </>
  );
}
export default Login;
