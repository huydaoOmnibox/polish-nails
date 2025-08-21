import { cn } from "@/utils/utils";
import { HeaderTitle } from "@/components/pricing-page/header-section/header-title";
import { CoreValues } from "@/components/pricing-page/header-section/core-values";

export function HeaderSection() {
  return (
    <section
      className={cn(
        "relative w-full bg-[url(/images/price-header-bg.webp)] bg-cover bg-center bg-no-repeat px-8 pb-[4.625rem] pt-[10.5rem] md:px-32"
      )}
    >
      <div
        className={cn(
          "grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-0"
        )}
      >
        <HeaderTitle />
        <CoreValues />
      </div>
    </section>
  );
}
