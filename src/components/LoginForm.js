import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import JoblyApi from '../api';
import './LoginForm.css';

/**LoginForm
 *
 * Props: updateToken => fn
 * States: formData => {username, password},
 *         isRedirect => bool,
 *         errors => ['error message',...]
 *
 * Routes => LoginForm
 */
function LoginForm({ updateToken }) {
  const initialState = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [isRedirect, setIsRedirect] = useState(false);
  const [errors, setErrors] = useState(false);

  console.log('LOGIN FORM', formData, isRedirect, errors);

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
      const token = await JoblyApi.loginUser(formData);
      updateToken(token);
      setFormData(initialState);
      setIsRedirect(true);
    } catch (err) {
      setErrors(() => err);
      setFormData(initialState);
    }
  }

  if (isRedirect) return <Redirect to="/" />;

  return (
    <form className='LoginForm form-group p-5 d-flex align-items-center justify-content-center' onSubmit={handleSubmit}>
      <div className='LoginForm-container w-25'>
        <label htmlFor='username' className='form-label mt-4'>Username</label>
        <input id='username'
          name='username'
          className="form-control"
          value={formData.username}
          onChange={handleChange} required />

        <label htmlFor='password' className='form-label mt-4'>Password</label>
        <input id='password'
          type="password"
          name='password'
          className="form-control"
          value={formData.password}
          onChange={handleChange} required />

        <br />
        <button className="LoginForm-button btn btn-primary">Login</button>
        {errors && errors.map((e, i) => {
          return <p className="LoginForm-errors" key={i}>{e}</p>
        })}
      </div>
    </form>
  )
}

export default LoginForm;