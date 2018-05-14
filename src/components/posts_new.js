import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  // The field argument contains an event handler or two that will make
  // sure that the Field component below knows it is responsible for dealing
  // with this particular text input.
  //
  // field.input (the name field is a convention) is an object that contains
  // a bunch of different event handlers and props. Things like onChange and
  // onBlur. It also has the value of the input. The ... just says we want
  // all the different properties on the object to be communicated as props
  // to the input tag. It saves us from having to do
  // <input
  //   onChange={field.input.onChange}
  //   onFocus={field.input.onFocus}
  // ...etc.
  //
  // We can pass arbitrary properties into the field argument by adding them
  // to the Field component (like label).
  renderField(field) {
    // This destructuring pulls off the properties touched and error from the
    // meta object.
    const { meta: { touched, error } } = field;

    // So instead of doing this
    // const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

    // we can do this:
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values);
  }

  render() {
    // At the bottom, we wired up reduxForm to the PostsNew component in the
    // same way we wired up the connect helper in the past. The connect helper
    // was used to add additional properties to the component. reduxForm does
    // the same thing, adding additional properties. handleSubmit is a property
    // that's passed to the component on behalf of reduxForm.
    const { handleSubmit } = this.props;

    // The errors.title, errors.categories, and errors.content below in the
    // validate function are chosen so they will line up with the names here.
    // When redux-form renders the form, it looks at the name property and says
    // "if the errors object has a property of title, I'm going to call
    // renderField and pass along whatever error message is there under the
    // property title."
    //
    // handleSubmit takes a function that we define. It runs the redux-form
    // side of things. If everything looks good and it is valid, then call
    // the this.onSubmit callback. We are calling .bind(this) because we are
    // passing this.onSubmit as a callback function that will be executed
    // in a different context, so the .bind(this) makes sure we will still have
    // access to the correct this when it gets run.
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// The name of the values argument is a convention.
function validate(values) {
  const errors = {};

  // Validate the inputs from values.
  if (!values.title) {
    errors.title = 'Enter a title!';
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories';
  }
  if (!values.content) {
    errors.content = 'Enter some content please';
  }

  // If errors is empty, the form is fine to submit. If it has any properties,
  // redux-form assumes the form is invalid.
  return errors;
}

// You may have multiple forms visible on the screen, so provide
// a unique string for the form so redux-form can handle all the forms
// correctly.
export default reduxForm({
  validate: validate, // This could be condensed to just validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
