const LanguageSelector = ({ language, setLanguage }) => {
  return (
    <>
      {language === "en" && 
        <button className='btn btn-outline-primary' onClick={() => setLanguage("fr")}>
          Français
        </button>
      }
      {language === "fr" && 
        <button className='btn btn-outline-primary' onClick={() => setLanguage("en")}>
          English
        </button>
      }
    </>
  );
};

export default LanguageSelector;