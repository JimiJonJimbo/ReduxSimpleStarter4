import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

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
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
      </div>
    );
  }

  render() {
    return (
      <form>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Tags"
          name="tags"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
      </form>
    );
  }
}

// You may have multiple forms visible on the screen, so provide
// a unique string for the form so redux-form can handle all the forms
// correctly.
export default reduxForm({
  form: 'PostsNewForm'
})(PostsNew);
