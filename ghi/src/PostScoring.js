import {useState} from "react";

// props for postscoring are being passed in mainpage
function PostScoring(props) {
    const [score, setScore] = useState(props.score)
    const [upvoteUsers, setUpvoteUsers] = useState(props.upvoteUsers)
    const [downvoteUsers, setDownvoteUsers] = useState(props.downvoteUsers)
    // const [currentUserId, setCurrentUserId] = useState(props.currentUserId)

    async function handleUpArrowClick() {
        // TODO: PUT request to persist change in score(upvoteUsers array) when uparrow clicked
        // TODO: uparrow click adds one to post score in back end
        // TODO: uparrow click adds user id to upvoted users array in back end
        try {
            const response = await fetch(`https://localhost:8001/api/postScore/${props.postId}`, {
                method: 'PUT',
                body: JSON.stringify({"score":score, "upvote_users":upvoteUsers}),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                // throw new Error(`Error! status: ${response.status}`)
                console.log('error with score change')
            }
            const result = await response.json()

            console.log('result: ', JSON.stringify(result))

        // TODO: if already in upvote list, decrease by 1(cancel vote)
        // TODO: if already in downvote list, increase by 2(switch vote)
        setScore(score+1)
        setUpvoteUsers(upvoteUsers.concat(props.currentUserId))
    } catch (err) {
        console.log('error')
        // setErr(err.message)
    } finally {
        setScore(score+1)
        setUpvoteUsers(upvoteUsers.concat(props.currentUserId))
    }
    }
    async function handleDownArrowClick() {
        try {
            const response = await fetch(`https://localhost:8001/api/postScore/${props.postId}`, {
                method: 'PUT',
                body: JSON.stringify({"score":score, "downvote_users":downvoteUsers}),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                // throw new Error(`Error! status: ${response.status}`)
                console.log('error with score change')
            }
            const result = await response.json()

            console.log('result: ', JSON.stringify(result))

        // TODO: if already in upvote list, decrease by 1(cancel vote)
        // TODO: if already in downvote list, increase by 2(switch vote)
        setScore(score-1)
        setUpvoteUsers(downvoteUsers.concat(props.currentUserId))
    } catch (err) {
        console.log('error')
        // setErr(err.message)
    } finally {
        setScore(score-1)
        setDownvoteUsers(downvoteUsers.concat(props.currentUserId))
    }
    // function handleUpArrowClick() {
    //     // TODO: PUT request to persist change in score(upvoteUsers array) when uparrow clicked
    //     setScore(score+1)
    //     setUpvoteUsers(upvoteUsers.concat(props.currentUserId))
    // }

    // function handleDownArrowClick() {
    //     // TODO: PUT request to persist change in score(downvoteUsers array) when downarrow clicked
    //     setScore(score-1)
    //     setDownvoteUsers(downvoteUsers.concat(props.currentUserId))
    // }
}

    return (
        <div className="card post-scoring-card" >
            <ul className="list-group list-group-flush">
                <button
                    onClick={() => handleUpArrowClick()}
                    type="button"
                    className="list-group-item list-group-item-primary list-group-item-action"
                    // disabled={props.upvoteUsers.includes(props.currentUserId)}
                    disabled={upvoteUsers.includes(props.currentUserId)}
                >
                    ^
                </button>
                <li className="list-group-item">{score}</li>
                <button
                    onClick={() => handleDownArrowClick()}
                    type="button"
                    className="list-group-item list-group-item-danger list-group-item-action"
                    // disabled={props.downvoteUsers.includes(props.currentUserId)}
                    disabled={downvoteUsers.includes(props.currentUserId)}
                >
                    v
                </button>
            </ul>
        </div>
    )
}
export default PostScoring;
