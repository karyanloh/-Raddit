import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PostDetails() {
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState("");
    const { id } = useParams(); // get the id from the URL
    const edit = {
        description: description
    }
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
            } catch (error) {
                console.error(error);
                setPost({ error: 'Error fetching post' });
            } finally {
                setIsLoading(false);
            }
        }

        fetchPost();
    }, [id]);

    async function put() {
        const editUrl = `http://localhost:8001/api/post/${id}`;
                const fetchConfig = {
                    method: "put",
                    body: JSON.stringify(edit),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4YTM4MDIxMy1iMzNkLTQ2YzAtOTczOS04NGRiZjJjY2MzYjAiLCJleHAiOjE2NzQwMDQxNzAsInN1YiI6InJqIiwiYWNjb3VudCI6eyJlbWFpbCI6InJqQGdtYWlsLmNvbSIsImlkIjoiNjNjNzMwMjMzZDMxYjFjMWMwYTQxY2Y1IiwidXNlcm5hbWUiOiJyaiJ9fQ.pBet_LOZZJW_5WCUMT9igZ_8WCAdB_KBi_OgHism6mk'}`,
                    }
                }
                const editResponse = await fetch(editUrl, fetchConfig);
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



    );
}

export default PostDetails;
