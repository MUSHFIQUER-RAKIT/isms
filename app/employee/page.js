"use client";
import ProfileCard from "@/components/employee/ProfileCard";
import { User } from "lucide-react"; // Example icons
import { useEffect, useState } from "react";

// --- SUB-COMPONENT: Count Card (Top Left) ---
const CountCard = ({ count }) => (
  <div className="p-4 bg-white rounded-lg shadow-sm border mb-6 max-w-xs">
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-orange-100 rounded-full text-orange-500">
        <User size={24} />
      </div>
      <div>
        <p className="text-gray-500 text-sm">Total Employee</p>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
export default function EmployeeList() {
  const [data, setData] = useState({ totalEmployeeCount: 0, employee: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/employee");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8">Loading employee data...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <CountCard count={data.totalEmployeeCount} />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.employee.map((employee) => (
          <ProfileCard
            key={employee.id}
            name={employee.name}
            designation={employee.designation}
            imageUrl={employee.image}
            employeeId={employee.id}
          />
        ))}

        {data.employee.length === 0 && (
          <p className="text-gray-500 col-span-full">No employee found.</p>
        )}
      </div>
    </div>
  );
}
