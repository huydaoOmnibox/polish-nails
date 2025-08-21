"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { useState } from "react";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { cn } from "@/utils/utils";
import { fontPlayfairDisplay } from "@/config/fonts";
import logo from "@/public/logo.webp";
import { BookingButton } from "@/components/booking";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NextUINavbar
      className="absolute bg-transparent py-3"
      height={100}
      isBlurred={false}
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand as="li" className="max-w-fit gap-3">
        <NextLink
          className="flex size-[9.375rem] items-center justify-start gap-3"
          href="/"
        >
          <Image alt="logo" height={150} src={logo} width={150} />
        </NextLink>
      </NavbarBrand>

      <NavbarContent
        className="hidden basis-1/5 sm:flex sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden gap-9 sm:flex">
          {siteConfig.navItems.map((item) => (
            <Link
              key={`${item.label}`}
              className={cn(
                "text-base font-medium leading-4 tracking-[0.01em] text-white",
                fontPlayfairDisplay.className
              )}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
        <NavbarMenuToggle className="text-white" />
      </NavbarContent>

      <NavbarMenu className="mt-5">
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="text-black"
                href={item.href}
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
