import UserContext from './userContext';
import { useContext } from 'react';
import './Homepage.css';

/**Homepage
 *
 * props: none
 * state: none
 *
 * Routes => Homepage
 */
function Homepage() {
  const currentUser = useContext(UserContext);

  if (currentUser) {
    return (
      <div className="Homepage d-flex align-items-center justify-content-center">
        <h1 className="Homepage-title">Welcome back, {currentUser.firstName}</h1>
      </div>
    );
  }

  return (
    <div className="Homepage d-flex align-items-center justify-content-center">
      <h1 className="Homepage-title">Welcome to Jobly!</h1>
    </div>
  );
}

export default Homepage;