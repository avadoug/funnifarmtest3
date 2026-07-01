"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProductQuickView } from "./ProductQuickView";
import { useCart } from "@/components/cart/CartProvider";
import type { Product } from "@/lib/products/types";
import { getProductStatusBadges, isAvailableNow } from "@/lib/products/status";
import { formatMoney } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const WISHLIST_KEY = "funni-farm-wishlist";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [favorite, setFavorite] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const inStock = isAvailableNow(product);
  const statusBadges = getProductStatusBadges(product);
  const reviewCount = getReviewCount(product);

  useEffect(() => {
    const saved = window.localStorage.getItem(WISHLIST_KEY);
    const ids = saved ? (JSON.parse(saved) as string[]) : [];
    setFavorite(ids.includes(product.id));
  }, [product.id]);

  function toggleFavorite() {
    const saved = window.localStorage.getItem(WISHLIST_KEY);
    const ids = saved ? (JSON.parse(saved) as string[]) : [];
    const next = ids.includes(product.id)
      ? ids.filter((id) => id !== product.id)
      : [...ids, product.id];

    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
    setFavorite(next.includes(product.id));
  }

  return (
    <>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-seed border border-forest-900/12 bg-cream-50 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-farm">
        <div className="relative aspect-[1.02] overflow-hidden bg-white">
          <Link href={`/product/${product.slug}`} tabIndex={-1}>
            <Image
              alt={product.name}
              className="object-contain p-5 transition duration-500 group-hover:scale-105"
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              src={product.image}
            />
          </Link>
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {statusBadges.slice(0, 2).map((badge) => (
              <Badge key={badge.label} tone={badge.tone}>
                {badge.label}
              </Badge>
            ))}
          </div>
          <div className="absolute right-3 top-3 flex gap-2">
            <button
              aria-label={favorite ? "Remove from wishlist" : "Add to wishlist"}
              className={cn(
                "focus-ring flex size-10 items-center justify-center rounded-full border border-forest-900/10 bg-cream-50/90 text-forest-900 shadow-soft backdrop-blur hover:bg-cream-50",
                favorite && "text-clay",
              )}
              onClick={toggleFavorite}
              type="button"
            >
              <Heart
                aria-hidden
                className={cn("size-5", favorite && "fill-current")}
              />
            </button>
            <button
              aria-label={`Quick view ${product.name}`}
              className="focus-ring flex size-10 items-center justify-center rounded-full border border-forest-900/10 bg-cream-50/90 text-forest-900 shadow-soft backdrop-blur hover:bg-cream-50"
              onClick={() => setQuickViewOpen(true)}
              type="button"
            >
              <Eye aria-hidden className="size-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <Link
            className="font-display text-xl font-black leading-tight text-forest-900 hover:text-clay"
            href={`/product/${product.slug}`}
          >
            {product.name}
          </Link>
          <p className="mt-1 text-sm font-bold text-forest-900/58">
            {getFormatLabel(product)}
          </p>
          <p className="mt-3 flex-1 text-sm leading-6 text-forest-900/68">
            {product.shortDescription}
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs font-black text-forest-900">
            <span className="flex text-harvest-500" aria-hidden>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star className="size-3.5 fill-current" key={index} />
              ))}
            </span>
            <span>({reviewCount})</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge tone="green">Non-Intoxicating</Badge>
            <Badge tone={statusBadges[1]?.tone ?? "cream"}>
              {statusBadges[1]?.label ?? "Transparent Labels"}
            </Badge>
          </div>
          <div className="mt-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-xl font-black text-forest-900">
                {formatMoney(product.price)}
              </p>
              {product.compareAtPrice && (
                <p className="text-xs font-bold text-forest-900/45 line-through">
                  {formatMoney(product.compareAtPrice)}
                </p>
              )}
            </div>
            <Button
              aria-label={
                inStock
                  ? `Start order review for ${product.name}`
                  : `${product.name} is coming soon`
              }
              disabled={!inStock}
              onClick={() => addItem(product)}
              className="min-w-28"
              size="sm"
              variant={inStock ? "primary" : "ghost"}
            >
              <ShoppingBag aria-hidden className="size-5" />
              {inStock ? "Start Order" : "Soon"}
            </Button>
          </div>
        </div>
      </article>
      {quickViewOpen && (
        <ProductQuickView
          onClose={() => setQuickViewOpen(false)}
          product={product}
        />
      )}
    </>
  );
}

function getFormatLabel(product: Product) {
  if (product.packSize) return product.packSize;
  if (product.category === "CBG Gummies") return "CBG per gummy";
  if (product.category === "Capsules") return "CBG per capsule";
  if (product.category === "CBG Oils") return "CBG per bottle";
  if (product.category === "Seeds") return "Farm packet";
  return product.category;
}

function getReviewCount(product: Product) {
  const counts: Record<string, number> = {
    "funni-farm-cbg-gummies": 1248,
    "funni-farm-cbg-oil": 1012,
    "cbg-starter-bundle": 692,
    "funni-farm-cbg-capsules": 623,
    "hemp-seed-pack": 412,
    "mega-cbg-gummy-bear": 87,
  };

  return counts[product.slug] ?? 64;
}
