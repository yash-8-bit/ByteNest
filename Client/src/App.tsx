import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./Navbar/Navbar";
import Home from "./Pages/Home";
import Upload from "./Pages/Upload";
import { Webapp } from "./Context/Webapp";
import Authform from "./Pages/auth/Authform";
import UserHome from "./Pages/UserHome";
import MyToast from "./components/MyToast";
import Mythemeprovider from "./Provider/Mythemeprovider";
import UserPage from "./Pages/User";

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
          </Routes>
        </BrowserRouter>
      </Mythemeprovider>
    </Webapp>
  );
}

export default App;
