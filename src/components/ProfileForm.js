import { useState } from 'react';
import './ProfileForm.css';

/**ProfileForm
 *
 * Props: updateUser => fn,
 *        user => {username, fName, lName, email, [applications...]}
 *        msgs => [str...]
 *
 * States: formData => {username, fName, lName, email}
 *
 * Routes => ProfileForm
 */
//more explicit name for msgs -> statusMsgs
//could catch errors and display inside of here and not captured in app IE try catch around updateUser
function ProfileForm({ updateUser, user }) {
  const initialState = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  const [formData, setFormData] = useState(initialState);
  const [statusMsgs, setStatusMsgs] = useState(null);

  console.log('PROFILE FORM', formData);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  /** calls updateUser passed from app, updates statusMsgs */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const successMsg = await updateUser(formData);
      setStatusMsgs(() => successMsg)
    }
    catch (err) {
      setStatusMsgs(() => err);
    }
  }

  return (
    <form className='ProfileForm form-group p-5 d-flex align-items-center justify-content-center' onSubmit={handleSubmit}>
      <div className='ProfileForm-container'>
        <label htmlFor='username' className='form-label mt-4'>Username</label>
        <input disabled id='username'
          name='username'
          className="form-control"
          value={user.username} />

        <label htmlFor='firstName' className='form-label mt-4'>First Name</label>
        <input id='firstName'
          name='firstName'
          className="form-control"
          value={formData.firstName}
          onChange={handleChange} />

        <label htmlFor='lastName' className='form-label mt-4'>Last Name</label>
        <input id='lastName'
          name='lastName'
          className="form-control"
          value={formData.lastName}
          onChange={handleChange} />

        <label htmlFor='email' className='form-label mt-4'>Email</label>
        <input type="email"
          id='email'
          name='email'
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required />
          
        <br />
        <button className="ProfileForm-button btn btn-primary">Update Profile</button>
        <div className="ProfileForm-msgs">
          {statusMsgs && statusMsgs.map((msg, i) => <p className='ProfileForm-msg' key={i}>{msg}</p>)}
        </div>
      </div>
    </form>
  )
}

export default ProfileForm;