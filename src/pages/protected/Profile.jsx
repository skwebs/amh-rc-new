import { useSelector } from "react-redux";

const Profile = () => {
  // @ts-ignore
  const userData = useSelector((state) => state.auth.userData);

  return (
    <div>
      <div>Name: {userData.name}</div>
      <div>Email: {userData.email}</div>
    </div>
  );
};
export default Profile;
