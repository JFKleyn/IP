import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/home/HomePage";
// import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      {/* <ScrollToTop /> */}
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
      </>
  );
}