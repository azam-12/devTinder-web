import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import USER_IMAGE from "../images/user_image.jpg";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionData = useSelector((store) => store.connections);
  const getConnections = async () => {
    if (connectionData) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log("res.data.data: ", res?.data?.data);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connectionData) return;

  if (connectionData.length === 0) return <h1>No Connections found!</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>
      {connectionData.map((connection, count) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div
            className="bg-primary-content flex m-4 p-4 rounded-lg w-1/2 mx-auto"
            key={count}
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
