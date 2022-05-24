import React from "react";
import { Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("./components/Home"));
const Users = React.lazy(() => import("./components/user/Users"));
const Teams = React.lazy(() => import("./components/team/Teams"));

const Loading = () => <p>Loading ...</p>;

const Main = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>
    </React.Suspense>
  );
};
export default Main;
