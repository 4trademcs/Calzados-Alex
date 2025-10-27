import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./styles.css";

import App from "./App.jsx";
import Products from "./pages/Products.jsx";
import ScrollFrames from "./components/ScrollFrames";
import Model3D from "./pages/Model3D.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsConditions from "./pages/TermsConditions.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta default */}
        <Route path="/" element={<App />} />
        {/* Ruta /products */}
        <Route path="/products" element={<Products />} />

        <Route path="/frames" element={<ScrollFrames />} />

        <Route path="/model" element={<Model3D />} />
        
        <Route path="/privacy" element={<PrivacyPolicy />} />

        <Route path="/terms" element={<TermsConditions />} />

        {/* Cualquier otra ruta → App */}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
