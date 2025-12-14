import { useEffect, type JSX } from "react";
import logo from "../assets/logo-home.webp";
import { Link, useNavigate } from "react-router";
import ls from "../utils/ls.util";
import bghome from "../assets/bg-home.webp"
function Home(): JSX.Element {
  const navigate = useNavigate();
  const run = (): void => {
    if (ls.ls1.get()) navigate("/home");
  };
  const fileUploaderDescription: { icon: string, text: string }[] = [{
    icon: "📤",
    text: "Simple and fast file uploading interface for users!"
  }, {
    icon: "🔒",
    text: "Secure upload process ensuring your files are safe."
  },
  {
    icon: "🌐",
    text: "Easily share files using secure, one-click shareable links."
  },
  {
    icon: "⚡",
    text: "Supports multiple file formats for seamless transfers."
  },
  {
    icon: "📁", text: "Easily drag and drop or browse to upload files."
  },
  { icon: "🚀", text: "Effortless experience with real-time upload progress tracking" }
  ];
  useEffect(() => {
    run();
  }, []);
  return (

    <div className=" h-screen bg-cover font"
      style={{ backgroundImage: `url(${bghome})` }}
    >
      <div>
        <h1
          className="p-4 text-black/60 pt-12 font-bold text-xl md:text-3xl lg:text-4xl text-center"
        >
          Presenting Drop Fest
        </h1>
      </div>
      <div className=" flex-1 px-3">
        <div className="grid place-items-center">
          <img src={logo} className="size-40 md:size-60  " />
        </div>
        <div
          className="flex justify-center text-gray-800  items-center flex-col gap-4
            "
        >
          <p className=" text-base sm:text-2xl font-bold  text-justify">
            Welcome to our simple and secure file upload service!
          </p>
          <ul className="text-base font-bold ">
            {fileUploaderDescription.map((item) => (
              <li
                className="flex gap-2 items-center"
                key={item.text}
              >
                <p className="text-xl md:text-3xl animate-pulse">{item.icon}</p>
                <p >{item.text}</p>
              </li>
            ))}
          </ul>
          <Link
            to={"/auth/register"}
            className="w-fit btn  btn-soft btn-info"
          >Get Started</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
