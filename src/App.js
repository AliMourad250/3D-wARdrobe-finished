import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import SignUp from './pages/Sign-Up';
import LogIn from './pages/Login';
import About from './pages/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate, useNavigate,
} from 'react-router-dom'
import Auth from './Auth';

function PrivateRoute({ children }) {
  if (Auth.isAuth === false) {
    return <Navigate to="/login" replace />
  }
  return children;
}

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
