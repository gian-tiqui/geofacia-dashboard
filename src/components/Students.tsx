import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { app } from "../firestore/Firestore";

interface Student {
  id: string;
  course: string;
  department: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceCount, setAttendanceCount] = useState<number>(0);

  const getStudents = async (userIds: string[]) => {
    const db = getFirestore(app);

    try {
      const studentsData = [];

      for (const userId of userIds) {
        const COLLECTION_NAME = `users/${userId}/user_details`;
        const usersRef = collection(db, COLLECTION_NAME);

        const snapshot = await getDocs(usersRef);

        if (!snapshot.empty) {
          const userData = snapshot.docs[0].data();
          if (userData.role === "student") {
            studentsData.push({
              id: userId,
              course: userData.course,
              department: userData.department,
              firstName: userData.firstName,
              lastName: userData.lastName,
              middleName: userData.middleName,
            });
          }
        }
      }

      setStudents(studentsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getIds = async () => {
      const db = getFirestore(app);
      const COLLECTION_NAME = "user_id";
      const userIdRefs = collection(db, COLLECTION_NAME);

      try {
        const snapshot = await getDocs(userIdRefs);
        const data = snapshot.docs.map((doc) => doc.id);

        getStudents(data);
      } catch (error) {
        console.error(error);
      }
    };

    getIds();
  }, []);

  return (
    <div className="container">
      <div className="p-3 border shadow mt-5" style={{ height: "80vh" }}>
        <h3>Students</h3>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th scope="col">STUDENT NO.</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Middlename</th>
              <th scope="col">Course</th>
              <th scope="col">Department</th>
              <th scope="col">Attendance Count</th>
            </tr>
          </thead>
          <tbody>
            {students ? (
              students.map((student, index) => (
                <tr key={student.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.middleName}</td>
                  <td>{student.course}</td>
                  <td>{student.department}</td>
                  <td>{attendanceCount}</td>
                </tr>
              ))
            ) : (
              <p>pls wait oke</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
