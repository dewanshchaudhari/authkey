import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Method, type Result } from "@prisma/client";
import KPI from "./KPI";
const extractData = (
  method: Method,
  data: {
    id: string;
    result: Result;
    time: Date;
    method: Method;
  }[]
) => {
  const total = data.filter((d) => d.method === method).length;
  const success = data.filter(
    (d) => d.method === method && d.result === "SUCCESS"
  ).length;
  const failed = data.filter(
    (d) => d.method === method && d.result === "FAILED"
  ).length;
  return { total, success, failed };
};
export function KPICards({
  data,
}: {
  data: {
    id: string;
    result: Result;
    time: Date;
    method: Method;
  }[];
}) {
  return (
    <KPI {...extractData("WM", data)} />
    // <Tabs defaultValue="wu" className="w-full">
    //   <TabsList className="grid w-full grid-cols-3">
    //     <TabsTrigger value="wu">Whatsapp Unoffical</TabsTrigger>
    //     <TabsTrigger value="wo">Whatsapp</TabsTrigger>
    //     <TabsTrigger value="sms">SMS</TabsTrigger>
    //   </TabsList>
    //   <TabsContent value="wu">
    //     <KPI {...extractData("WU", data)} />
    //   </TabsContent>
    //   <TabsContent value="wo">
    //     <KPI {...extractData("WO", data)} />
    //   </TabsContent>
    //   <TabsContent value="sms">
    //     <KPI {...extractData("SMS", data)} />
    //   </TabsContent>
    // </Tabs>
  );
}
