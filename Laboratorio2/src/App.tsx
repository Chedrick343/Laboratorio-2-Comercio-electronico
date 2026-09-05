import { useMemo, useState } from 'react';
import './App.css';

import SearchBar from './components/search-bar/searchBar';
import Filters from './components/filters/filters';
import ProductsGrid from './components/Products/Products';

import {
    DEFAULT_FILTERS,
    filterProducts,
    type Product,
    type ProductFilters
} from './utils/Products';

// Ajustá el nombre del archivo según tu carpeta src/Data
import productsData from './Data/products (1).json';


const allProducts = productsData as Product[];


export default function App() {

    /* BORRADOR: lo que el usuario está escribiendo / marcando ahora */

    const [draftSearch, setDraftSearch] = useState('');
    const [draftFilters, setDraftFilters] = useState<ProductFilters>(DEFAULT_FILTERS);


    /* APLICADO: la consulta que realmente se ejecutó
       Se actualiza solo cuando se presiona Search */

    const [appliedFilters, setAppliedFilters] = useState<ProductFilters>(DEFAULT_FILTERS);


    const handleSearch = () => {

        setAppliedFilters({
            ...draftFilters,
            search: draftSearch
        });

    };


    const filteredProducts = useMemo(
        () => filterProducts(allProducts, appliedFilters),
        [appliedFilters]
    );


    return (

        <main className="app">

            {/* Acá van tus componentes <Header /> y <Logo /> */}

            <SearchBar
                value={draftSearch}
                onChange={setDraftSearch}
                onSearch={handleSearch}
            />

            <Filters
                filters={draftFilters}
                onFiltersChange={setDraftFilters}
            />

            <ProductsGrid products={filteredProducts} />

        </main>

    );
}