import { useState } from "react";

function SignUpForm(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function SignUp(e) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/users`;
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
    }
  }

  return (
    <form onSubmit={SignUp}>
      <div className="mb-4">
        <label htmlFor="username">Username</label>
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
      <div className="mb-4">
        <label htmlFor="email">Email address</label>
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
      <div className="mb-4">
        <label htmlFor="password">Password</label>
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          id="password"
          aria-describedby="password"
          placeholder="Password"
        />
      </div>
      <button>Sign up!</button>
    </form>
  );
}

export default SignUpForm;