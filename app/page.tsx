import Image from "next/image";
import {
  ClipboardCheck,
  Heart,
  Mail,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { TrustBar } from "@/components/brand/TrustBar";
import { ProductCard } from "@/components/product/ProductCard";
import { farmImages } from "@/lib/brand/farmImages";
import { getProducts } from "@/lib/products/repository";
import type { Product } from "@/lib/products/types";

const bestSellerSlugs = [
  "funni-farm-cbg-gummies",
  "funni-farm-cbg-oil",
  "cbg-starter-bundle",
  "funni-farm-cbg-capsules",
  "hemp-seed-pack",
];

const heroProducts = [
  {
    label: "CBG Gummies",
    image: "/images/products/funni-farm-cbg-gummies-front-logo.webp",
  },
  {
    label: "CBG Oil",
    image: "/products/cbg-oil.svg",
  },
  {
    label: "CBG Capsules",
    image: "/images/products/funni-farm-cbg-capsules-bowl-card.webp",
  },
];

const orderSteps = [
  {
    icon: ShoppingBag,
    title: "Choose Your Products",
    text: "Browse best sellers or use the Product Finder to find your fit.",
  },
  {
    icon: ClipboardCheck,
    title: "Review Your Order",
    text: "Check your cart, quantities, shipping details, and adult-use notes.",
  },
  {
    icon: Truck,
    title: "We Pack & Ship",
    text: "The farm reviews availability, compliance, and shipping before fulfillment.",
  },
  {
    icon: Heart,
    title: "Enjoy & Feel Your Best",
    text: "Consistent wellness routines, backed by nature and transparency.",
  },
];

const testimonials = [
  {
    name: "Melissa R.",
    location: "Nashville, TN",
    text: "These gummies help me keep my evening routine simple. I love that they are non-intoxicating and farm made.",
  },
  {
    name: "Jason T.",
    location: "Chattanooga, TN",
    text: "The product pages made it easy to understand the order review process and where lab results fit in.",
  },
  {
    name: "Emily P.",
    location: "Knoxville, TN",
    text: "The Funni Farm feels warm, transparent, and personal. I trust the clear labels and family farm story.",
  },
];

export default async function HomePage() {
  const products = await getProducts();
  const bestSellers = orderProducts(products, bestSellerSlugs);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-forest-900/10 bg-cream-50">
        <div className="absolute inset-0">
          <Image
            alt={farmImages.hersheyFenceWide.alt}
            className="object-cover object-center"
            fill
            priority
            sizes="100vw"
            src={farmImages.hersheyFenceWide.src}
          />
          <div className="absolute inset-0 bg-cream-50/80 lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-cream-50/90 via-cream-50/70 to-cream-50/90 lg:bg-gradient-to-r lg:from-cream-50/95 lg:via-cream-50/75 lg:to-forest-900/10" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cream-50 to-transparent" />
        </div>

        <div className="relative mx-auto grid min-h-[680px] max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[.92fr_1.08fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-forest-700">
              Rooted in Tennessee. Grown for wellness.
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-black leading-[0.95] text-forest-900 sm:text-6xl lg:text-7xl">
              Non-Intoxicating. CBG-Rich. Family Made.
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-forest-900/78">
              Premium hemp wellness that supports clarity, calm, and everyday
              balance, without the high.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#best-sellers" size="lg">
                <ShoppingBag aria-hidden className="size-5" />
                Shop Best Sellers
              </ButtonLink>
              <ButtonLink href="/product-finder" size="lg" variant="secondary">
                <Sparkles aria-hidden className="size-5" />
                Find Your Fit
              </ButtonLink>
            </div>
          </div>

          <div className="relative hidden min-h-[520px] lg:block" id="hershey">
            <div className="absolute right-4 top-6 rounded-full border border-cream-50/50 bg-cream-50/88 px-4 py-2 font-display text-xl italic text-forest-900 shadow-soft">
              Hi, I&apos;m Hershey!
            </div>
            <div className="absolute bottom-8 right-0 grid w-[86%] grid-cols-3 gap-3">
              {heroProducts.map((item) => (
                <div
                  className="rounded-seed border border-forest-900/12 bg-cream-50/92 p-3 text-center shadow-farm backdrop-blur"
                  key={item.label}
                >
                  <div className="relative aspect-square rounded-xl bg-white">
                    <Image
                      alt={item.label}
                      className="object-contain p-2"
                      fill
                      sizes="160px"
                      src={item.image}
                    />
                  </div>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-forest-900">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <TrustBar />
      </section>

      <section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        id="best-sellers"
      >
        <SectionIntro
          eyebrow="Our Best Sellers"
          title="Customer favorites from the farm shelf."
          text="Top products are easy to compare, easy to add to order review, and supported by clear labels, batch transparency, and farm-direct follow-up."
        />
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-seed border border-forest-900/12 bg-cream-50 p-5 shadow-soft">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
              How Ordering Works
            </p>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {orderSteps.map((step, index) => (
              <article
                className="grid grid-cols-[auto_1fr] gap-3 border-forest-900/10 md:border-r md:pr-4 md:last:border-r-0"
                key={step.title}
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-forest-700 font-display text-xl font-black text-cream-50">
                  {index + 1}
                </span>
                <div>
                  <step.icon aria-hidden className="mb-2 size-6 text-clay" />
                  <h3 className="text-sm font-black uppercase text-forest-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold leading-5 text-forest-900/68">
                    {step.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-5 max-w-3xl text-center text-sm font-bold leading-6 text-forest-900/68">
            Checkout creates an order request. The farm reviews availability,
            age requirements, shipping rules, compliance details, and payment
            instructions before fulfillment.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Loved By Our Community"
          title="Real confidence starts with clear expectations."
          text="Friendly product pages, careful order review, and approachable farm communication help customers shop with less guesswork."
        />
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              className="rounded-seed border border-forest-900/12 bg-cream-50 p-5 shadow-soft"
              key={testimonial.name}
            >
              <div className="flex gap-1 text-harvest-500" aria-hidden>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star className="size-4 fill-current" key={index} />
                ))}
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-forest-900/72">
                “{testimonial.text}”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-forest-700 font-display text-lg font-black text-cream-50">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-black text-forest-900">
                    {testimonial.name}
                  </p>
                  <p className="text-xs font-bold text-forest-900/56">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[2rem] border border-forest-900/12 bg-forest-900 text-cream-50 shadow-farm lg:grid-cols-[.85fr_1.15fr]">
          <div className="relative min-h-[22rem]">
            <Image
              alt={farmImages.hempFieldSun.alt}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              src={farmImages.hempFieldSun.src}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-900/55 to-transparent" />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-harvest-300">
              Have questions?
            </p>
            <h2 className="mt-3 font-display text-4xl font-black">
              Let&apos;s make CBG shopping simple.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-cream-100/76">
              Learn what CBG is, review lab results, or contact the farm before
              you submit an order request.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/learn/what-is-cbg" variant="secondary">
                Learn About CBG
              </ButtonLink>
              <ButtonLink
                className="border-cream-50/30 text-cream-50 hover:bg-cream-50/10"
                href="/contact"
                variant="ghost"
              >
                <Mail aria-hidden className="size-5" />
                Contact the Farm
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionIntro({
  eyebrow,
  text,
  title,
}: {
  eyebrow: string;
  text: string;
  title: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-3xl font-black text-forest-900 md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 leading-7 text-forest-900/72">{text}</p>
    </div>
  );
}

function orderProducts(products: Product[], slugs: string[]) {
  const bySlug = new Map(products.map((product) => [product.slug, product]));

  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((product): product is Product => Boolean(product));
}
