"use client"

import { useFilter } from "@/hooks/useFilter";
import { ProductStock } from "@prisma/client";
import React, { ChangeEvent, useEffect } from "react";

interface FilterCheckboxItemProps {
  id: string;
  value: string;
  type?: "stock" | "brand" | "location" | "category";
}

export default function FilterCheckboxItem({
  id,
  value,
  type,
}: FilterCheckboxItemProps) {
  const { filter, setFilter } = useFilter();

  const parseValue = (val: string) => {
    if (type === "stock") return val as ProductStock;
    return Number.parseInt(val);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!type) return;
    const key =
      type === "stock" ? "stock" : type === "brand" ? "brands" : type === "location" ? "locations" : "categories";

    const parsed = parseValue(e.target.value);
    const prev = filter?.[key] ?? [];

    setFilter({
      [key]: e.target.checked
        ? [...prev, parsed]
        : prev.filter((v: any) => v !== parsed),
    });
};

useEffect(() => {

  }, [filter])
  return (
    <label
      htmlFor={`${id}-${value}`}
      className="font-semibold flex items-center gap-3"
    >
      <input
        type="checkbox"
        id={`${id}-${value}`}
        value={id}
        onChange={onChange}
        className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
      />
      <span>{value}</span>
    </label>
  );
}
