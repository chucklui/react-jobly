import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import JoblyApi from '../api';
import './SignupForm.css';

/** SignupForm
 *
 * Props: updateToken => fn
 * States: formData => {username, password, fName, lName, email},
 *         isRedirect => bool,
 *         errors => ['error message',...]
 *
 * Routes => SignupForm
 */
function SignupForm({ updateToken }) {
  const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [isRedirect, setIsRedirect] = useState(false);
  const [errors, setErrors] = useState(null);

  console.log('SIGNUP FORM', formData, isRedirect, errors);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const token = await JoblyApi.registerUser(formData);
      updateToken(token);
      setIsRedirect(true);
    } catch (err) {
      setErrors(() => err);
    }
  }

  if (isRedirect) return <Redirect to="/" />

  return (
    <form className='SignupForm form-group p-5 d-flex align-items-center justify-content-center' onSubmit={handleSubmit}>
      <div className='SignupForm-container w-25'>
        <label htmlFor='username' className='form-label mt-4'>Username</label>
        <input id='username'
          name='username'
          className="form-control"
          value={formData.username}
          onChange={handleChange}
          required />

        <label htmlFor='password' className='form-label mt-4'>Password</label>
        <input id='password'
          type="password"
          name='password'
          className="form-control"
          value={formData.password}
          onChange={handleChange}
          required />

        <label htmlFor='firstName' className='form-label mt-4'>First Name</label>
        <input id='firstName'
          name='firstName'
          className="form-control"
          value={formData.firstName}
          onChange={handleChange}
          required />

        <label htmlFor='lastName' className='form-label mt-4'>Last Name</label>
        <input id='lastName'
          name='lastName'
          className="form-control"
          value={formData.lastName}
          onChange={handleChange}
          required />

        <label htmlFor='email' className='form-label mt-4'>Email</label>
        <input id='email'
          type="email"
          name='email'
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required />

        <br />
        <button className="SignupForm-button btn btn-primary">SignUp</button>
        {errors && errors.map((e, i) => {
          return <p className="SignupForm-errors" key={i}>{e}</p>
        })}
      </div>
    </form>
  )
}

export default SignupForm;