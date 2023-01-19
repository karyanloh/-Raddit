import { useEffect, useState } from "react";
import { useAuthContext } from "./utils";
import { useNavigate } from "react-router-dom";

// subraddit
let subraddits = [
  { label: "Tech", value: "Tech" },
  { label: "Movies", value: "Movies" },
  { label: "Music", value: "Music" },
  { label: "Sports", value: "Sports" },
  { label: "Miscellaneous", value: "Miscellaneous" },
];


function CreatePostForm(props) {
  const [isloading, setIsLoading] = useState(true);

  const { token, account } = useAuthContext();
  const navigate = useNavigate();
  function Isloading() {
    if (token != null) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    Isloading();
    if ((!token) && (isloading ===false)){
      alert("Login Please");
      navigate("/login?redirect=/post/new");
    }
  }, [token]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subraddit, setSubraddit] = useState("⬇️ Select a subraddit ⬇️");

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
    alert("Post success");
    navigate("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    post({
      title: title,
      description: description,
      subraddit: subraddit,
      user_id: account,
    });
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="shadow-none p-3 mb-5 bg-warning rounded p-4 mt-4">
        <h1 style={{ color: "white" }}>Create a new post !</h1>
        <form onSubmit={handleSubmit}>
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
          <div className="App">
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
          <button className="btn btn-light">Create</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostForm;
