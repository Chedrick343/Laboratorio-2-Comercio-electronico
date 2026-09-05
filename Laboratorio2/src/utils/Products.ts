/* =====================
   TIPOS COMPARTIDOS
===================== */

export interface Product {
    objectID: string;
    title: string;
    description: string;
    brand: string;
    price: number;
    currency: string;
    categories: string[];
    in_stock: boolean;
    stock_quantity: number;
    rating: number;
    image_url: string;
    facets: Record<string, string | number | boolean>;
}


export interface ProductFilters {
    search: string;
    categories: string[];
    minPrice: number;
    maxPrice: number;
}


export const MIN_PRICE = 0;
export const MAX_PRICE = 1_000_000;
export const PRICE_STEP = 10_000;


export const DEFAULT_FILTERS: ProductFilters = {
    search: '',
    categories: [],
    minPrice: MIN_PRICE,
    maxPrice: MAX_PRICE
};


/* =====================
   UTILIDADES
===================== */

// Pasa a minúsculas y quita tildes, para que "audifonos"
// también encuentre "Audífonos"
const normalize = (text: string) =>
    text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();


/* =====================
   FILTRADO
===================== */

export function filterProducts(
    products: Product[],
    filters: ProductFilters
): Product[] {

    const term = normalize(filters.search);

    return products.filter((product) => {

        /* 1. TEXTO DE BÚSQUEDA
           Busca en título, marca, descripción y categorías */

        if (term !== '') {

            const haystack = normalize(
                [
                    product.title,
                    product.brand,
                    product.description,
                    product.categories.join(' ')
                ].join(' ')
            );

            if (!haystack.includes(term)) {
                return false;
            }

        }


        /* 2. CATEGORÍAS
           El producto pasa si tiene AL MENOS UNA de las
           categorías seleccionadas. Sin selección, pasan todos. */

        if (filters.categories.length > 0) {

            const matchesCategory = filters.categories.some(
                (category) => product.categories.includes(category)
            );

            if (!matchesCategory) {
                return false;
            }

        }


        /* 3. RANGO DE PRECIO */

        if (product.price < filters.minPrice) {
            return false;
        }

        if (product.price > filters.maxPrice) {
            return false;
        }


        return true;
    });
}