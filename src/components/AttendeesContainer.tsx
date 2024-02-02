import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firestore/Firestore";

interface Attendees {
  id: string;
  studentName: string;
  institutionalId: string;
  eventId: string;
}

type Popeyes = {
  eventId: string;
};

const AttendeesContainer = ({ eventId }: Popeyes) => {
  const [attendees, setAttendees] = useState<Attendees[] | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);

      const SUBCOLLECTION_NAME = eventId;
      const SUBSUBCOLLECTION_NAME = "_attendance";
      const COLLECTION_NAME = `attendance/${SUBCOLLECTION_NAME}/${SUBSUBCOLLECTION_NAME}`;

      const collectionRef = collection(db, COLLECTION_NAME);

      try {
        const snapshot = await getDocs(collectionRef);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAttendees(data);
      } catch (error) {
        console.error("Error fetching data from firestore", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {attendees?.length !== 0 ? (
        <div className="col border shadow m-2">{JSON.stringify(attendees)}</div>
      ) : null}
    </>
  );
};

export default AttendeesContainer;
