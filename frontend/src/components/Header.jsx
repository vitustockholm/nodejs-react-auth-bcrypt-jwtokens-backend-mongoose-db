import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';

const Header = () => {
  // Hooks
  // - - state
  const { user } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  // - - redirects
  const history = useHistory();

  console.log(user);
  // Custom functions
  const clickHandler = () => {
    dispatch(logoutUser());

    history.push('/');
  };

  return (
    <header>
      <div>LOGO</div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          {!user && (
            <li>
              <Link to='/login'>Login</Link>
            </li>
          )}
          {!user && (
            <li>
              <Link to='/signup'>Sign Up</Link>
            </li>
          )}
          {user && (
            <li>
              <Link to='/account'>My Account</Link>
            </li>
          )}
          {user && (
            <li>
              <button onClick={clickHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
