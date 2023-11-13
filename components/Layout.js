import Navbar from "./Navbar";
import ActiveResource from "./ActiveResource";

const Layout = ({ children }) => (
  <>
    <Navbar />
    <ActiveResource />
    {children}
  </>
);

export default Layout;
