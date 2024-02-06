"use client";

import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isError, isLoading } = trpc.auth.verifyEmail.useQuery({ token });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-600" />
        <h3 className="font-semibold text-xl">Something went wrong</h3>
        <p className="text-muted-foreground text-sm">
          This token is not valid or might expired. Please try again.
        </p>
      </div>
    );
  }
  if (data?.success) {
    return (
      <div className=" h-full flex flex-col items-center justify-center">
        <div className="relative h-60 w-60 mb-4 text-muted-foreground">
          <Image
            src="/hippo-email-sent.png"
            alt="hippo sent email"
            fill
          />
        </div>
        <h3 className="text-2xl font-semibold">You&apos;re all set!</h3>
        <p className="text-muted-foreground mt-1 text-center">Thank you for verifying your email</p>
        <Link
          href="/sign-in"
          className={buttonVariants({ className: "mt-4" })}
        >
          Sign in
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="animate-spin h-8 w-8 text-zinc-500" />
        <h3 className="font-semibold text-xl">Verifying...</h3>
        <p className="text-muted-foreground text-sm">This won&apos;t take long.</p>
      </div>
    );
  }
};

export default VerifyEmail;
