import { useState } from 'react';
import styles from './Filters.module.css';

const categories = [
    'Rings',
    'Necks',
    'Earrings',
    'Bracelets'
];

const MIN_PRICE = 0;
const MAX_PRICE = 1_000_000;
const PRICE_STEP = 10_000;

export default function Filters() {

    const [filtersOpen, setFiltersOpen] = useState(false);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const [minPrice, setMinPrice] = useState(MIN_PRICE);
    const [maxPrice, setMaxPrice] = useState(MAX_PRICE);


    const handleCategoryChange = (category: string) => {

        setSelectedCategories((previousCategories) => {

            if (previousCategories.includes(category)) {

                return previousCategories.filter(
                    (item) => item !== category
                );

            }

            return [...previousCategories, category];
        });
    };


    const handleMinPriceChange = (value: number) => {

        // Evita que el mínimo sea mayor que el máximo
        if (value <= maxPrice) {
            setMinPrice(value);
        }

    };


    const handleMaxPriceChange = (value: number) => {

        // Evita que el máximo sea menor que el mínimo
        if (value >= minPrice) {
            setMaxPrice(value);
        }

    };


    return (

        <section className={styles.filters}>

            {/* BOTÓN PRINCIPAL */}

            <button
                className={styles.filtersButton}
                onClick={() => setFiltersOpen(!filtersOpen)}
            >
                Filters
                <span>
                    {filtersOpen ? '▲' : '▼'}
                </span>
            </button>


            {/* PANEL DE FILTROS */}

            {filtersOpen && (

                <div className={styles.filtersPanel}>


                    {/* =====================
                        CATEGORIES
                    ===================== */}

                    <div className={styles.filterSection}>

                        <h2 className={styles.filterTitle}>
                            Categories
                        </h2>


                        <div className={styles.categoriesList}>

                            {categories.map((category) => (

                                <label
                                    key={category}
                                    className={styles.categoryOption}
                                >

                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() =>
                                            handleCategoryChange(category)
                                        }
                                    />

                                    <span>
                                        {category}
                                    </span>

                                </label>

                            ))}

                        </div>

                    </div>


                    {/* =====================
                        PRICE RANGE
                    ===================== */}

                    <div className={styles.filterSection}>

                        <h2 className={styles.filterTitle}>
                            Price Range
                        </h2>


                        {/* PRECIOS ACTUALES */}

                        <div className={styles.priceValues}>

                            <div className={styles.priceBox}>

                                <span>Minimum</span>

                                <strong>
                                    ₡{minPrice.toLocaleString('es-CR')}
                                </strong>

                            </div>


                            <div className={styles.priceBox}>

                                <span>Maximum</span>

                                <strong>
                                    ₡{maxPrice.toLocaleString('es-CR')}
                                </strong>

                            </div>

                        </div>


                        {/* SLIDER MÍNIMO */}

                        <div className={styles.sliderContainer}>

                            <label className={styles.sliderLabel}>
                                Minimum Price
                            </label>

                            <input
                                type="range"
                                min={MIN_PRICE}
                                max={MAX_PRICE}
                                step={PRICE_STEP}
                                value={minPrice}
                                onChange={(event) =>
                                    handleMinPriceChange(
                                        Number(event.target.value)
                                    )
                                }
                                className={styles.priceSlider}
                            />

                        </div>


                        {/* SLIDER MÁXIMO */}

                        <div className={styles.sliderContainer}>

                            <label className={styles.sliderLabel}>
                                Maximum Price
                            </label>

                            <input
                                type="range"
                                min={MIN_PRICE}
                                max={MAX_PRICE}
                                step={PRICE_STEP}
                                value={maxPrice}
                                onChange={(event) =>
                                    handleMaxPriceChange(
                                        Number(event.target.value)
                                    )
                                }
                                className={styles.priceSlider}
                            />

                        </div>


                        {/* LÍMITES */}

                        <div className={styles.priceLimits}>

                            <span>
                                ₡0
                            </span>

                            <span>
                                ₡1,000,000
                            </span>

                        </div>

                    </div>

                </div>

            )}

        </section>

    );
}