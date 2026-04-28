import Image from "next/image";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative mb-4 h-44 w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={product.image}
          alt={product.title}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-contain p-3"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <h3 className="line-clamp-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {product.title}
      </h3>
      <p className="mt-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">
        ${product.price.toFixed(2)}
      </p>
    </article>
  );
}
