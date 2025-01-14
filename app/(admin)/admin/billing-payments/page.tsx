import { Card, CardContent } from "@/components/ui/card";

import BillingQuickStats from "@/components/BillingAndPayment/BillingQuickStats";
import BillingTabs from "@/components/BillingAndPayment/BillingTabs";

const PaymentDashboard = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      {/* Summary Cards */}
      <BillingQuickStats />

      {/* Main Content */}
      <Card>
        <CardContent className="pt-6">
          <BillingTabs />
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentDashboard;
