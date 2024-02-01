import { useState } from "react";
import Bargraph from "./Bargraph";
import { firstElementMargin } from "../App";

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
      <h1 className={firstElementMargin}>Dashboard</h1>
      <div className="row">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="col p-1">
              <div className="card">
                <Bargraph data={data} />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Dashboard;
