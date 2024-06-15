import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="-mt-[5.75rem] overflow-hidden pt-[5.75rem]">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-[37.5rem] pb-24 pt-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Contact Us
          </h1>
        </div>
      </div>
      <div className="container max-w-6xl">
        <div className="flex flex-row items-center justify-center">
          <Image src={"/authkeylogo.png"} alt="" width={579} height={183} />
        </div>
        <p className="mt-4">Email : Customersupport@authkey.pro</p>
        <p className="mt-4">Phone number : +91 8920924624</p>
        <p className="mt-4">
          Working hours : Monday to Saturday - 900 hrs - 1800 hrs IST
        </p>
      </div>
    </div>
  );
}
