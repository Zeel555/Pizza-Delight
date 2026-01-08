import { FaPizzaSlice } from 'react-icons/fa';

function Loader() {
  return (
    <>
      <div className="relative inset-0 flex flex-col justify-center items-center">
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center border-x-8 border-green-700 rounded-full shadow-lg animate-spin">
            <div className="flex flex-col justify-center items-center border-y-8 border-green-400 rounded-full shadow-lg animate-ping">
              <div className="flex flex-col justify-center items-center border-4 border-green-600 h-32 w-32 rounded-full shadow-lg animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center bg-white h-32 w-32 space-y-2 rounded-full shadow-lg">
          <FaPizzaSlice className="text-4xl text-green-600" />
          <p className="text-center text-sm text-green-700">Loading...</p>
        </div>
      </div>
    </>
  );
}

export default Loader;
