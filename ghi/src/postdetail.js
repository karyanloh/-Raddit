import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./utils";

const api_url = 'http://localhost:8001/api/'
// const api_url = `${process.env.REACT_APP_CONTENT_SERVICE_API_HOST}`
function PostDetails() {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState("");
    const { id } = useParams();
    const edit = {
        description: description
    }
    const navigate = useNavigate();
    const { token, account } = useAuthContext();

    useEffect(() => {
    async function fetchPostandScore() {
        try {
            const postUrl = `${api_url}post/${id}`;
            const postResponse = await fetch(postUrl);
            const postData = await postResponse.json();

            const scoreUrl = `${api_url}post/postScore/${id}`;
            const scoreResponse = await fetch(scoreUrl);
            const scoreData = await scoreResponse.json();

            setPost(postData);
            setPost({ ...postData, score: scoreData.score });
            setDescription(postData.description)
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setPost({ error: 'Error fetching post' });
        }
    }

    async function fetchComments() {
        try {
            const commentsUrl = `${api_url}comments/${id}`;
            const commentsResponse = await fetch(commentsUrl);
            let commentData = await commentsResponse.json();
            commentData = (Object.values(commentData))
            setComments(commentData);
        } catch (error) {
            console.error(error);
            setComments({ error: 'Error fetching comments' });
        }
    }
    fetchPostandScore()
    fetchComments()
    }, [id]);



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
    async function Del(e) {
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
            alert("Deletion success");
            navigate("/")
        } else {
            console.error('Error deleting post')
        }
    }

    async function handleUpArrowClick() {
        const url=`${api_url}/postScore/upvote/${id}`;
            const fetchConfig ={
                method: "put",
                headers: {
                    "Content-Type": "application/json",
            }
        }
        await fetch(url, fetchConfig);
        window.location.reload()
        }


        async function handleDownArrowClick() {
        const url=`${api_url}/postScore/downvote/${id}`;
            const fetchConfig ={
                method: "put",
                headers: {
                    "Content-Type": "application/json",
            }

        }
        await fetch(url, fetchConfig);
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

    if (token && (account === post.user_id)) {
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
                <button
                    onClick={() => handleUpArrowClick()}
                    type="button"
                    className="list-group-item list-group-item-primary list-group-item-action"
                >
                    ^
                </button>

                <button
                    onClick={() => handleDownArrowClick()}
                    type="button"
                    className="list-group-item list-group-item-danger list-group-item-action"
                >
                    v
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
                        <button onClick={Del} className="btn btn-secondary">
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
                                                <p className="card-text">{comment.body}</p>
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
                <button
                    onClick={() => handleUpArrowClick()}
                    type="button"
                    className="list-group-item list-group-item-primary list-group-item-action"
                >
                    ^
                </button>

                <button
                    onClick={() => handleDownArrowClick()}
                    type="button"
                    className="list-group-item list-group-item-danger list-group-item-action"
                >
                    v
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
                                                <p className="card-text">{comment.body}</p>
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
                                                    <p className="card-text">{comment.body}</p>
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
