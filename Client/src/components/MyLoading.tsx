import { type JSX } from "react";
import { createPortal } from 'react-dom';
function Loading(): JSX.Element {
  return (
    createPortal(<div
      className="fixed flex-col flex justify-center items-center size-full
     backdrop-blur-xs bg-black/70 z-10"
    >
      <div
        className="border-2 rounded-full border-t-white text-white/60 animate-spin size-20"
      ></div>
      <p className="text-sm mt-1 text-white">Loading...</p>
    </div>, document.body)
  );
}

export default Loading;
