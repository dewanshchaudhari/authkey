import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCheck, CheckCircle, XCircle } from "lucide-react";

export default function KPI({
  total,
  success,
  failed,
}: {
  total: number;
  success: number;
  failed: number;
}) {
  return (
    <Card>
      {/* <CardHeader>
        <CardTitle className="text-center">Unofficial</CardTitle>
      </CardHeader> */}
      <CardContent className="grid grid-flow-col gap-2 pt-6">
        <div className="flex items-center space-x-4 rounded-md border bg-slate-200 p-4">
          <CheckCircle />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Total</p>
            <p className="text-sm text-muted-foreground">{total}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md border bg-green-200 p-4">
          <CheckCheck />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Succeed</p>
            <p className="text-sm text-muted-foreground">{success}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md border bg-red-200 p-4">
          <XCircle />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Failed</p>
            <p className="text-sm text-muted-foreground">{failed}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
