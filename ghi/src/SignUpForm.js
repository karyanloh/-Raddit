import { useState } from "react";
import { useNavigate } from "react-router-dom";
import raddit from "./raddit_new.png";

function SignUpForm(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function SignUp(e) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}api/users`;
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify({
        username,
        password,
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setUsername("");
      setEmail("");
      setPassword("");
      alert("sucess!")
      navigate("/login");
    }
  }

  return (
    <>
      <div className="wrapper">
        <div className="logo">
          <img src={raddit} alt="" />
        </div>
        <div className="text-center mt-4 name">Raddit</div>
        <form className="p-3 mt-3" onSubmit={SignUp}>
          <div className="form-field d-flex align-items-center">
            <span className="fas"></span>
            <input
              value={username}
              type="username"
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              id="username"
              aria-describedby="username"
              placeholder="Enter username"
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas"></span>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email"
              aria-describedby="email"
              placeholder="Enter email"
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas"></span>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="password"
              aria-describedby="password"
              placeholder="Enter Password"
            />
          </div>
          <button className="btn mt-3">Sign up</button>
        </form>
        <div className="text-center fs-6">
          <a href="/login">Already a user? Log in now</a>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
