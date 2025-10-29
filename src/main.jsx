import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration,} from "react-router-dom";
import "./index.css";
import "./styles.css";
import App from "./App.jsx";
import Products from "./pages/Products.jsx";
import ScrollFrames from "./components/ScrollFrames.jsx";
import Model3D from "./pages/Model3D.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsConditions from "./pages/TermsConditions.jsx";

// 📦 Layout raíz que incluye restauración automática de scroll
function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* <Header /> */}
      <main className="flex-1">       
        <Outlet />   {/* Aquí React Router renderiza cada página */}
      </main>
      {/* <Footer /> */}
      <ScrollRestoration />
    </div>
  );
}

// 🧭 Definición del router con todas las rutas
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/products", element: <Products /> },
      { path: "/frames", element: <ScrollFrames /> },
      { path: "/model", element: <Model3D /> },
      { path: "/privacy", element: <PrivacyPolicy /> },
      { path: "/terms", element: <TermsConditions /> },
      { path: "*", element: <App /> }, // fallback
    ],
  },
]);

// 🚀 Render principal
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
