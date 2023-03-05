import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./routes/About";
import Login from "./routes/Login";
import Signup from "./routes/Signup";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />}></Route>
        <Route path={"/about"} element={<About />}></Route>
        <Route path={"/signup"} element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
