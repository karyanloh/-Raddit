import {useState} from "react";

// props for postscoring are being passed in mainpage
function PostScoring(props) {
    const [score, setScore] = useState(props.score)

    return (
        <div className="card post-scoring-card" >
            <ul className="list-group list-group-flush">
                <button type="button" className="list-group-item list-group-item-primary list-group-item-action" disabled={props.upvoteUsers.includes(props.currentUserId)}>^</button>
                <li className="list-group-item">{score}</li>
                <button type="button" className="list-group-item list-group-item-danger list-group-item-action" disabled={props.downvoteUsers.includes(props.currentUserId)}>v</button>
            </ul>
        </div>
    )
}
export default PostScoring
