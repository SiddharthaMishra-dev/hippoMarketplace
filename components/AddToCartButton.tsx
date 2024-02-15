"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const AddToCartButton = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeOut);
  }, [isSuccess]);

  return (
    <Button
      onClick={() => {
        setIsSuccess(true);
      }}
      size="lg"
      className="w-full"
    >
      {isSuccess ? "Added!" : "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;
