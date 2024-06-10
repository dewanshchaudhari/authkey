import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Banknote, MonitorSmartphone, ShieldCheck } from "lucide-react";

export function FrontPageCardLeft() {
  return (
    <Card className="w-1/3">
      <CardContent className="flex flex-col items-center justify-center p-4">
        <ShieldCheck className="h-20 w-20 text-red-600" />
        <h1 className="text-[30px] font-bold leading-[54px]">Secure</h1>
        <h2 className="p-4 text-justify">
          Authkey uses the secure infrastructure of WhatsApp to verify
          user&#39;s identity, reducing the risk of fraud and theft.
        </h2>
      </CardContent>
    </Card>
  );
}

export function FrontPageCardMiddle() {
  return (
    <Card className="w-1/3">
      <CardContent className="flex flex-col items-center justify-center p-4">
        <MonitorSmartphone className="h-20 w-20 " />
        <h1 className="text-[30px] font-bold leading-[54px]">Convenient</h1>
        <h2 className="p-4 text-justify">
          Authkey is accessible to users with a smartphone, providing a seamless
          and hassle-free login experience.
        </h2>
      </CardContent>
    </Card>
  );
}

export function FrontPageCardRight() {
  return (
    <Card className="w-1/3">
      <CardContent className="flex flex-col items-center justify-center p-4">
        <Banknote className="h-20 w-20 text-green-600" />
        <h1 className="text-[30px] font-bold leading-[54px]">Cost Effective</h1>
        <h2 className="p-4 text-justify">
          Authkey eliminates the cost of SMS and OTPs, providing a more
          cost-effective solution for mobile verification.
        </h2>
      </CardContent>
    </Card>
  );
}
