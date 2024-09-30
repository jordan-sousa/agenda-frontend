import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactsPage from './pages/ContactsPage';
import ProtectedRoute from './utios/ProtectedRoute';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contacts" element={
                  <ProtectedRoute>
                    <ContactsPage/>
                  </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
