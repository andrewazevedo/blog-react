import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
	renderField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;

		return (
			<div className={className}>
				<label>{field.label}</label>
				<input
					placeholder={field.placeholder}
					className="form-control"
					{...field.input}
				/>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values) {
		this.props.createPost(values, () => {
			// Navigate to main route '/'.
			this.props.history.push('/');
		});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					label="Title:"
					placeholder="Title for post"
					name="title"
					component={this.renderField}
				/>
				<Field
					label="Categories:"
					name="categories"
					component={this.renderField}
				/>
				<Field
					label="Post Content:"
					name="content"
					component={this.renderField}
				/>
				<button type="submit" className="btn btn-primary"> SUBMIT </button>
				<Link to="/" className="btn btn-danger" > CANCEL </Link>
			</form>
		);
	}
}

// values -> any value that user input on form
function validate(values) {
	// console.log(values) -> { title: 'adsfads', categories: 'asdfadfs', ... }
	const errors = {};

	// Validate the inputs from 'values'
	if (!values.title || values.title.length < 3 ) {
		errors.title = "Enter a title that is at least 3 characters.";
	}
	if (!values.categories) {
		errors.categories = "Enter some categories.";
	}
	if (!values.content) {
		errors.content = "Enter some content.";
	}


	// If errors is empty, the form is fine to submit.
	// If errors has *any* properties, redux form assumes form is invalid.
	return errors;
}

export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(
	connect(null, { createPost })(PostsNew)
);
