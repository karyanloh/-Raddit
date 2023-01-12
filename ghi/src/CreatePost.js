import React from "react";

class CreatePostForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
		};


		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleNameChange(event) {
		const value = event.target.value;
		this.setState({ name: value})
	}

	async handleSubmit(event) {
		event.preventDefault();
		const data = {...this.state};
		console.log(data)
		const url = "http://localhost:3000";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				'Content-Type' : 'application/json',

			},
		};

		const response = await fetch(url, fetchConfig);
		if (response.ok) {
			const newPost = await response.json();
			const cleared = {
				name: '',
			};
			this.setState(cleared)
		}
	}
	render() {
		return (
			<div className="row">
				<div className="offset-3 col-6">
					<div className="shadow p-4 mt-4">
						<h1>Create Post</h1>
						<form onSubmit={this.handleSubmit} id="form">
							<div className="form-floating mb-3">
								<input onChange={this.handleNameChange} value= {this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
								<label htmlFor="name">Name</label>
							</div>
							<button className="btn btn-primary">Create</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
export default CreatePostForm;
