import { useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const Dashboard = () => {
  const [data, setData] = useState({
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "My Dataset",
        data: [65, 59, 80, 81, 56],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });

  return (
    <>
      <h1>Dashboard</h1>
      <div>
        <Bar data={data} options={options} />
      </div>
    </>
  );
};

export default Dashboard;
