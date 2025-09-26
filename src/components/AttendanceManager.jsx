import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function AttendanceManager() {
  const [studentName, setStudentName] = useState("");
  const [status, setStatus] = useState("present");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    const { data, error } = await supabase
      .from("attendance")
      .select("*")
      .order("date", { ascending: false });

    if (error) console.error(error);
    else setRecords(data);
  };

  const markAttendance = async () => {
    if (!studentName) return alert("Enter student name");

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const { error } = await supabase
      .from("attendance")
      .insert([{ student_name: studentName, date: today, status }]);

    if (error) console.error(error);
    else {
      setStudentName("");
      fetchAttendance();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Mark Attendance</h1>

      <input
        type="text"
        placeholder="Student Name"
        className="border p-2 mb-2 w-full"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 mb-2 w-full"
      >
        <option value="present">Present</option>
        <option value="absent">Absent</option>
      </select>

      <button
        onClick={markAttendance}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Mark Attendance
      </button>

      <ul className="mt-4">
        {records.map((rec) => (
          <li key={rec.id} className="border-b p-2">
            {rec.student_name} - {rec.date} - {rec.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
