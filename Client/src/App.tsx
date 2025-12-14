import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./Navbar/Navbar";
import Home from "./Pages/Home";
import Upload from "./Pages/user/file/UploadPage";
import { Webapp } from "./Context/Webapp";
import Authform from "./Pages/auth/Authform";
import UserHome from "./Pages/user/HomePage";
import MyToast from "./components/MyToast";
import Mythemeprovider from "./Provider/Mythemeprovider";
import UserPage from "./Pages/user/UserPage";
import OneFile from "./Pages/user/file/OneFile";

function App() {
  return (
    <Webapp>
      <MyToast />
      <Mythemeprovider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Authform type="login" />} />
            <Route
              path="/auth/register"
              element={<Authform type="register" />}
            />
            <Route element={<Navbar />}>
              <Route path="/home" element={<UserHome />} />
              <Route path="/upload-file" element={<Upload />} />
              <Route path="/user" element={<UserPage />} />
            </Route>
              <Route path="/share-file" element={<OneFile />} />
          </Routes>
        </BrowserRouter>
      </Mythemeprovider>
    </Webapp>
  );
}

export default App;
