// src/components/Layout.jsx
import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="pt-15 min-h-screen bg-#fff text-">
        <Outlet />
      </main>
      {/* Footer can be added here later */}
    </>
  )
}
