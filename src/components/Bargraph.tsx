import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export type Event = {
  date: string;
  eventId: string;
  hostId: string;
  status: string;
  targetCourse: string;
  targetDepartment: string;
  title: string;
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

type BarProps = {
  events: Event[];
};

type DataSets = {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
};

type GraphData = {
  labels: string[];
  datasets: DataSets[];
};

const initialData: GraphData = {
  labels: [],
  datasets: [
    {
      label: "Number of Events",
      data: [],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const Bargraph = ({ events }: BarProps) => {
  const [data, setData] = useState<GraphData>(initialData);

  useEffect(() => {
    const eventsByYear = events.reduce((acc, event) => {
      const year = event.date.split("/")[0];
      acc[year] = acc[year] || 0;
      acc[year]++;
      return acc;
    }, {});

    const sortedYears = Object.keys(eventsByYear).sort();

    const updatedData: GraphData = {
      labels: sortedYears,
      datasets: [
        {
          label: "Number of Events",
          data: sortedYears.map((year) => eventsByYear[year]),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };

    setData(updatedData);
  }, [events]);

  return <Bar data={data} options={options} />;
};

export default Bargraph;
