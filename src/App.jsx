import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import GalleryDetailPage from './pages/GalleryDetailPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUpload from './pages/admin/AdminUpload'
import AdminManage from './pages/admin/AdminManage'

function App() {
  return (
    <Routes>
      {/* Public-facing layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="gallery/:category" element={<GalleryDetailPage />} />
      </Route>

      {/* Admin Login (public) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="upload" element={<AdminUpload />} />
        <Route path="manage" element={<AdminManage />} />
      </Route>
    </Routes>
  )
}

export default App
