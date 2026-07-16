import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Blog from './pages/Blog'
import Careers from './pages/Careers'
import ContactPage from './pages/ContactPage'
import Documentation from './pages/Documentation'
import ForgotPassword from './pages/ForgotPassword'
import HelpCenter from './pages/HelpCenter'
import Roadmap from './pages/Roadmap'
import Security from './pages/Security'
import Status from './pages/Status'
import NotePrivacy from './pages/NotePrivacy'
import TermsOfService from './pages/TermsOfService'
import NoteCookies from './pages/NoteCookies'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog" element={<Blog />} />
<Route path="/careers" element={<Careers />} />
<Route path="/contact" element={<ContactPage />} />
<Route path="/docs" element={<Documentation />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/help" element={<HelpCenter />} />
<Route path="/roadmap" element={<Roadmap />} />
<Route path="/security" element={<Security />} />
<Route path="/status" element={<Status />} />
<Route path="/privacy" element={<NotePrivacy />} />
<Route path="/terms" element={<TermsOfService />} />
<Route path="/cookies" element={<NoteCookies />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App