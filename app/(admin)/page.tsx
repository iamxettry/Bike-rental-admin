import QuickStats from "@/components/Graphs/QuickStats";
import dynamic from "next/dynamic";

const DashboardGraphs = dynamic(
  () => import("@/components/Graphs/DashboardGraphs")
);

export default function Home() {
  return (
    <>
      <QuickStats />
      {/* Bike usage trends */}
      <DashboardGraphs />
    </>
  );
}
