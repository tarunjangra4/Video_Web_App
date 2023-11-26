import React from "react";
import testImage from "../images/testImage1.jpg";

const GoogleAdsSection = () => {
  const arr = [1, 1, 1, 1, 1];
  return (
    <div className="w-full">
      <div className="flex justify-between pr-6">
        <h2 className="mr-4 text-[#4338b0] font-semibold text-xl">
          Google Ads
        </h2>
        <h2 className="mr-4 text-[#b4adff] font-semibold text-lg cursor-pointer">
          View all
        </h2>
      </div>
      <div className="flex overflow-x-auto no-scrollbar gap-10 pb-5 pr-6 mt-2">
        {arr.map((item, index) => (
          <div
            key={index}
            className="w-[450px] h-64 flex-shrink-0 shadow-lg shadow-[#8d86db]"
          >
            <img
              className="w-[450px] h-64 object-fill flex-shrink-0 rounded"
              src={testImage}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoogleAdsSection;
