import  { type JSX } from "react";

function Loading(): JSX.Element {
  return (
    <div
      className="fixed flex-col flex justify-center items-center size-full
     backdrop-blur-xs z-10"
    >
      <span
        className="loading  text-white loading-infinity
      w-20 md:w-40 lg:w-50"
      ></span>
    </div>
  );
}

export default Loading;
