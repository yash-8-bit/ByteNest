import { useEffect, type JSX } from "react";
import logo from "../assets/logo-home.webp";
import { Link, useNavigate } from "react-router";
import ls from "../utils/ls.util";
import bghome from "../assets/bg-home.webp"
function Home(): JSX.Element {
  const navigate = useNavigate();
  const run = (): void => {
    if (ls.tokenStore.get()) navigate("/home");
  };
  const Description: string[] = [
    "Simple and fast file uploading interface for users!",
    "Secure upload process ensuring your files are safe.",
    "Easily share files using secure, one-click shareable links.",
    "Supports multiple file formats for seamless transfers.",
    "Easily drag and drop or browse to upload files.",
    "Effortless experience with real-time upload progress tracking"
  ];
  useEffect(() => {
    run();
  }, []);
  return (

    <div className="min-h-screen bg-cover p-2"
      style={{ backgroundImage: `url(${bghome})` }}
    >
        <div className="grid place-items-center">
          <h1
            className="text-white px-2 py-1
            bg-yellow-400
            font-bold text-xl md:text-3xl lg:text-4xl"
          >
            Presenting Drop Fest
          </h1>
          <img src={logo} className="size-50 md:size-100  " />
        </div>
        <div
          className=" text-gray-800 grid place-items-center
            "
        >
          <ul className="text-base font-bold ">
            {Description.map((item) => (
              <li
                className="border-l-2 p-0.5
                 border-gray-800 mb-1 bg-gray-200"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
          <Link
            to={"/auth/register"}
            className="bg-red-500 hover:scale-105 transition-transform text-white text-center px-6 py-1 "
          >Get Started</Link>
        </div>
    </div>
  );
}

export default Home;
