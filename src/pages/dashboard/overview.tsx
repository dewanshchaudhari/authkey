import Graph from "@/components/Graph";
import { KPICards } from "@/components/Tab";
import { api } from "@/utils/api";
import { Loader2 } from "lucide-react";

export default function Overview() {
  const { data, isLoading, isError } = api.analytics.getRequestCount.useQuery();
  if (isError || !data) {
    return <h1>Error...</h1>;
  }
  return (
    <div className="flex w-full flex-col gap-4">
      {isLoading ? (
        <div className="w-full text-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          <KPICards data={data} />
          <Graph data={data} />
        </>
      )}
    </div>
  );
}
