import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import BackgroundEffects from './components/ui/BackgroundEffects'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Marketplace from './pages/Marketplace'
import Repair from './pages/Repair'
import Sell from './pages/Sell'
import Signup from './pages/Signup'

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
        <BackgroundEffects />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
          <Navbar />
          <main className="flex-1 py-8 sm:py-12">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/marketplace"
                element={
                  <ProtectedRoute>
                    <Marketplace />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/sell"
                element={
                  <ProtectedRoute>
                    <Sell />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/repair"
                element={
                  <ProtectedRoute>
                    <Repair />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
