import React from "react";
import { getData } from "@/utils/load-data";
import SocialMetricsComparison from "@/components/charts/chartPage";

export default async function Home() {
  const data = await getData()

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <SocialMetricsComparison engagementData={data} />
      </div>
    </>
  );
}
