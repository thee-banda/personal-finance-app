import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { I18nProvider } from "./i18n.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <I18nProvider>
  <BrowserRouter basename="/personal-finance-app">
    <App />
  </BrowserRouter>
  </I18nProvider>
);
