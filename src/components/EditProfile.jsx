import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import UserCard from "./UserCard";

const EditProfile = ({user}) => {

//   const { firstName, lastName, age, gender, photoUrl, about } = user; 

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const handleRadioChange = (e) => {
    setGender(e.target.value);
  }


  console.log(firstName,
    lastName,
    age,
    gender,
    photoUrl,
    about);

  const handleSaveProfile = async() => {
    // Clear Errors
    setError("");
    try {
        const res = await axios.post(BASE_URL + "/profile/edit", {
            firstName,
            lastName,
            age,
            gender,
            photoUrl,
            about,
        }, 
        { withCredentials: true }
    );
        dispatch(addUser(res?.data?.data));
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
          }, 3000);
    } catch (err) {
        // console.log("catch")
        console.log(err);
        setError(err.response.data);
    }
  }

  return (
    <div>
      <div className="flex justify-center my-10 flex-row items-center gap-10">
        <div className="card bg-primary-content w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Profile</h2>
            <div className="">
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
                />
              </label>
              <label className="form-control w-full max-w-xs mt-5 flex flex-row items-center justify-center gap-5">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <div className="flex gap-3">
                  <span className="label-text">Male</span>
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    checked={gender === "male"}
                    onChange={handleRadioChange}
                    className="radio"
                  />
                </div>
                <div className="flex gap-3">
                  <span className="label-text">Female</span>
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    checked={gender === "female"}
                    onChange={handleRadioChange}
                    className="radio"
                  />
                </div>
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Photo Url</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  value={photoUrl}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <textarea
                  className="textarea textarea-bordered"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </label>

              <p className="text-red-500">{error}</p>
            </div>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleSaveProfile}>Save Profile</button>
            </div>
          </div>
        </div>

        <UserCard user={user}/>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
