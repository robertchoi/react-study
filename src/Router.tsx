import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "./atoms";
import About from "./routes/About";
import Check from "./routes/Check";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Wrong from "./routes/Wrong";

function Router() {
  const isLoggedIn = useRecoilValue(loginState);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={isLoggedIn ? <Home /> : <Login />}></Route>
        <Route path={"/about"} element={<About />}></Route>
        <Route
          path={"/signup"}
          element={isLoggedIn ? <Home /> : <Signup />}
        ></Route>
        <Route path={"/kakao-login"} element={<Check />}></Route>
        <Route path={"/redirect"} element={<Home />}></Route>

        <Route path={"/:wrong"} element={<Wrong />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
