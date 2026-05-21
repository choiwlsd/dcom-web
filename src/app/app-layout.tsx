// AppLayout.tsx

import { Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "../components/Navbar";
import MobileSidebarButton from "../components/MobileSidebarButton";

import useAuth from "../features/useAuth";

export default function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Outlet />;
  }

  return (
    <div className="flex">
      <Navbar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <div className="flex-1 md:ml-64">
        <MobileSidebarButton
          isOpen={isOpen}
          onClick={() =>
            setIsOpen((prev) => !prev)
          }
        />

        <Outlet />
      </div>
    </div>
  );
}