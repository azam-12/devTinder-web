import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { removeConnections } from "../utils/connectionSlice";


const Navbar = () => {
  const user = useSelector((store) => store.user);
  const ConnectionData = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const handleLogout = async() => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      if(ConnectionData.length !== 0){
        dispatch(removeConnections);
      }
      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="navbar bg-primary-content">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">😎 DevTinder</Link>
      </div>
      <div className="flex-none gap-2">
        {user && (
          <div className="flex items-center">
            <p className="">Welcome {user?.firstName}!</p>
            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="user avatar"
                    src={user?.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">My Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <Link to="/login" onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
