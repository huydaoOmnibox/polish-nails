"use client";
import { Button } from "@nextui-org/button";

import { cn } from "@/utils/utils";
import { InstagramIcon } from "@/components/common/icons";

export function FooterSocialMedia({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      <h3 className="text-xl font-semibold leading-[1.5625rem]">Social</h3>
      <div className={cn("flex items-center gap-2")}>
        <Button
          isIconOnly
          as="a"
          className="!size-12 bg-white"
          radius="full"
          onClick={() =>
            window.open("https://www.instagram.com/polishnail.olten/")
          }
        >
          <InstagramIcon size={16} />
        </Button>
      </div>
    </div>
  );
}
