/* eslint-disable @next/next/no-img-element */
import React from "react";
import CardProduct from "../../_components/card-product";

export default function ProductListing() {
  return (
    <div className="grid grid-cols-3 gap-[30px]">
      <CardProduct
        item={{
          category_name: "Desktops",
          id: 1,
          image_url:
            "assets/thumbnails/color_back_green__buxxfjccqjzm_large_2x-Photoroom 1.png",
          name: "iMac Green Energy",
          price: 24000000,
        }}
      />
    </div>
  );
}
