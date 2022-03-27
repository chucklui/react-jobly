import { NavLink, Link } from 'react-router-dom';
import UserContext from './userContext';
import { useContext } from 'react';
import './Nav.css';

/** Nav renders navbar components
 *
 * props: logout => fn
 * state: none
 *
 * App => Nav
 */
function Nav({ logout }) {
  const currentUser = useContext(UserContext);

  return (
    <nav className="Nav navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="Nav-container container-fluid">
        <NavLink exact to="/" className="Nav-brand navbar-brand">Jobly</NavLink>
        <div className='Nav-list-container collapse navbar-collapse'>
          <ul className="Nav-list navbar-nav ms-auto">

            {!currentUser &&
              <>
                <li className="Nav-item nav-item">
                  <NavLink className="Nav-link nav-link" to="/login">Login</NavLink>
                </li>
                <li className="Nav-item nav-item">
                  <NavLink className="Nav-link nav-link" to="/signup">Signup</NavLink>
                </li>
              </>}

            {currentUser &&
              <>
                <li className="Nav-item nav-item">
                  <NavLink className="Nav-link nav-link" to="/companies">Companies</NavLink>
                </li>
                <li className="Nav-item nav-item">
                  <NavLink className="Nav-link nav-link" to="/jobs">Jobs</NavLink>
                </li>
                <li className="Nav-item nav-item">
                  <NavLink className="Nav-link nav-link" to={`/profile/${currentUser.username}`}>Profile</NavLink>
                </li>
                <li className="Nav-item nav-item">
                  <Link className="Nav-link nav-link" to="/" onClick={() => logout()}>Logout {currentUser.firstName}</Link>
                </li>
              </>}
              
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;