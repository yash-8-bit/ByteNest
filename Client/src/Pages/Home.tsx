import { useEffect, type JSX } from "react";
import bgimage from "../assets/bg.jpg";
import logo from "../assets/biglogo.png";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import ls from "../utils/ls.logic";
function Home():JSX.Element {
  const navigate = useNavigate();
  const run = (): void => {
    if (ls.ls1.get()) navigate("/user-home");
  };
  const fileUploaderDescription: string[] = [
    "📤 Simple and fast file uploading interface for users!",
    "🔒 Secure upload process ensuring your files are safe.",
    "⚡ Supports multiple file formats for seamless transfers.",
    "📁 Easily drag and drop or browse to upload files.",
    "🚀 Effortless experience with real-time upload progress tracking.",
  ];
  useEffect(() => {
    run();
  }, []);
  return (
    <div
      className="h-screen bg-cover"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div className="h-full bg-black/90">
        <h1
          className="p-4 text-black/60 font-bold text-xl md:text-3xl lg:text-4xl pl-4 
    bg-gradient-to-r from-white/80 to-transparent"
        >
          Presenting Drop Fest
        </h1>
        <div className="flex items-center px-3 h-[86vh]">
          <div className="w-full grid grid-cols-1 space-y-2 md:grid-cols-2">
            <div className="grid place-items-center">
              <img src={logo} className="size-40 md:size-60" />
            </div>
            <div
              className="flex justify-center  md:items-start items-center flex-col gap-4
            "
            >
              <p className="text-white/70 max-w-96 text-base sm:text-2xl font-bold  text-justify">
                Welcome to our simple and secure file upload service!
              </p>
              <ul className="text-base font-bold list-disc">
                {fileUploaderDescription.map((item) => (
                  <li
                    className="underline underline-offset-8 hover:decoration-cyan-500"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                func={() => navigate("/account-register")}
                cname="w-fit font btn-soft btn-success"
                text="Get Started"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
