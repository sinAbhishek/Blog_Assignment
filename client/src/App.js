import Home from "./pages/Home/home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/login/Login";
import Blog from "./pages/Blog/blog";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element=<Home /> />
        <Route path="/register" element=<Register /> />
        <Route path="/" element=<Login /> />
        <Route path="/blog" element=<Blog /> />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
