import Image from "next/image";
import React from "react";
export default function Iphone() {
  return (
    <div className="relative w-1/3 p-8">
      <Image src="/iphone.png" width={553} height={1116} alt="" />
    </div>
  );
}
