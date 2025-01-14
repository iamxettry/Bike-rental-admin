import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown, Download, MoreHorizontal } from "lucide-react";
import BillingAndPaymentServices from "@/services/BillingAndPaymentServices";

const BillingQuickStats = async () => {
  const quickStats = await BillingAndPaymentServices.getQuickStats();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
          <ArrowUpDown className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{quickStats.total_payments}</div>
          {/* <p className="text-xs text-gray-500">+20.1% from last month</p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Successful Payments
          </CardTitle>
          <MoreHorizontal className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {quickStats.successful_payments}
          </div>
          {/* <p className="text-xs text-gray-500">2 bikes, 1 e-bike</p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Payments
          </CardTitle>
          <Download className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {quickStats.pending_payments}
          </div>
          {/* <p className="text-xs text-gray-500">1 pending request</p> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingQuickStats;
