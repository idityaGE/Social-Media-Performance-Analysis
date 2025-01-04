import { getData } from "@/utils/load-data";
import SocialMetricsComparison from "@/components/charts/chartPage";

export default async function Home() {
  const data = await getData()

  return (
    <div className="container mx-auto px-4 py-8">
      <main>
        <SocialMetricsComparison engagementData={data} />
      </main>
    </div>
  );
}
