import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./Navbar/Navbar";
import Home from "./Pages/Home";
import Upload from "./Pages/Upload";
import Account from "./Pages/Account";
import {Webapp} from "./Context/Webapp";
import Sign from "./Pages/Sign";

function App() {
  return (
    <BrowserRouter>
      <Webapp>
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/account" element={<Account />} />
          </Route>
           <Route path="/sign" element={<Sign />} />
        </Routes>
      </Webapp>
    </BrowserRouter>
  );
}

export default App;
