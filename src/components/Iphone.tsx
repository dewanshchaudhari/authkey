import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { api } from "@/utils/api";
import React from "react";
import { useToast } from "./ui/use-toast";
import "react-phone-number-input/style.css";
import PhoneInputWithCountrySelect, {
  isPossiblePhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import { type E164Number } from "libphonenumber-js/core";
export default function Iphone() {
  const [phone, setPhone] = React.useState<E164Number | string>();
  const [checkNumber, setCheckNumber] = React.useState<E164Number | string>();
  const { toast } = useToast();

  const { isLoading: isOtpLoading, mutate: send } =
    api.public.sendPublicOtp.useMutation({
      onSuccess: (data) => {
        setPhone("");
        if (data) {
          toast({
            description: "Your otp has been sent.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            variant: "destructive",
          });
        }
      },
      onError: (error) => {
        setPhone("");
        if (error.data?.code === "TOO_MANY_REQUESTS") {
          toast({
            title: "Max Limit Reached",
            description: "Login to use the service",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Internal Server Error",
            description: "Login to use the service",
            variant: "destructive",
          });
        }
      },
    });
  const { isLoading: isCheckLoading, mutate: check } =
    api.public.checkNumberPublic.useMutation({
      onSuccess: (data) => {
        setCheckNumber("");
        if (data) {
          toast({
            title: "Phone number exist on whatsapp.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Phone number doesn't exist on whatsapp.",
            variant: "destructive",
          });
        }
      },
      onError: (error) => {
        setCheckNumber("");
        if (error.data?.code === "TOO_MANY_REQUESTS") {
          toast({
            title: "Max Limit Reached",
            description: "Login to use the service",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Internal Server Error",
            description: "Login to use the service",
            variant: "destructive",
          });
        }
      },
    });
  const sendOtp = () => {
    const parsedPhoneNumber = parsePhoneNumber(phone ?? "");
    if (!parsedPhoneNumber) return;
    send({
      phone: parsedPhoneNumber.nationalNumber,
      countryCode: parsedPhoneNumber.countryCallingCode,
    });
  };
  const checkPhoneNumber = () => {
    const parsedPhoneNumber = parsePhoneNumber(checkNumber ?? "");
    if (!parsedPhoneNumber) return;
    check({
      phone: parsedPhoneNumber.nationalNumber,
      countryCode: parsedPhoneNumber.countryCallingCode,
    });
  };
  return (
    <div className="relative w-1/3 p-8">
      <Image src="/iphone.png" width={1748} height={3565} alt="" />
      <div className="absolute left-0 top-0 h-full w-full">
        <h1 className="mt-40 text-center text-[30px] font-bold leading-[54px]">
          OTP
        </h1>
        <div className="mx-20 mt-4 flex flex-col items-center justify-center gap-4">
          <PhoneInputWithCountrySelect
            placeholder="Enter phone number"
            value={phone}
            onChange={setPhone}
            addInternationalOption={false}
            defaultCountry="IN"
            className="mb-2 flex h-full w-full flex-row items-center justify-between"
          />
          <Button
            disabled={!isPossiblePhoneNumber(phone ?? "") || isOtpLoading}
            onClick={sendOtp}
          >
            Get OTP
          </Button>
        </div>
        <h1 className="mt-24 text-center text-[30px] font-bold leading-[54px]">
          Check Number
        </h1>
        <div className="mx-20 mt-4 flex flex-col items-center justify-center gap-4">
          <PhoneInputWithCountrySelect
            placeholder="Enter phone number"
            value={checkNumber}
            onChange={setCheckNumber}
            addInternationalOption={false}
            defaultCountry="IN"
            className="mb-2 flex h-full w-full flex-row items-center justify-between"
          />
          <Button
            disabled={
              isCheckLoading || !isPossiblePhoneNumber(checkNumber ?? "")
            }
            onClick={checkPhoneNumber}
          >
            Test Number
          </Button>
        </div>
      </div>
    </div>
  );
}
