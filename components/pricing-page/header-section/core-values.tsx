import { cn } from "@/utils/utils";
import {
  GoldenGiftIcon,
  GoldenHeartIcon,
  LaurelWreathIcon,
} from "@/components/common/icons";
import { CoreValueCard } from "@/components/pricing-page/header-section/core-value-card";

export const CoreValues = () => {
  const coreValues = [
    {
      icon: <LaurelWreathIcon height={40.86} width={46.5} />,
      title: "Best quality",
    },
    {
      icon: <GoldenHeartIcon height={29} width={34} />,
      title: "Loyalty",
    },
    {
      icon: <GoldenGiftIcon size={33.82} />,
      title: "Best price",
    },
  ];

  return (
    <div className={cn("grid grid-cols-3")}>
      {coreValues.map((coreValue, index) => (
        <CoreValueCard
          key={index}
          delay={0.5 + index * 0.25}
          icon={coreValue.icon}
          title={coreValue.title}
        />
      ))}
    </div>
  );
};
