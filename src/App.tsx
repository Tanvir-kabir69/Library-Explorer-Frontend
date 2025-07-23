import { Outlet, useLocation } from "react-router";
import "./App.css";
import Navbar from "./customComponent/Navbar";
import Footer from "./customComponent/Footer";

function App() {
  const location = useLocation();
  // const isModal = location.pathname.startsWith("/books/");
  const isModal =
    /^\/books\/[^/]+$/.test(location?.pathname) ||
    /^\/edit-book\/[^/]+$/.test(location?.pathname) ||
    /^\/borrow\/[^/]+$/.test(location?.pathname);

  const isHomepage = /^\//.test(location?.pathname);

  if (isModal) {
    return (
      <div className="w-full md:w-[80vw] mx-auto">
        <div className={"w-full mx-auto min-h-screen flex flex-col"}>
          <Navbar />
          <Outlet />
          <div className="flex-1"></div>
        </div>

        <Footer />
      </div>
    );
  }

  if (isHomepage) {
    return (
      <div className="w-full md:w-[80vw] mx-auto">
        <div className="w-full mx-auto min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1 overflow-y-auto    py-5 flex flex-col justify-center items-center">
            <Outlet />
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="w-full md:w-[80vw] mx-auto">
        <div className="w-full mx-auto min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1 overflow-y-auto    py-5 flex justify-center items-center">
            <Outlet />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
