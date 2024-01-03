import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="mx-auto mt-7 max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-2 text-7xl font-bold tracking-tight text-red-600 dark:text-white">
          404
        </h2>
        <h3 className="mb-3 font-semibold text-gray-600 dark:text-gray-400">
          Page not found
        </h3>
        <div className="flex justify-center gap-5">
          <Link
            relative="path"
            to={`..`}
            className="inline-flex items-center rounded-lg bg-gray-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Go Back
          </Link>
          <Link
            relative="path"
            to={`/`}
            className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
