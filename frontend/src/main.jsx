import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { I18nProvider } from "./i18n.jsx";

// ใช้ basename = "/" ตอน dev, และ "/personal-finance-app" ตอน build deploy
const basename =
  import.meta.env.MODE === "production" ? "/personal-finance-app" : "/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <I18nProvider>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </I18nProvider>
);
