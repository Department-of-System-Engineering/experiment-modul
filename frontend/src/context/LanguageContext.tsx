import { createContext, useContext, useMemo, useState } from "react";
import { translations } from "./translations";
import type { TranslationKey } from "./translations";

type Language = "hu" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

const getBrowserLanguage = (): Language => {
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("hu")) return "hu";
  return "en";
};

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>(getBrowserLanguage());

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: TranslationKey): string => translations[language][key],
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
