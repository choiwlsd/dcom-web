// AppLayout.tsx

import { Outlet } from "react-router-dom";

import Navbar from "../components/nav-bar/Navbar";

import useAuth from "../features/useAuth";

export default function AppLayout() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Outlet />;
  }

  return (
    <div className="flex min-h-screen">
      <Navbar />

      <main className="flex-1 pt-20">
        <Outlet />
      </main>
    </div>
  );
}
