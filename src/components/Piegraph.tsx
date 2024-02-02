import { Pie } from "react-chartjs-2";
import { useEffect, useRef } from "react";

const PieGraphStatusComponent = ({ events }) => {
  const statusCount = {
    upcoming: 0,
    started: 0,
    ended: 0,
  };

  events.forEach((event) => {
    statusCount[event.status]++;
  });

  const data = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        data: Object.values(statusCount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const newChart = new Pie(chartRef.current, {
      data,
    });

    return () => {
      newChart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default PieGraphStatusComponent;
