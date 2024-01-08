import { Outlet, ScrollRestoration } from "react-router-dom";
import { Header, Footer } from "../../components";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </>
  );
};
export default HomeLayout;
