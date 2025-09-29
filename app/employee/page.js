import EmployeeCard from "@/components/employee/EmployeeCard";
import { UsersRound } from "lucide-react";

export default function EmployeePage() {
  return (
    <section>
      <div>
        <div>
          <div className="flex items-center p-4 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
              <UsersRound size={18} />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Employee
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                10
              </p>
            </div>
          </div>
        </div>
        <EmployeeCard />
      </div>
    </section>
  );
}
