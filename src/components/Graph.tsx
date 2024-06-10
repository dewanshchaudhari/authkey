import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { api } from "@/utils/api";
import { type Result } from "@prisma/client";
export default function Graph({
  data,
}: {
  data: {
    id: string;
    result: Result;
    time: Date;
  }[];
}) {
  const clusteredDataMap = new Map<string, number>();
  data.forEach((d) => {
    const value = clusteredDataMap.get(d.time.toDateString());
    if (value) {
      clusteredDataMap.set(d.time.toDateString(), value + 1);
    } else {
      clusteredDataMap.set(d.time.toDateString(), 1);
    }
  });
  const clusteredData = [...clusteredDataMap].map((e) => ({
    time: e[0],
    requests: e[1],
  }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Requests</CardTitle>
        <CardDescription>Your total request from your account.</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={clusteredData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Tooltip />
              {/* <Line
                type="monotone"
                strokeWidth={2}
                dataKey="average"
                activeDot={{
                  r: 6,
                  style: { fill: "var(--theme-primary)", opacity: 0.25 },
                }}
                style={
                  {
                    stroke: "var(--theme-primary)",
                    opacity: 0.25,
                    "--theme-primary": `hsl(${"light"})`,
                  } as React.CSSProperties
                }
              /> */}
              <Line
                type="monotone"
                dataKey="requests"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              {/* <Line
                type="monotone"
                dataKey="time"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: "#000000" },
                }}
                stroke="#000000"
              /> */}
              <XAxis dataKey="time" />
              <YAxis dataKey="requests" />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
