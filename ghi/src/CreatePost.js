import { useState } from "react";
import { useAuthContext } from "./utils";
import { useToken } from "./utils";
import { Navigate } from "react-router-dom";

// import { Link } from 'react-router-dom';

// subraddit
let subraddits = [
  { label: "Tech", value: "💻" },
  { label: "Movies", value: "🎬" },
  { label: "Music", value: "🎧" },
  { label: "Sports", value: "🏀" },
];

function CreatePostForm(props) {
  const [token] = useToken();
  //   const { token } = useAuthContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //   const [subraddit, setSubraddit] = useState("");
  // Using state to keep track of what the selected subraddit is
  const [subraddit, setSubraddit] = useState("⬇️ Select a subraddit ⬇️");
  const [user, setUser] = useState("");
  const data = {
    title: title,
    description: description,
    subraddit: subraddit,
    user_id: user,
  };

  async function post(data) {
    const url = `http://localhost:8001/api/posts`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchConfig);
  }
  //   if (!token){
  //     alert("Please login first")
  //     return <Navigate to = "/login"/>
  //   }
  return (
    <div className="d-flex justify-content-center">
      <div className="shadow-none p-3 mb-5 bg-warning rounded p-4 mt-4">
        <h1 style={{ color: "white" }}>Create a new post !</h1>
        <form>
          <div className="form-floating ">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
              type="text"
              name="Title"
              id="Title"
              className="form-control"
            />
            <label htmlFor="Title">Title</label>
          </div>
          <div className="form-group mb-4 ">
            <label htmlFor="exampleFormControlTextarea1"></label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="10"
              placeholder="Description"
            />
          </div>
          <div className="form-group mb-4 ">
            <label htmlFor="exampleFormControlTextarea1"></label>
            <textarea
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="form-control"
              id="exampleFormControlTextarea1"
              placeholder="User"
            />
          </div>
          {/* <div className="mb-3 ">
            <input
              value={subraddit}
              onChange={(e) => setSubraddit(e.target.value)}
              placeholder="SubRaddit"
              required
              type="text"
              name="subraddit"
              id="subraddit"
              className="form-control"
            />
            <label htmlFor="SubRaddit">SubRaddit</label>
            <select  placeholder="SubRaddit" required name="SubRaddit" id="SubRaddit" className="form-select">
                                <option value="">Choose a SubRaddit</option>
                            </select> */}
          {/* </div> */}
          <div className="App">
            {/* Displaying the value of subraddit */}
            {subraddit}
            <br />

            <select onChange={(e) => setSubraddit(e.target.value)}>
              <option value="⬇️ Select a subraddit⬇️">
                {" "}
                -- Select a subraddit --{" "}
              </option>
              {subraddits.map((subraddit) => (
                <option key={subraddit.value} value={subraddit.value}>
                  {subraddit.label}
                </option>
              ))}
            </select>
          </div>
          <button onClick={() => post(data)} className="btn btn-light">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostForm;
