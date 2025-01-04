import { getData } from "@/utils/load-data";
import SocialMetricsComparison from "@/components/charts/chartPage";

export default async function Home() {
  const data = await getData()

  return (
    <div>
      <main>
        <SocialMetricsComparison engagementData={data} />
      </main>
    </div>
  );
}
