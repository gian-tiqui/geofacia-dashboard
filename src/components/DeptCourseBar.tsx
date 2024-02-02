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

type BarGraphProps = {
  events: Event[];
  categoryKey: keyof Event;
};

export type DataSets = {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
};

export type GraphData = {
  labels: string[];
  datasets: DataSets[];
};

const BarGraph = ({ events, categoryKey }: BarGraphProps) => {
  const fixText = () => {
    return categoryKey === "targetCourse" ? "Course" : "Department";
  };

  const [data, setData] = useState<GraphData>({
    labels: [],
    datasets: [
      {
        label: `Number of Events by ${categoryKey}`,
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const eventsByCategory = events.reduce((acc, event) => {
      const category = event[categoryKey];
      acc[category] = acc[category] || 0;
      acc[category]++;
      return acc;
    }, {});

    const sortedCategories = Object.keys(eventsByCategory).sort();

    const updatedData: GraphData = {
      labels: sortedCategories,
      datasets: [
        {
          label: `Number of Events by ${fixText()}`,
          data: sortedCategories.map((category) => eventsByCategory[category]),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };

    setData(updatedData);
  }, [events, categoryKey]);

  return <Bar data={data} options={options} />;
};

export default BarGraph;
