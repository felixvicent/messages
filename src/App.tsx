import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Chat } from "./pages/Chat";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
