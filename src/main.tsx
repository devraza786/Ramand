import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
  import "./styles/responsive-landing.css";
  import "./styles/responsive-email.css";

  createRoot(document.getElementById("root")!).render(<App />);
