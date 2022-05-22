import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Teams from "./components/team/Teams";
import Users from "./components/user/Users";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/teams" element={<Teams />} />
    </Routes>
  );
};
export default Main;
