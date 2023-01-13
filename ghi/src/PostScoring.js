

function PostScoring(props) {
    return (
        <div className="card post-scoring-card" >
            <ul className="list-group list-group-flush">
                <button type="button" className="list-group-item list-group-item-primary list-group-item-action">^</button>
                <li className="list-group-item">{props.score}</li>
                <button type="button" className="list-group-item list-group-item-danger list-group-item-action">v</button>
            </ul>
        </div>
    )

}
export default PostScoring
