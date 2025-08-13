import { useState, useEffect, useCallback } from 'react';

// TODO: Exercice 3.1 - Créer le hook useDebounce
// TODO: Exercice 3.2 - Créer le hook useLocalStorage
const PRODUCTS_PER_PAGE = 10;

const useProductSearch = (debouncedSearch) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // TODO: Exercice 4.2 - Ajouter l'état pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0); // total number of products

  const fetchProducts = useCallback(async (search = debouncedSearch, page = currentPage) => {
      try {
        // TODO: Exercice 4.2 - Modifier l'URL pour inclure les paramètres de pagination
        const skip = (page - 1) * PRODUCTS_PER_PAGE
         const url = search
        ? `https://dummyjson.com/products/search?q=${search}&limit=${PRODUCTS_PER_PAGE}&skip=${skip}`
        : `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, [debouncedSearch, currentPage]); // TODO: Exercice 4.2 - Ajouter les dépendances pour la pagination

    useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // TODO: Exercice 4.1 - Ajouter la fonction de rechargement
  const reloadData = () => {
    setLoading(true);
    setError(null);
    fetchProducts();
  };

    const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  // TODO: Exercice 4.2 - Ajouter les fonctions pour la pagination
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return { 
    products, 
    loading, 
    error,
    // TODO: Exercice 4.1 - Retourner la fonction de rechargement
    reloadData,
    // TODO: Exercice 4.2 - Retourner les fonctions et états de pagination
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  };
};

export default useProductSearch;