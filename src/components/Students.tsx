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
  institutionalID: string;
}

const Students = () => {
  const [originalStudents, setOriginalStudents] = useState<Student[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

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
              institutionalID: userData.institutionalID,
            });
          }
        }
      }

      setOriginalStudents(studentsData);
      setStudents(studentsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm.trim() !== "") {
      const filteredStudents = originalStudents.filter(
        (student) =>
          student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setStudents(filteredStudents);
    } else {
      setStudents(originalStudents);
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
      <div
        className="p-3 shadow mt-5"
        style={{ height: "80vh", backgroundColor: "#0d2136" }}
      >
        <div className="mb-3 d-flex align-self-center justify-content-between">
          <h3 style={{ color: "#cde3fd" }}>Students</h3>

          <div>
            <label htmlFor="searchInput" style={{ color: "#cde3fd" }}>
              Search
            </label>
            <input
              type="text"
              className="form-control"
              id="searchInput"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
              style={{ backgroundColor: "#031525", color: "#cde3fd" }}
            />
          </div>
        </div>
        <hr className="my-4" />
        <table className="table table-bordered table-striped table-dark mt-3">
          <thead>
            <tr>
              <th scope="col">STUDENT NO.</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Middlename</th>
              <th scope="col">Course</th>
              <th scope="col">Department</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr
                  key={student.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#031525" : "#0d2136",
                    color: "#cde3fd",
                  }}
                >
                  <td scope="row">{student.institutionalID}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.middleName}</td>
                  <td>{student.course}</td>
                  <td>{student.department}</td>
                </tr>
              ))
            ) : (
              <p>Loading please wait...</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
