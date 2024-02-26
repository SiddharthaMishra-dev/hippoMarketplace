"use client";

import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { cn, formatPrice } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { CheckIcon, Loader2, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { items, removeItem } = useCart();

  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const { mutate: createCheckoutSession, isLoading } = trpc.paymentRouter.createSession.useMutation(
    {
      onSuccess: ({ url }) => {
        if (url) router.push(url);
      },
    }
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const productIds = items.map(({ product }) => product.id);
  const totalPrice = items.reduce((total, { product }) => total + product.price, 0);
  const fee = 30;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-dashed border-2 p-12 border-zinc-200":
                isMounted && items.length === 0,
            })}
          >
            <h2 className="sr-only">Items in your shopping cart</h2>
            {isMounted && items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div className="relative mb-4 h-40 w-40 text-muted-foreground">
                  <Image
                    src="/hippo-empty-cart.png"
                    fill
                    alt="empty shopping cart hippo"
                    loading="eager"
                  />
                </div>
                <h3 className="font-semibold text-2xl">Your cart is empty</h3>
                <p className="text-muted-foreground text-center">
                  Whoops! nothing to show here yet.
                </p>
              </div>
            ) : null}

            <ul
              className={cn({
                "divide-y divide-gray-200 border-b border-t border-gray-200":
                  isMounted && items.length > 0,
              })}
            >
              {isMounted &&
                items.map(({ product }) => {
                  const label = PRODUCT_CATEGORIES.find((c) => c.value === product.category)?.label;
                  const { image } = product.images[0];
                  return (
                    <li
                      key={product.id}
                      className="flex py-6 sm:py-10"
                    >
                      <div className="flex-shrink-0">
                        <div className="relative h-24 w-24">
                          {typeof image !== "string" && image.url ? (
                            <Image
                              src={image.url}
                              fill
                              alt="product-image"
                              className="h-full w-full object-cover object-center sm:h-48 sm:w-48"
                            />
                          ) : null}
                        </div>
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-betweem sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link
                                  href={`/product/${product.id}`}
                                  className="font-semibold text-gray-700 hover:text-gray-800"
                                >
                                  {product.name}
                                </Link>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-muted-foreground">Category: {label}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-900 font-medium">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                          <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                            <div className="absolute top-0 right-0">
                              <Button
                                aria-label="remove product"
                                onClick={() => removeItem(product.id)}
                                variant="ghost"
                              >
                                <XIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 flex space-x-2 text-gray-700 text-sm">
                          <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>Eligible for instant delivery</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>

          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>

                <p>
                  {isMounted ? (
                    formatPrice(totalPrice)
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Flat Transaction Fee</span>
                </div>
                {isMounted ? (
                  formatPrice(fee)
                ) : (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                )}
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-2">
                <div className="text-base font-medium text-gray-900">Order Total</div>
                <div className="text-base font-medium text-gray-900">
                  {isMounted ? (
                    formatPrice(totalPrice + fee)
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 ">
              <Button
                disabled={isLoading || items.length === 0}
                className="w-full"
                size="lg"
                onClick={() => createCheckoutSession({ productIds })}
              >
                {isLoading ? <Loader2 className="animate-spin w-4 h-4 mr-1.5" /> : null}
                Checkout
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Page;
