import { BrowserRouter, Routes, Route } from "react-router-dom";
import './global.css';

import { AddContent } from "./pages/AddContent";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addcontent" element={<AddContent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
