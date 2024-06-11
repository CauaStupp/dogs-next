"use client";

import { useEffect, useState } from "react";
import styles from "./account-stats.module.css";
import { VictoryBar, VictoryChart, VictoryPie } from "victory";
import statsGet, { StatsData } from "@/actions/stats-get";

interface GraphData {
  x: string;
  y: number;
}

export default function AccountStats({ data }: { data: StatsData[] }) {
  const [graph, setGraph] = useState<GraphData[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const graphData = data.map((item) => {
      return {
        x: item.title,
        y: Number(item.acessos),
      };
    });

    setGraph(graphData);
    setTotal(
      data.map(({ acessos }) => Number(acessos)).reduce((a, b) => a + b, 0)
    );
  }, [data]);

  return (
    <div className={`${styles.graph} fadeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: "#fff",
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: "#333",
            },
          }}
        />
      </div>
      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar alignment="start" data={graph}></VictoryBar>
        </VictoryChart>
      </div>
    </div>
  );
}
