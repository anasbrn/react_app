import React, { createContext, useEffect, useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
import { SearchProvider } from './providers/SearchProvider';
import { translations } from './translations';
import LanguageSelector from './components/LanguageSelector';
import useLocalStorage from './hooks/useLocalStorage';

// TODO: Exercice 2.1 - Créer le LanguageContext
export const LanguageContext = createContext();

export const ThemeContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
    // TODO: Exercice 2.2 - Ajouter l'état pour la langue
    const [ storedValue, setStoredValue ] = useLocalStorage("language", "en");
    const [language, setLanguage] = useState(storedValue);
    const t = (key) => translations[language]?.[key] || key;
    useEffect(() => {
      setStoredValue(language);
    }, [language]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {/* TODO: Exercice 2.1 - Wrapper avec LanguageContext.Provider */}
      <LanguageContext.Provider value={{ language, setLanguage, t }}>
        <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
          <header className="my-4">
            <h1 className="text-center">{t('product_catalog')}</h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />
              {/* TODO: Exercice 2.2 - Ajouter le sélecteur de langue */}
              <LanguageSelector language={language} setLanguage={setLanguage} />
            </div>
          </header>
          <main>
              <SearchProvider>
                <ProductSearch />
                <ProductList />
              </SearchProvider>
          </main>
        </div>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
  );
};

export default App
