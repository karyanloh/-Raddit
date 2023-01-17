import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useToken } from "./utils";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();
  const [token, login] = useToken();

  // async function login1(username, password) {
  //   const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`;

  //   const form = new FormData();
  //   form.append("username", username);
  //   form.append("password", password);

  //   const response = await fetch(url, {
  //     method: "post",
  //     credentials: "include",
  //     body: form,
  //   });
  //   if (response.ok) {
  //     const tokenUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`;

  //     try {
  //       const response = await fetch(tokenUrl, {
  //         credentials: "include",
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         const token = data.access_token;
  //         alert("success!")
  //         navigate("/");
  //         // DO SOMETHING WITH THE TOKEN SO YOU CAN USE IT
  //         // IN REQUESTS TO YOUR NON-ACCOUNTS SERVICES
  //       }
  //     } catch (e) {

  //     }
  //     return false;
  //   }
  //   let error = await response.json();
  //   alert(`Error: ${error.detail}`);
  //   navigate("/signup");
  //   // DO SOMETHING WITH THE ERROR, IF YOU WANT
  // }
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
        <button
          className="btn btn-primary"
          onClick={() => {
            login(username, password);
          }}
          type="button"
        >
          Submit
        </button>
      </form>
    </>
  );
}
export default Login;
