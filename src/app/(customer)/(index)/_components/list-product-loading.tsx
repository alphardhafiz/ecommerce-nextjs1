"use client"

interface ProductsLoadingProps {
  title?: React.ReactNode;
}

export default function ProductsLoading({ title = null }: ProductsLoadingProps) {
  return (
    <div id="picked" className="flex flex-col gap-[30px]">
      {/* Header Loading */}
      <div className="flex items-center justify-between">
        {title ? (
          <h2 className="font-bold text-2xl leading-[34px]">{title}</h2>
        ) : (
          <div className="h-8 w-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md animate-pulse bg-[length:200%_100%] shimmer-animation"></div>
        )}
        <div className="h-12 w-28 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-pulse bg-[length:200%_100%] shimmer-animation"></div>
      </div>

      {/* Grid Loading - 5 columns */}
      <div className="grid grid-cols-5 gap-[30px]">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="product-card-skeleton">
            <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] w-full">
              {/* Image skeleton with shimmer */}
              <div className="relative w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%] shimmer-animation"></div>
              </div>
              
              {/* Content skeleton with shimmer */}
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-1">
                  <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%] shimmer-animation w-full"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%] shimmer-animation w-2/3"></div>
                </div>
                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%] shimmer-animation w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}