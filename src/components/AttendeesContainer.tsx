import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { app } from "../firestore/Firestore";
import * as XLSX from "xlsx";
import Modal from "react-modal";

interface Attendees {
  id: string;
  studentName: string;
  institutionalId: string;
  eventId: string;
}

type Popeyes = {
  eventId: string;
};

interface CustomLatLng {
  latitude: number;
  longitude: number;
}

interface Location {
  customLatLng: CustomLatLng;
  geofenceRadius: number;
  locationAddress: string;
}

interface Event {
  title: string;
  targetCourse: string;
  targetDepartment: string;
  date: string;
  location: Location;
}

const AttendeesContainer = ({ eventId }: Popeyes) => {
  const [attendees, setAttendees] = useState<Attendees[] | undefined>(
    undefined
  );
  const [event, setEvent] = useState<Event | undefined>(undefined);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  useEffect(() => {
    const fetchEvent = async () => {
      const db = getFirestore(app);
      const EVENTS_COLLECTION = "events";
      const eventDocRef = doc(db, EVENTS_COLLECTION, eventId);

      try {
        const eventSnapshot = await getDoc(eventDocRef);

        if (eventSnapshot.exists()) {
          const eventData = {
            id: eventSnapshot.id,
            ...eventSnapshot.data(),
          };
          setEvent(eventData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleExport = () => {
    if (confirm("Download attendees data?")) {
      if (attendees && attendees.length > 0) {
        const worksheet = XLSX.utils.json_to_sheet(attendees);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Attendees");
        XLSX.writeFile(workbook, "attendees.xlsx");
      } else {
        alert("No data to export.");
      }
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      {attendees?.length !== 0 ? (
        <div className="card m-2 shadow" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{event?.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {event?.targetCourse}
            </h6>
            <p className="card-text">{event?.location.locationAddress}</p>
            <button className="btn btn-primary me-2" onClick={handleExport}>
              Export
            </button>
            <button className="btn btn-success me-2" onClick={openModal}>
              View
            </button>
          </div>
        </div>
      ) : null}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Attendees Modal"
      >
        <h2>{event?.title} Attendees</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Institutional ID</th>
            </tr>
          </thead>
          <tbody>
            {attendees?.map((attendee) => (
              <tr key={attendee.id}>
                <td>{attendee.id}</td>
                <td>{attendee.studentName}</td>
                <td>{attendee.institutionalId}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-danger" onClick={closeModal}>
          Close
        </button>
      </Modal>
    </>
  );
};

export default AttendeesContainer;
