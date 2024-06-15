import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="-mt-[5.75rem] overflow-hidden pt-[5.75rem]">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-[37.5rem] pb-24 pt-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Privacy policy
          </h1>
        </div>
      </div>
      <div className="container max-w-6xl">
        <div className="flex flex-row items-center justify-center">
          <Image src={"/authkeylogo.png"} alt="" width={579} height={183} />
        </div>
        <p className="mt-4">
          Have you ever received a one-time password (OTP) via SMS to verify a
          transaction or log in? While it&#39;s a commonly used method, did you
          know that SMS OTP authentication isn&#39;t as secure as you might
          think?
        </p>
        <p className="mt-4">
          Well, don&#39;t worry! Many businesses are now switching to encrypted
          OTPs on WhatsApp for added security. So, you can rest easy knowing
          that your transactions and logins are even safer now.
        </p>
        <p className="mt-4">
          By using encrypted OTPs on WhatsApp, businesses can enhance customer
          trust and confidence in their brand, ultimately leading to a positive
          customer experience. Plus, with the widespread use and interactive
          features of WhatsApp, brands have an even more powerful tool for
          securing communication and improving customer interactions.
        </p>
        <p className="mt-4">
          With WhatsApp&#39;s seamless authentication integration, brands can
          initiate conversations to verify user identity using OTPs at different
          stages of the login process, such as account registration, account
          recovery, and integrity validation.
        </p>
        <p className="mt-4">
          This innovative solution not only provides an extra layer of security
          but also offers a convenient experience for the customer. By doing so,
          businesses can build solid and long-lasting relationships with their
          customers based on trust and reliability.
        </p>
        <p className="mt-4">
          <strong>How to send OTP via WhatsApp</strong>
        </p>
        <p className="mt-4">
          If you&#39;re looking to send OTPs, there are two ways to do it. You
          can send OTPs from your dedicated number, which is exclusively
          assigned to your business. Or, you can opt to send OTPs from a shared
          number used by multiple businesses. It&#39;s always good to consider
          both options and choose the one that works best for you. However,
          Authkey.pro is dedicated to send OTPs from a shared number used by
          multiple businesses so that you don&#39;t have to deal with the
          account health and other maintenance issues
        </p>
      </div>
    </div>
  );
}
