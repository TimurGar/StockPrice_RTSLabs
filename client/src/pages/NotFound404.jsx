import React from "react";
import { Link } from "react-router-dom";

export default function NotFound404() {
  return (
    <div>
      {/* container */}
      <div className="preview flex flex-col min-h-[350px] w-full justify-center p-6 sm:p-20 items-center">
        <div>
          <h2 className="text-center font-bold text-xl text-neutral-800">
            Uh-Oh! <br /> Page Not Found
          </h2>

          <h3 className="text-center text-neutral-600 text-md mt-2">
            Sorry. the page you requested <br /> could not be found
          </h3>

          <div className="flex justify-center my-10">
            <img
              className="w-1/3"
              src="/images/Cactus.png"
              alt="cute cactus"
            />
          </div>
          <div className="flex justify-center">
            <Link to="/">
              <button className="bg-gradient-to-br relative group/btn px-4 from-black to-neutral-600 bloc w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]">
                <BottomGradient />
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
