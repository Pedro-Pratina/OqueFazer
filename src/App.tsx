import {BrowserRouter, Routes, Route, Router} from "react-router";
import Login from "../src/pages/Login/Login"
import Agenda from "./pages/Agenda/Agenda";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/agenda" element={<Agenda />} />
      </Routes>
    </BrowserRouter>
  );
}
