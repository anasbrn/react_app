import { useContext } from 'react';
import { LanguageContext, ThemeContext } from '../App';
import { SearchContext } from '../providers/SearchProvider';

const ProductSearch = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { isDarkTheme } = useContext(ThemeContext);
  // TODO: Exercice 2.1 - Utiliser le LanguageContext
  const { t } = useContext(LanguageContext);
  
  // TODO: Exercice 1.2 - Utiliser le hook useDebounce
  
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={`${t('search_product')}...`}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;