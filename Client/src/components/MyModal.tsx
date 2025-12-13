import {   type PropsWithChildren } from "react";


const MyModal = (props :PropsWithChildren) => {  
  return (
    <dialog  className="modal" open >
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="py-4">{props.children}</div>
      </div>
    </dialog>
  );
}

export default MyModal;
