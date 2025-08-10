import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import ScrollToTop from "../Pages/ScrollTop/ScrollToTop";
import { Suspense } from "react";
import Loading from "../Loading/Loading";

const Main = () => {
  return (
    <div>
      <ScrollToTop />

      <Navbar />

      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Main;
