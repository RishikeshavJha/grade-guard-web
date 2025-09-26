import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function AttendanceViewer() {
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

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Attendance Records</h1>
      <ul>
        {records.map((rec) => (
          <li key={rec.id} className="border-b p-2">
            {rec.student_name} - {rec.date} - {rec.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
