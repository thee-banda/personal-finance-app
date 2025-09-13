// src/i18n.jsx
import { createContext, useContext, useState, useEffect } from "react";
import en from "./locales/en/translation.json";
import th from "./locales/th/translation.json";

const dictionaries = { EN: en, TH: th };
const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "EN");

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = dictionaries[lang];
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
