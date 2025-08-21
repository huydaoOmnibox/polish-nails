export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Polish Nail",
  description: "Polish Nail is a nail salon that offers a variety of services.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Our Services",
      href: "/services",
    },
    {
      label: "Price",
      href: "/pricing",
    },
  ],
};
