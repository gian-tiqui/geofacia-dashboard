import { useState } from "react";
import Bargraph from "./Bargraph";
import { firstElementMargin } from "../App";

const headerFontSize = "fs-4";

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
      <div className={`${firstElementMargin} ${headerFontSize}`}>
        <div className="d-flex justify-content-between align-items-center">
          <p className={headerFontSize}>Welcome to Dashboard</p>
          <p className="fs-6">{new Date().toLocaleDateString()}</p>
        </div>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="col p-2 m-1 border shadow bg-white">
              <Bargraph data={data} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Dashboard;
