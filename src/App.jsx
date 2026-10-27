import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/home/HomePage";
import { InstaPlayPage } from "./pages/play/InstaPlayPage";
import { InstaDecorPage } from "./pages/decor/InstaDecorPage";
import { InstaHirePage } from "./pages/hire/InstaHirePage";
import { InstaGalleryPage } from "./pages/gallery/InstaGalleryPage";
import { AboutUsPage } from "./pages/about/AboutUsPage";
import { ContactPage } from "./pages/contact/ContactPage";
import { TermsPage } from "./pages/terms/TermsPage";
import { PrivacyPolicyPage } from "./pages/privacypolicy/PrivacyPolicyPage";
import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/insta-play" element={<InstaPlayPage />} />
        <Route path="/insta-decor" element={<InstaDecorPage />} />
        <Route path="/insta-hire" element={<InstaHirePage />} />
        <Route path="/insta-gallery" element={<InstaGalleryPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
      </Routes>
      <Footer />
      </>
  );
}