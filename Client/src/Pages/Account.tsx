import React from "react";
import { RiAccountBox2Fill } from "react-icons/ri";
import { tc } from "../components/style/main";
import Button from "../components/Button";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router";

function Account() {
  return (
    <div className="flex justify-center px-3">
      <div className="mt-10">
        <Link
          className={`${tc} p-2 rounded bg-black/30 w-fit flex gap-2 place-items-center`}
          to={"/user-home"}
        >
          <BiLeftArrowAlt />
        </Link>
        <div className="grid place-items-center">
          <RiAccountBox2Fill
            className={`size-30 sm:size-35 md:size-40 lg:size-50 not-dark:text-gray-400`}
          />
        </div>
        <div
          className={`grid grid-cols-2 ${tc} text-base md:text-xl space-y-2 space-x-6 font font-semibold`}
        >
          <label htmlFor="name">Name -</label>
          <h3 id="name">Yash Jangid</h3>
          <label htmlFor="email">Username -</label>
          <h3 id="email">yash-8-bit</h3>
        </div>
        <div className="flex justify-around">
          <Button text="Log Out" cname={`dark:btn-soft btn-warning`} />
          <Button text="Delete Account" cname={`dark:btn-soft btn-error`} />
        </div>
      </div>
    </div>
  );
}

export default Account;
