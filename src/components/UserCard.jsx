import DEFAULT_USER_IMAGE from "../images/user_image.jpg";

const UserCard = ({user}) => {

    const { firstName, lastName, age, gender, about, photoUrl } = user;

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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
