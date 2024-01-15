import { useSelector } from "react-redux";

const Home = () => {
  // @ts-ignore
  const { userData } = useSelector((state) => state.auth);

  return (
    <>
      <div className=" ">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[calc(100dvh-184px)] md:h-[calc(100dvh-172px)] lg:h-[calc(100dvh-148px)] flex justify-center items-center">
          <div className="flex flex-col gap-10 items-center">
            <span className="text-white text-xl">
              Welcome {userData && userData?.name && userData.name}
            </span>
            <span className="text-white text-6xl">Home Page</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
