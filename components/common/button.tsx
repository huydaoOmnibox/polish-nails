import React from "react";
import { Button as NextuiButton } from "@nextui-org/button";

import { cn } from "@/utils/utils";
import { fontMontserrat } from "@/config/fonts";

type ButtonProps = {
  text: string;
  className?: string;
};

export function Button({ text, className }: ButtonProps) {
  return (
    <NextuiButton
      className={cn(
        "bg-[url(/images/button-bg.webp)] bg-cover bg-no-repeat px-[2.65rem] py-7 text-center text-sm font-bold uppercase leading-4 text-white",
        fontMontserrat.className,
        className
      )}
      radius="full"
    >
      {text}
    </NextuiButton>
  );
}
