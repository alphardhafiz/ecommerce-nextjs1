import React from "react";
import FormProduct from "../_components/form-product";
import { getBrands } from "../../brands/lib/data";
import { getCategories } from "../../categories/lib/data";
import { getLocations } from "../../locations/lib/data";
import SelectField from "../_components/SelectField";

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