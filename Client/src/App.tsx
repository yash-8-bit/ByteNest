import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./Navbar/Navbar";
import Home from "./Pages/Home";
import Upload from "./Pages/Upload";
import Account from "./Pages/Account";
import { Webapp } from "./Context/Webapp";
import Authform from "./Pages/Authform";
import UserHome from "./Pages/UserHome";

function App() {
  return (
    <BrowserRouter>
      <Webapp>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account-login" element={<Authform type="login" />} />
          <Route
            path="/account-register"
            element={<Authform type="register" />}
          />
          <Route element={<Navbar />}>
            <Route path="/user-home" element={<UserHome />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/account" element={<Account />} />
          </Route>
        </Routes>
      </Webapp>
    </BrowserRouter>
  );
}

export default App;
