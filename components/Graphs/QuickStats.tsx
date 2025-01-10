import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GraphServices from "@/services/GraphServices";

const QuickStats = async () => {
  let getQuickStats;

  try {
    getQuickStats = await GraphServices.qetQuickStats();
  } catch (error) {
    console.error("Failed to fetch quick stats:", error);
    getQuickStats = null; // Fallback value
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-100 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">Total Bikes</p>
            <p className="text-2xl font-bold">
              {getQuickStats ? getQuickStats?.total_bikes : 0}
            </p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Active Rentals</p>
            <p className="text-2xl font-bold">
              {getQuickStats?.active_rentals}
            </p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-lg">
            <p className="text-sm text-yellow-600 font-medium">
              Today's Revenue
            </p>
            <p className="text-2xl font-bold">
              Rs {getQuickStats?.todays_revenue}{" "}
            </p>
          </div>
          <div className="p-4 bg-purple-200 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">New Users</p>
            <p className="text-2xl font-bold">{getQuickStats?.new_users}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStats;
