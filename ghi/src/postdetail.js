import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./utils";

const api_url = 'http://localhost:8001/api/'
function PostDetails() {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState("");
    const [loggedInID, setloggedInID] = useState("");
    const { id } = useParams();
    const edit = {
        description: description
    }
    const navigate = useNavigate();
    const { token } = useAuthContext();

    function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

    useEffect(() => {
        fetchPost();
        fetchScore();
        fetchComments();
        if (token) {
        let data = parseJwt(token)
        setloggedInID(data.account.id)
        }
    }, [id, token]);

    async function fetchPost() {
        try {
            const postUrl = `${api_url}post/${id}`;
            const postResponse = await fetch(postUrl);
            const postData = await postResponse.json();
            setPost(postData);
            setDescription(postData.description)
            fetchScore(postData);
            fetchComments();
        } catch (error) {
            console.error(error);
            setPost({ error: 'Error fetching post' });
        }
    }

    async function fetchScore(postData) {
        try {
            const scoreUrl = `${api_url}post/postScore/${id}`;
            const scoreResponse = await fetch(scoreUrl);
            const scoreData = await scoreResponse.json();
            setPost({ ...postData, score: scoreData.score });
        } catch (error) {
            console.error(error);
            setPost({ error: 'Error fetching score' });
        }
    }

    async function fetchComments() {
        try {
            const commentsUrl = `${api_url}comments/${id}`;
            const commentsResponse = await fetch(commentsUrl);
            let commentData = await commentsResponse.json();
            commentData = (Object.values(commentData))
            setComments(commentData);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setComments({ error: 'Error fetching comments' });
        }
    }

    async function put(e) {
        e.preventDefault()
        const editUrl = `${api_url}post/${id}`;
                const fetchConfig = {
                    method: "put",
                    body: JSON.stringify(edit),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
        const editResponse = await fetch(editUrl, fetchConfig);
        if(editResponse.ok) {
            const updatedPost = await editResponse.json();
            setPost(updatedPost);
            setIsEditing(false);
        } else {
            console.error('Error updating post')
        }
    }
    async function del(e) {
        e.preventDefault()
        const delUrl = `${api_url}delete/${id}`;
        const fetchConfig = {
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
        const delResponse = await fetch(delUrl,fetchConfig);
        if(delResponse.ok) {

        } else {
            console.error('Error deleting post')
        }
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
                                placeholder={post.description}
                                />
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button onClick={() => setIsEditing(false)} className="btn btn-secondary"> Cancel</button>
                    </form>
                </div>
            </div>
        </div>
                    );
                    }

    if (post.error) {
        return <div>{post.error}</div>;
    }

    if (token && loggedInID == post.user_id) {
       return (
    <div>
        <div className="card">
            <div className="card-header">
                <div className="d-flex justify-content-between">
                    <div>
                        <h6 className="card-title">{post.title}</h6>
                        <p className="card-subtitle mb-2 text-muted">
                            Score: {post.score}
                        </p>
                    </div>
                    <div>
                        <button className="btn btn-secondary mr-2">
                            Upvote
                        </button>
                        <button className="btn btn-secondary">
                            Downvote
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <p className="card-text">{post.description}</p>
            </div>
            <div className="card-footer">
                <div className="d-flex justify-content-between">
                    <div>
                        <button onClick={setIsEditing} className="btn btn-secondary">Edit</button>
                        <button onClick={del} className="btn btn-secondary">
                            Delete
                        </button>
                    </div>
                    <div>
                        <p className="card-subtitle mb-2 text-muted">
                            {comments[0].length} comments
                        </p>
                    </div>
                </div>
            </div>
        </div>
        {comments[0].map((comment) => {
                                return (
                                    <div className="mt-2"  key={comment.id}>
                                        <div className="card" >
                                            <div className="card-header" >
                                                <p className="card-text">{comment.id}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}


    </div>
    );
    }
    else if (token) {
        return (
    <div>
        <div className="card">
            <div className="card-header">
                <div className="d-flex justify-content-between">
                    <div>
                        <h6 className="card-title">{post.title}</h6>
                        <p className="card-subtitle mb-2 text-muted">
                            Score: {post.score}
                        </p>
                    </div>
                    <div>
                        <button className="btn btn-secondary mr-2">
                            Upvote
                        </button>
                        <button className="btn btn-secondary">
                            Downvote
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <p className="card-text">{post.description}</p>
            </div>
            <div className="card-footer">
                <div className="d-flex justify-content-between">
                    <div>
                        <p className="card-subtitle mb-2 text-muted">
                            {comments[0].length} comments
                        </p>
                    </div>
                </div>
            </div>
        </div>
        {comments[0].map((comment) => {
                                return (
                                    <div className="mt-2"  key={comment.id}>
                                        <div className="card" >
                                            <div className="card-header" >
                                                <p className="card-text">{comment.id}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}


    </div>
    );
    }
    else {
        return (
        <div>
            <div className="card">
                <div className="card-header">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h6 className="card-title">{post.title}</h6>
                            <p className="card-subtitle mb-2 text-muted">
                                Score: {post.score}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <p className="card-text">{post.description}</p>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-between">
                        <div>
                            <p className="card-subtitle mb-2 text-muted">
                                {comments[0].length} comments
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {comments[0].map((comment) => {
                                    return (
                                        <div className="mt-2"  key={comment.id}>
                                            <div className="card" >
                                                <div className="card-header" >
                                                    <p className="card-text">{comment.id}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}


        </div>
        );
                            }
}
export default PostDetails;
