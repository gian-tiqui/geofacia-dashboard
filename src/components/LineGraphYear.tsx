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
        label: "Number of Events per year",
        data: [],
        backgroundColor: "rgba(120, 156, 191, 0.2)", // Complementary background color
        borderColor: "rgba(120, 156, 191, 1)", // Complementary border color
        borderWidth: 1,
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
          backgroundColor: "rgba(120, 156, 191, 1)",
          borderColor: "rgba(120, 156, 191, 1)",
          borderWidth: 4,
        },
      ],
    };

    setData(updatedData);
  }, [events]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        color: "#7799b3",
        ticks: {
          color: "#7799b3",
        },
        grid: {
          color: "#7799b3",
        },
      },
      x: {
        color: "#7799b3",
        ticks: {
          color: "#7799b3",
        },
        grid: {
          color: "#7799b3",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#7799b3",
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraphYear;
