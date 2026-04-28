"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types/product";

type SortOption = "name-asc" | "price-asc" | "price-desc";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [delay, value]);

  return debouncedValue;
}

export function ProductDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");

  const debouncedSearch = useDebouncedValue(search, 350);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not fetch product data.");
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setErrorMessage("Unable to load products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();

    return () => {
      controller.abort();
    };
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(normalizedSearch)
    );

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "price-asc") {
        return a.price - b.price;
      }

      return b.price - a.price;
    });

    return sorted;
  }, [debouncedSearch, products, sortBy]);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm md:p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Vehicle / Product Listing
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            API powered dashboard with search and sorting.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              Search by name
            </span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 outline-none ring-zinc-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              Sort by
            </span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 outline-none ring-zinc-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950"
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="price-asc">Price (Low-High)</option>
              <option value="price-desc">Price (High-Low)</option>
            </select>
          </label>
        </div>
      </div>

      {isLoading ? (
        <p className="rounded-lg border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
          Loading products...
        </p>
      ) : null}

      {errorMessage ? (
        <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200">
          {errorMessage}
        </p>
      ) : null}

      {!isLoading && !errorMessage ? (
        <>
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            Showing {filteredAndSortedProducts.length} item(s)
          </p>

          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 2}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
              No products match your current search.
            </p>
          )}
        </>
      ) : null}
    </section>
  );
}
