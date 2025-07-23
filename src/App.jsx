import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
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

      {/* Admin pages */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/upload" element={<AdminUpload />} />
      <Route path="/admin/manage" element={<AdminManage />} />
    </Routes>
  )
}

export default App
