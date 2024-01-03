import { RiLoader4Line } from "react-icons/ri";

const LoadingPage = () => {
  return (
    <div className="fixed inset z-10 bg-black/25 w-full ">
      <div className="h-dvh flex items-center justify-center">
        <p className="text-lg text-zinc-700 bg-white px-3 py-2 rounded-lg">
          <span className="flex items-center gap-2">
            <RiLoader4Line className="animate-spin h-8 w-8" /> Please Wait!
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
