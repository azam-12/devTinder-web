import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import USER_IMAGE from "../images/user_image.jpg";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async(status, requestId) => {
    try {
        const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + requestId, 
            {},
            { withCredentials: true }
         );
         dispatch(removeRequest(requestId))
         console.log("res: ", res)
    } catch (err) {
        console.log(err);
    }
  }

  const getConnectionRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConnectionRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h2 className="flex justify-center my-10">No Connection Requests Found!</h2>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">
        Received Connections Requests
      </h1>
      {requests?.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            className="bg-primary-content flex justify-between items-center m-4 p-4 rounded-lg w-2/3 mx-auto"
            key={_id}
          >
            <div className="">
              <img
                src={photoUrl ? photoUrl : USER_IMAGE}
                alt="userImage"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4">
              <h1 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h1>
              {age && gender && <p>{age + " " + gender}</p>}
              {about && <p>{about}</p>}
            </div>
            <div className="flex">
              <button className="btn btn-primary mx-2" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
              <button className="btn btn-secondary mx-2" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
