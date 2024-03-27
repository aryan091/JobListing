
import {Routes , Route , BrowserRouter} from 'react-router-dom'
import LoginPage from "./pages/LoginPage/LoginPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import JobPostPage from "./pages/JobPostPage/JobPostPage"
import JobDetailsPage from "./pages/JobDetailsPage/JobDetailsPage"
import HomePage from './pages/HomePage/HomePage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
function App() {
  return (
    <BrowserRouter>

      <Routes>

      <Route path="/" element={<HomePage />} />
        <Route path="/login" element = {<LoginPage />} />
        <Route path="/register" element = {<RegisterPage />} />
        <Route
                    path="/job-post"
                    element={<ProtectedRoute Component={JobPostPage} />}
                />
        <Route path="/job-details/:id" element = {<JobDetailsPage />} />


      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
