import { useEffect, useState } from "react";
import Bargraph, { Event } from "./Bargraph";
import { firstElementMargin } from "../App";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../firestore/Firestore";

const headerFontSize = "fs-4";

const Dashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);

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
        console.log(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <div className={`${firstElementMargin} ${headerFontSize}`}>
        <div className="d-flex justify-content-between align-items-center">
          <p className={headerFontSize}>Welcome to the Dashboard</p>
          <p className="fs-6">{new Date().toLocaleDateString()}</p>
        </div>
        <Bargraph events={events} />
      </div>
    </>
  );
};

export default Dashboard;
