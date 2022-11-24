import { BrowserRouter, Routes, Route } from "react-router-dom";
import './global.css';

import { AddQuestion } from "./pages/AddQuestion";
import { AddQuiz } from "./pages/AddQuiz";
import { Edit } from "./pages/Edit";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { SearchQuestion } from "./pages/SearchQuestion";
import { Questions } from "./pages/Questions";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addquestion" element={<AddQuestion />} />
        <Route path="/addquiz" element={<AddQuiz />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/search-question" element={<SearchQuestion />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
