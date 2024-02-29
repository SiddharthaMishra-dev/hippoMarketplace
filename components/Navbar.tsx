import Link from "next/link";

import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";

import { cn } from "@/lib/utils";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import UserAccountNav from "./UserAccountNav";
import MobileNav from "./MobileNav";

const Navbar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex items-center h-16">
              {/* Mobile navbar */}
              <MobileNav />
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="h-10 w-10" />
                </Link>
              </div>
              <div className="hidden z-50 lg:block lg:ml-8 lg:self-stretch">
                <NavItems />
              </div>
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={cn(buttonVariants({ variant: "ghost" }))}
                    >
                      Sign in
                    </Link>
                  )}

                  {user ? null : (
                    <span
                      className="w-px h-6 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}

                  {user ? (
                    <p>
                      <UserAccountNav user={user} />
                    </p>
                  ) : (
                    <Link
                      href="/sign-up"
                      className={cn(buttonVariants({ variant: "ghost" }))}
                    >
                      Create account
                    </Link>
                  )}

                  {user ? (
                    <span
                      className="w-px h-6 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="w-px h-6 bg-gray-200"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
