import React from "react";
import testImage from "../images/testImage1.jpg";

const IntroSection = () => {
  const arr = [1, 1, 1, 1, 1];
  return (
    <div className="w-full">
      <div className="flex justify-between pr-6">
        <h2 className="mr-4 text-[#4338b0] font-semibold text-xl">
          Introduction
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
              // src={testImage}
              src="https://s3.ca-central-1.amazonaws.com/thumbnails.video.app/thumb1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2RGB5PNDDMTHJYFL%2F20231118%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20231118T200142Z&X-Amz-Expires=604800&X-Amz-Signature=689cabcb205abd7e15f2dc1c1f84bcba18abbe73981bf763294e5d5f33be35c1&X-Amz-SignedHeaders=host&x-id=GetObject"
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntroSection;
