import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function PostDetails() {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState("");
    const { id } = useParams(); // get the id from the URL
    const edit = {
        description: description
    }
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPost() {
            try {
                const postUrl = `http://localhost:8001/api/post/${id}`;
                const postResponse = await fetch(postUrl);
                const postData = await postResponse.json();
                setPost(postData);

                const scoreUrl = `http://localhost:8001/api/post/postScore/${id}`;
                const scoreResponse = await fetch(scoreUrl);
                const scoreData = await scoreResponse.json();
                setPost({ ...postData, score: scoreData.score });

                const commentsUrl = `http://localhost:8001/api/comments/${id}`;
                const commentsResponse = await fetch(commentsUrl);
                let commentData = await commentsResponse.json();
                commentData = (Object.values(commentData))
                setComments(commentData);

            } catch (error) {
                console.error(error);
                setPost({ error: 'Error fetching post' });
            } finally {
                setIsLoading(false);
            }
        }

        fetchPost();
    }, [id]);

    async function put(e) {
        e.preventDefault()
        const editUrl = `http://localhost:8001/api/post/${id}`;
                const fetchConfig = {
                    method: "put",
                    body: JSON.stringify(edit),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiOTllYmE3ZC0wN2ExLTQ4ZTktYWQ5NC1mMGZkMzE4YmM4NzUiLCJleHAiOjE2NzQwMTExMTQsInN1YiI6InRlc3QxMjMiLCJhY2NvdW50Ijp7ImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpZCI6IjYzYzczMTAzYjM3YjE1NDNmN2Q3MjM4OCIsInVzZXJuYW1lIjoidGVzdDEyMyJ9fQ.-Fg-vdZ-hhtAiDMJxZ9FxJwoWmggXxTzLZ0cWCjH4u8'}`,
                    }
                }
        const editResponse = await fetch(editUrl, fetchConfig);
        window.location.reload()
    }

    if (isLoading) {
        return <div className="spinner-border" animation="border" variant="primary" />;
    }

    if (isEditing) {
        return (
        <div className="card">
            <div className="card-header">
                <div className="d-flex justify-content-between">
                    <form onSubmit={put}>
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
          <button className="btn btn-light">Create</button>
        </form>
              </div>
            </div>
        </div>



    );
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    if (post.error) {
        return <div>{post.error}</div>;
    }

    return (
    <div>
        <div className="card">
            <div className="card-header">
                <div className="d-flex justify-content-between">
                    <div>
                        <h6 className="font-weight-bold mb-0">{post.score}</h6>
                        <p className="text-muted mb-0">points</p>
                        <button onClick={setIsEditing}className="btn btn-light">Edit</button>
                    </div>
                </div>
            </div>
            <div className="card-header">
              <div className="card-header">
                  <h6 className="card-title">{post.title}</h6>
                <div className="card-body">
                  <p className="card-text">{post.description}</p>
                </div>
              </div>
            </div>
        </div>
        {comments[0].map((comment) => {
                                return (
                                    <div className="card" key= {comment.body}>
                                        <div className="card-header">
                                            <p className="card-text">{comment.body}</p>
                                        </div>
                                    </div>
                                );
                            })}

    </div>



    );
}

export default PostDetails;
