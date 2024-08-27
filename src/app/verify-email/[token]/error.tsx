"use client"; // Error boundaries must be Client Components

import { Button } from "@nextui-org/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center p-20">
      <h1 className="text-red-400 text-xl">OOPS! {error.message}</h1>
      <Button className="m-2" onClick={()=>reset()} >Try again</Button>
    </div>
  );
}
