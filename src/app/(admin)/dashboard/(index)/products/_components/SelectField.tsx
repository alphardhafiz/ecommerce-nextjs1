import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectFieldProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  options: { id: number; name: string }[];
  ariaLabel: string;
  defaultValue?: string; 
};

export default function SelectField({
  id,
  name,
  label,
  placeholder,
  options,
  ariaLabel,
  defaultValue = "",
}: SelectFieldProps) {
  return (
    <div className="grid gap-3">
      <Label htmlFor={id}>{label}</Label>
      <Select name={name} defaultValue={defaultValue}>
        <SelectTrigger id={id} aria-label={ariaLabel}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem key={option.id} value={`${option.id}`}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
