import { useEffect, useState } from "react";
import { useAuthContext } from "./utils";
import { useNavigate } from "react-router-dom";

const api_url = `${process.env.REACT_APP_CONTENT_SERVICE_API_HOST}api/`

function CreateCommentForm(props) {
    const [isloading, setIsLoading] = useState(true);

    const { token, account } = useAuthContext();
    const navigate = useNavigate();
    function Isloading() {
        if (token != null) {
        setIsLoading(false);
        }
    }

    // useEffect(() => {
    //     Isloading();
    //     if ((!token) && (isloading ===false)){
    //     alert("Login Please");
    //     navigate("/login?redirect=/api/comments");
    //     }
    // }, [token], isloading,);

    const [commentBody, setCommentBody] = useState("")
    const [postId, setPostId] = useState("")

    async function comment(data) {

        const url =`${api_url}api/comments`

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
    const response = await fetch(url, fetchConfig);
    alert("Comment success");
    // navigate("/");
  }

    async function handleSubmit(e) {
        e.preventDefault();
        const data = {}

        comment({
        body: commentBody,
        user_id: account,
        post_id: postId,
        });
    }

    return (
        <div>
            <h3 style={{ color: "red" }}>Add a comment !</h3>
            <form onSubmit={handleSubmit}>
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
                <button className="btn btn-outline-danger">Add Comment</button>
                {/* <button>Comment</button> */}
            </form>
        </div>
    );
}

export default CreateCommentForm;