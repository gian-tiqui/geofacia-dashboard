import { useEffect, useState } from "react";
import Bargraph, { Event } from "./Bargraph";
import { firstElementMargin } from "../App";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../firestore/Firestore";
import LineGraph from "./LineGraphYear";
import BarGraph from "./DeptCourseBar";

const headerFontSize = "fs-4";

const Dashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [studentsCount, setStudentsCount] = useState<number>(0);

  useEffect(() => {
    const fetchEvents = async () => {
      const db = getFirestore(app);
      const COLLECTION_NAME = "events";
      const eventsRef = collection(db, COLLECTION_NAME);

      try {
        const snapshot = await getDocs(eventsRef);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const COLLECTION_NAME = "user_id";
      const db = getFirestore(app);
      const usersCollection = collection(db, COLLECTION_NAME);

      try {
        const snapshot = await getDocs(usersCollection);
        const userIds = snapshot.docs.map((doc) => doc.id);

        setTotalUsers(userIds.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const getStudentsCount = async () => {
      const COLLECTION_NAME = "students";
      const db = getFirestore(app);
      const studentsCollection = collection(db, COLLECTION_NAME);

      try {
        const snapshot = await getDocs(studentsCollection);
        const studentIds = snapshot.docs.length;

        setStudentsCount(studentIds);
      } catch (error) {
        console.error(error);
      }
    };

    getStudentsCount();
  }, []);

  return (
    <>
      <div className={`${firstElementMargin} ${headerFontSize}`}>
        <div className="d-flex justify-content-between align-items-center">
          <p className={headerFontSize} style={{ color: "#cde3fd" }}>
            Welcome to the Dashboard
          </p>
          <p className="fs-6" style={{ color: "#cde3fd" }}>
            {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="row">
          <div
            style={{ backgroundColor: "#0d2136" }}
            className="col m-2 p-5 shadow-sm d-flex flex-column align-items-center justify-content-center"
          >
            <p style={{ color: "#cde3fd" }}>{events.length}</p>
            <p className="fs-6" style={{ color: "#cde3fd" }}>
              Events
            </p>
          </div>
          <div
            style={{ backgroundColor: "#0d2136" }}
            className="col m-2 p-5 shadow-sm d-flex flex-column align-items-center justify-content-center"
          >
            <p style={{ color: "#cde3fd" }}>{totalUsers}</p>
            <p className="fs-6" style={{ color: "#cde3fd" }}>
              Users
            </p>
          </div>
          <div
            style={{ backgroundColor: "#0d2136" }}
            className="col m-2 p-5 shadow-sm d-flex flex-column align-items-center justify-content-center"
          >
            <p style={{ color: "#cde3fd" }}>{studentsCount}</p>
            <p className="fs-6" style={{ color: "#cde3fd" }}>
              Students
            </p>
          </div>
        </div>
        <div className="row">
          <div
            style={{ backgroundColor: "#0d2136" }}
            className="col-12 m-2 shadow-sm d-flex justify-content-center align-items-center"
          >
            <div className="w-75">
              <LineGraph events={events} />
            </div>
          </div>
          <div
            style={{ backgroundColor: "#0d2136" }}
            className="col my-2 mx-2 shadow-sm d-flex justify-content-center align-items-center p-3"
          >
            <Bargraph events={events} />
          </div>
          <div
            style={{ backgroundColor: "#0d2136" }}
            className="col my-2 mx-2 shadow-sm d-flex justify-content-center align-items-center p-3"
          >
            <BarGraph events={events} categoryKey="targetCourse" />
          </div>
          <div
            style={{ backgroundColor: "#0d2136" }}
            className="col my-2 mx-2 shadow-sm d-flex justify-content-center align-items-center p-3"
          >
            <BarGraph events={events} categoryKey="targetDepartment" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
