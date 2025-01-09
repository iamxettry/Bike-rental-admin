import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import dynamic from "next/dynamic";

const DashboardGraphs = dynamic(() => import("@/components/Graphs/DashboardGraphs"));

export default function Home() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Total Bikes</p>
              <p className="text-2xl font-bold">100</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg">
              <p className="text-sm text-green-600 font-medium">
                Active Rentals
              </p>
              <p className="text-2xl font-bold">45</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg">
              <p className="text-sm text-yellow-600 font-medium">
                Today's Revenue
              </p>
              <p className="text-2xl font-bold">$890</p>
            </div>
            <div className="p-4 bg-purple-200 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">New Users</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </CardContent>
      </Card>{" "}
      {/* Bike usage trends */}
      <DashboardGraphs />
    </div>
  );
}
