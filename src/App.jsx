import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import GalleryDetailPage from './pages/GalleryDetailPage'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

// ✅ Lazy load admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminUpload = lazy(() => import('./pages/admin/AdminUpload'))
const AdminManage = lazy(() => import('./pages/admin/AdminManage'))

function App() {
  return (
    <>
      <Routes>
        {/* Public-facing layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="gallery/:category" element={<GalleryDetailPage />} />
        </Route>

        {/* Admin Login (lazy) */}
        <Route
          path="/admin/login"
          element={
            <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
              <AdminLogin />
            </Suspense>
          }
        />

        {/* Protected admin routes (lazy) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
                <AdminDashboard />
              </Suspense>
            }
          />
          <Route
            path="upload"
            element={
              <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
                <AdminUpload />
              </Suspense>
            }
          />
          <Route
            path="manage"
            element={
              <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
                <AdminManage />
              </Suspense>
            }
          />
        </Route>
      </Routes>

      {/* Vercel Analytics */}
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export default App
