"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import BillingAndPaymentServices from "@/services/BillingAndPaymentServices";
import Loading from "../utils/Loading";

const extractPaymentData = (date: string) => {
  return date.split("T")[0];
};
const BillingTabs = () => {
  const [currentTab, setCurrentTab] = useState("history");
  console.log(currentTab);
  const { data, isLoading: isHistoryPaymentLoading } = useQuery({
    queryFn: async () =>
      await BillingAndPaymentServices.getMonthlyPaymentHistory(),
    queryKey: ["monthly-stats"],
  });
  //   fetch payment list
  const { data: PaymentList, isLoading } = useQuery({
    queryFn: async () => await BillingAndPaymentServices.getPaymentList(),
    queryKey: ["payment-list"],
  });

  return (
    <Tabs defaultValue="history" onValueChange={setCurrentTab}>
      <TabsList>
        <TabsTrigger value="history">Payment History</TabsTrigger>
        {/* <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="refunds">Refunds & Adjustments</TabsTrigger> */}
      </TabsList>

      <TabsContent value="history" className="space-y-4">
        <div className="h-[200px]">
          {isHistoryPaymentLoading ? (
            <div className="text-center py-8 text-gray-500">
              <Loading />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="rounded-md border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Remaining Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {!isLoading &&
                PaymentList?.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {extractPaymentData(payment.payment_date)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      Rs {payment.amount_paid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      Rs {payment.remaining_amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          payment?.status === "SUCCESS"
                            ? "bg-green-100 text-green-800"
                            : payment?.status === "FAILED"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </TabsContent>

      <TabsContent value="invoices">
        <div className="text-center py-8 text-gray-500">
          No invoices available
        </div>
      </TabsContent>

      <TabsContent value="refunds">
        <div className="text-center py-8 text-gray-500">
          No pending refunds or adjustments
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default BillingTabs;
