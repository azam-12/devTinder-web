import axios from "axios";
import DEFAULT_USER_IMAGE from "../images/user_image.jpg";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
  const dispatch = useDispatch();

  const handleSendRequest = async(status, userId) => {
    try {
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, 
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
        console.log(err);
    }
  }

    const { _id, firstName, lastName, age, gender, about, photoUrl } = user;

  return (
    <div className="card bg-primary-content w-72 shadow-xl">
      <figure className="">
        <img src={photoUrl ? photoUrl : DEFAULT_USER_IMAGE} alt="user image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
          <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
