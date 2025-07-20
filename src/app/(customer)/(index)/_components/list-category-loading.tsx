"use client"

const CategoryLoading = () => {
  return (
    <div id="categories" className="flex flex-col gap-[30px]">
      {/* Header Loading */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
          <div className="h-8 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl bg-[length:200%_100%] animate-[shimmer_2s_infinite] [animation-delay:0.3s]"></div>
        </div>
        <div className="h-12 w-28 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full bg-[length:200%_100%] animate-[shimmer_2s_infinite] [animation-delay:0.6s]"></div>
      </div>

      {/* Grid Loading */}
      <div className="grid grid-cols-4 gap-[30px]">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="category-card-skeleton">
            <div className="bg-white flex items-center gap-[14px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] w-full">
              {/* Icon skeleton with shimmer */}
              <div 
                className="w-12 h-12 flex shrink-0 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              ></div>
              
              {/* Text skeleton with shimmer */}
              <div className="flex flex-col gap-[6px] flex-1">
                <div 
                  className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-[shimmer_2s_infinite] w-3/4"
                  style={{
                    animationDelay: `${index * 0.1 + 0.2}s`
                  }}
                ></div>
                <div 
                  className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-[shimmer_2s_infinite] w-1/2"
                  style={{
                    animationDelay: `${index * 0.1 + 0.4}s`
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CategoryLoading