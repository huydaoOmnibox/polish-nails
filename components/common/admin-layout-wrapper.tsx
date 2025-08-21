"use client";

import { usePathname } from 'next/navigation';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer/footer';

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
}

export function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    // For admin routes, only render the children without navbar and footer
    return <>{children}</>;
  }

  // For non-admin routes, render with navbar and footer
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full flex-grow md:max-w-[90rem]">
        {children}
      </main>
      <Footer />
    </>
  );
} 