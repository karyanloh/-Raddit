function CreatePost(props) {

    const pad2 = num => String(num).padStart(2, '0');

    return (
        <div class="d-flex justify-content-center" >
            <div className="shadow-none p-3 mb-5 bg-dark rounded p-4 mt-4" >
                <h1 style={{color: "white"}}>Create a new post !</h1>
                <form>
                    <div className="form-floating " >
                        <input placeholder="Title" required type="text" name="Title" id="Title" className="form-control" />
                        <label htmlFor="Title">Title</label>
                    </div>
                    {/* <div className="form-floating mb-3 ">
                        <input  placeholder="Description" required type="Description" name="Description" id="Description" className="" />
                        <label htmlFor="Description">Description</label>
                    </div> */}
                    <div class="form-group mb-4 ">
                        <label for="exampleFormControlTextarea1" >Example textarea</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="10" placeholder="Description"></textarea>
                    </div>
                    <div className="mb-3 ">
                            <select  placeholder="SubRaddit" required name="SubRaddit" id="SubRaddit" className="form-select">
                                <option value="">Choose a SubRaddit</option>
                            </select>
                        </div>
                        <button className="btn btn-light">Create</button>
                        <button className="btn btn-dark float-end">
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost;