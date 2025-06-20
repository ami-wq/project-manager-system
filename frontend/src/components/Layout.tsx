import { Outlet } from "react-router-dom";
import Header from "./header/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;