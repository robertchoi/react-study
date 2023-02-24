import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Example from "./routes/Example";
import Login from "./routes/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/example" element={<Example />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
