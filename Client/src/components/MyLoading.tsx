import { type JSX } from "react";
function Loading(): JSX.Element {
  return (<div
      className="fixed flex-col flex justify-center items-center size-full
     backdrop-blur-xs bg-black/70 z-9999"
    >
      <div
        className="border-2 rounded-full border-t-white text-white/60 animate-spin size-20"
      ></div>
      <p className="text-sm mt-1 text-white">Loading...</p>
    </div>
  );
}

export default Loading;
