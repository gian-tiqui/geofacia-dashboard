import { collection, getDocs, getFirestore } from "firebase/firestore";
import AttendeesContainer from "./AttendeesContainer";
import { useEffect, useState } from "react";
import { app } from "../firestore/Firestore";

const Attendance = () => {
  const [eventIds, setEventIds] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    const getEventIds = async () => {
      const EVENTIDS_COLLECTION = "event_id";
      const db = getFirestore(app);
      const eventIdsRef = collection(db, EVENTIDS_COLLECTION);

      try {
        const snapshot = await getDocs(eventIdsRef);

        const data = snapshot.docs.map((doc) => doc.id);

        setEventIds(data);
      } catch (error) {
        console.error(error);
      }
    };

    getEventIds();
  }, []);

  return (
    <div className="container">
      <h3 style={{ color: "#cde3fd" }}>Events</h3>
      <div className="row mt-4">
        {eventIds?.map((id) => (
          <AttendeesContainer eventId={id} />
        ))}
      </div>
    </div>
  );
};

export default Attendance;
