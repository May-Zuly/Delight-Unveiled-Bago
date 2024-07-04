import AppFooter from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

export default function DefaultLayout({ children }) {
  return (
    <div className="home-page">
      <Navbar />
      {children}
      <AppFooter />
    </div>
  );
}
