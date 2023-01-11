import { useState } from "react";

function SignUpForm(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    return (
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="mb-4">
          <label htmlFor="username">Username</label>
          <input
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
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="password"
            aria-describedby="password"
            placeholder="Password"
          />
        </div>
      </Form>
    );
  };
}

export default SignUpForm;
