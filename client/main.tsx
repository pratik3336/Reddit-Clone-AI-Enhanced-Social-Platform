import "./global.css";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

// Check if root already exists to prevent duplicate createRoot calls in development
let root = (container as any)._reactRoot;
if (!root) {
  root = createRoot(container);
  (container as any)._reactRoot = root;
}

root.render(<App />);
