import React from "react";
import FormProduct from "../_components/form-product";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBrands } from "../../brands/lib/data";
import { getCategories } from "../../categories/lib/data";
import { getLocations } from "../../locations/lib/data";

// Reusable SelectField component
type SelectFieldProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  options: { id: number; name: string }[];
  ariaLabel: string;
};

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  label,
  placeholder,
  options,
  ariaLabel,
}) => (
  <div className="grid gap-3">
    <Label htmlFor={id}>{label}</Label>
    <Select name={name}>
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

export default async function CreatePage() {
  // Fetch all data concurrently
  const [brands, categories, locations] = await Promise.all([
    getBrands(),
    getCategories(),
    getLocations(),
  ]);

  // Configuration for select fields
  const selectFields = [
    {
      id: "category",
      name: "category_id",
      label: "Category",
      placeholder: "Select category",
      ariaLabel: "Select category",
      options: categories,
    },
    {
      id: "brand",
      name: "brand_id",
      label: "Brand",
      placeholder: "Select brand",
      ariaLabel: "Select Brand",
      options: brands,
    },
    {
      id: "location",
      name: "location_id",
      label: "Location",
      placeholder: "Select location",
      ariaLabel: "Select location",
      options: locations,
    },
  ];

  return (
    <FormProduct type="ADD">
      {selectFields.map((field) => (
        <SelectField key={field.id} {...field} />
      ))}
    </FormProduct>
  );
}