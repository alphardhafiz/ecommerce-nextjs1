import { TEdit } from "@/types";
import React from "react";
import { getProductById } from "../../lib/data";
import { redirect } from "next/navigation";
import FormProduct from "../../_components/form-product";
import { getBrands } from "../../../brands/lib/data";
import { getCategories } from "../../../categories/lib/data";
import { getLocations } from "../../../locations/lib/data";
import SelectField from "../../_components/SelectField";

export default async function EditPage({ params }: TEdit) {
  const data = await getProductById(params.id);
  
  if (!data) {
    return redirect("/dashboard/products");
  }

  const [brands, categories, locations] = await Promise.all([
    getBrands(),
    getCategories(),
    getLocations(),
  ]);

  const selectFields = [
    {
      id: "category",
      name: "category_id",
      label: "Category",
      placeholder: "Select category",
      ariaLabel: "Select category",
      options: categories,
      defaultValue: data.category_id?.toString(), 
    },
    {
      id: "brand",
      name: "brand_id",
      label: "Brand",
      placeholder: "Select brand",
      ariaLabel: "Select Brand",
      options: brands,
      defaultValue: data.brand_id?.toString(), 
    },
    {
      id: "location",
      name: "location_id",
      label: "Location",
      placeholder: "Select location",
      ariaLabel: "Select location",
      options: locations,
      defaultValue: data.location_id?.toString(), 
    },
  ];
  return (
    <FormProduct type="EDIT" data={data}>
      {selectFields.map((field) => (
        <SelectField key={field.id} {...field}  />
      ))}
    </FormProduct>
  );
}
