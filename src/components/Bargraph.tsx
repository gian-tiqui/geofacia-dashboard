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

const initialData: GraphData = {
  labels: ["Upcoming", "Started", "Ended"],
  datasets: [
    {
      label: "Number of Events per status",
      data: [0, 0, 0],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const Bargraph = ({ events }: BarProps) => {
  const [data, setData] = useState<GraphData>(initialData);

  useEffect(() => {
    const eventsByStatus = events.reduce(
      (acc, event) => {
        switch (event.status) {
          case "upcoming":
            acc[0]++;
            break;
          case "started":
            acc[1]++;
            break;
          case "ended":
            acc[2]++;
            break;
          default:
            break;
        }
        return acc;
      },
      [0, 0, 0]
    );

    const updatedData: GraphData = {
      labels: ["Upcoming", "Started", "Ended"],
      datasets: [
        {
          label: "Number of Events per status",
          data: eventsByStatus,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    setData(updatedData);
  }, [events]);

  return <Bar data={data} options={options} />;
};

export default Bargraph;
