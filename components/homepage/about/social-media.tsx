"use client";
import { Button as NextuiButton } from "@nextui-org/button";

import { cn } from "@/utils/utils";
import { InstagramIcon } from "@/components/common/icons";

export function SocialMedia({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <NextuiButton
        isIconOnly
        as="a"
        className="!size-12 bg-white"
        radius="full"
        onClick={() =>
          window.open("https://www.instagram.com/polishnail.olten/")
        }
      >
        <InstagramIcon />
      </NextuiButton>
    </div>
  );
}
