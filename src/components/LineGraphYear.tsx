import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Event } from "./Bargraph";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

type LineProps = {
  events: Event[];
};

const LineGraphYear = ({ events }: LineProps) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of events per status",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        fill: true,
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    const eventsByYear = events.reduce((acc, event) => {
      const year = event.date.split("/")[0];
      acc[year] = acc[year] || 0;
      acc[year]++;
      return acc;
    }, {});

    const sortedYears = Object.keys(eventsByYear).sort();

    const updatedData = {
      labels: sortedYears,
      datasets: [
        {
          label: "Number of Events per year",
          data: sortedYears.map((year) => eventsByYear[year]),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          tension: 0.4,
        },
      ],
    };

    setData(updatedData);
  }, [events]);

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {},
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraphYear;
