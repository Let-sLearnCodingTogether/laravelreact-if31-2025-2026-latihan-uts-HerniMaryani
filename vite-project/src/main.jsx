import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/styles.css";
import QuotePage from "./pages/quotes/Quote/QuotePage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QuotePage />
  </StrictMode>,
);