import { useEffect, useState } from "react";

function SignUpForm(props) {
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  useEffect(
    () =>
      //   async function handleSubmit(e){
      //     e.preventDefault();
      //     const url = "http://localhost:8000/api/users/"
      //     const fetchOptions={
      //         method: 'post',
      //         body: JSON.stringify(signupInfo),
      //         headers:{
      //             "Content-Type": "application/json",
      //         }
      //     }
      //     const response = await fetch(url, fetchOptions)

      async function signup(username, password, email) {
        const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/users/`;
        const response = await fetch(url, {
          method: "post",
          body: JSON.stringify({
            username,
            password,
            email,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
               setSignupInfo({ username: "", email: "", password: "" });

          },[signupInfo]
        }
        return false;
      }
  );

  return (
    <form
      onSubmit={() =>
        signup(signupInfo.username, signupInfo.password, signupInfo.password)
      }
    >
      <div className="mb-4">
        <label htmlFor="username">Username</label>
        <input
          type="username"
          //   value={signupInfo.username}
          onChange={(e) => setSignupInfo.username(e.target.value)}
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
          //   value={signupInfo.email}
          onChange={(e) => setSignupInfo(e.target.value)}
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
          onChange={(e) => setSignupInfo(e.target.value)}
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
