import React from "react";
import { FcStatistics } from "react-icons/fc";
import { FcSerialTasks } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const isActive = (typePath: string) => {
    const _pathname = pathname.slice(1)
    return _pathname === typePath ? 'text-blue-400' : 'text-gray-400' 
  }
  return (
    <div className="w-64 border-r-2 border-black/10 min-h-screen pt-16">
      <img
        src="/src/assets/react.svg"
        alt="logo"
        width={100}
        height={100}
        className="mx-auto"
      />
      <div className="pl-5 pt-8">
        <ul>
          <li
            className={`list-none flex items-center gap-x-4 text-2xl font-semibold cursor-pointer mb-5 hover:text-blue-400 ${isActive('statistik')}`}
            onClick={() => navigate("/statistik")}
          >
            <FcStatistics /> Statistik
          </li>
          <li
            className={`list-none flex items-center gap-x-4 text-2xl font-semibold cursor-pointer mb-5 hover:text-blue-400 ${isActive('task')}`}
            onClick={() => navigate("/task")}
          >
            <FcSerialTasks />
            Task
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
