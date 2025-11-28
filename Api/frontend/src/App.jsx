import React from 'react'
import Login from './component/login.jsx'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </div>
  )
}
