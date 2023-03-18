import { Metrics } from "./getMetrics.types";

export const getMetrics = async () => {
  const result = await fetch(
    "https://narwallets.com/metapool_metrics_json.php"
  );
  const metrics: Metrics = await result.json();

  return metrics;
};
