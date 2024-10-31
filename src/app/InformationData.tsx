import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const InformationData = ({
  label,
  text,
  isLoading,
}: {
  label: string;
  text: string | undefined;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[110px]" />
        <Skeleton className="h-4 w-[180px]" />
      </div>
    );
  }

  return (
    <div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label className="font-medium text-md">{label}</Label>
        <p className="leading-7 ">{text || "-"}</p>
      </div>
    </div>
  );
};

export default InformationData;
