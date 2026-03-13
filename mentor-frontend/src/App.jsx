import React, { useState, useEffect } from 'react';

// Import all our new components
import RoleSelection from './components/RoleSelection';
import MentorSignupFlow from './components/MentorSignupFlow';
import MenteeHub from './components/MenteeHub';
import SessionList from './components/SessionList';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

// Import all the icons we need in this file
import { FaHome, FaCalendarAlt, FaSignOutAlt, FaBars } from 'react-icons/fa';

// Main App Component (Updated for Auth)
const App = () => {
    const [view, setView] = useState('role_selection'); 
    const [sessions, setSessions] = useState([]);
    const [allMentors, setAllMentors] = useState([]);
    
    const isMobile = () => window.innerWidth <= 768;
    const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile());
    
    const [authError, setAuthError] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));
    
    // Your backend API URL
    const API_URL = 'http://localhost:5000/api';

    // When token changes, save/remove it from localStorage
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    // Data Fetching Effect
    useEffect(() => {
        // Only fetch data if we are logged in
        if (token) {
            const fetchData = async () => {
                try {
                    const mentorsRes = await fetch(`${API_URL}/mentors`);
                    const mentorsData = await mentorsRes.json();
                    setAllMentors(mentorsData);

                    const sessionsRes = await fetch(`${API_URL}/sessions`);
                    const sessionsData = await sessionsRes.json();
                    setSessions(sessionsData);
                } catch (err) {
                    console.error("Error fetching data:", err);
                }
            };
            fetchData();
            // Set default view after login
            setView('role_selection');
        } else {
            // If no token, force login view
            setView('login');
        }
    }, [token]); // This effect re-runs when the token changes
    
    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (isMobile()) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    // --- API Call Functions (Auth) ---
    const handleLogin = async (formData) => {
        try {
            setAuthError(''); // Clear old errors
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                setToken(data.token); // This will trigger the useEffect
            } else {
                setAuthError(data.msg || 'Login failed');
            }
        } catch (err) {
            setAuthError('Server error. Please try again.');
        }
    };
    
    const handleRegister = async (formData) => {
         try {
            setAuthError('');
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                setToken(data.token); // Login
            } else {
                setAuthError(data.msg || 'Registration failed');
            }
        } catch (err) {
            setAuthError('Server error. Please try again.');
        }
    };
    
    const handleLogout = () => {
        setToken(null); // This triggers useEffect, clears localStorage
        setView('login');
    };

    // --- API Call Functions (App) ---
    const addSession = async (session) => {
        try {
            const res = await fetch(`${API_URL}/sessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` // Add this when routes are protected
                },
                body: JSON.stringify(session),
            });
            const newSession = await res.json();
            setSessions(prev => [...prev, newSession]);
        } catch (err) {
            console.error("Error adding session:", err);
        }
    };

    const addMentor = async (mentor) => {
         try {
            const res = await fetch(`${API_URL}/mentors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(mentor),
            });
            const newMentor = await res.json();
            setAllMentors(prev => [...prev, newMentor]);
        } catch (err) {
            console.error("Error adding mentor:", err);
        }
    };
    
    const updateSessionFeedback = async (sessionId, feedbackText) => {
        try {
            const res = await fetch(`${API_URL}/sessions/${sessionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ feedback: feedbackText }),
            });
            const updatedSession = await res.json();
            
            setSessions(prevSessions => 
                prevSessions.map(session => 
                    session._id === updatedSession._id ? updatedSession : session
                )
            );
        } catch (err) {
            console.error("Error updating feedback:", err);
        }
    };
    
    // --- Conditional Rendering ---
    // If there's no token, show Login or Register page
    if (!token) {
        return (
            <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
                 <div style={{ width: '100%' }}>
                    <h1 className="neon-title">Mentor-Mentee Hub</h1>
                    {view === 'login' && <LoginPage onLogin={handleLogin} setView={setView} error={authError} />}
                    {view === 'register' && <RegisterPage onRegister={handleRegister} setView={setView} error={authError} />}
                 </div>
            </div>
        );
    }

    // --- Main App Rendering (User is Logged In) ---
    const renderContent = () => {
        switch (view) {
            case 'mentee_hub':
                return <MenteeHub allMentors={allMentors} addSession={addSession} setView={setView} />;
            case 'mentor_flow':
                return <MentorSignupFlow allMentors={allMentors} addMentor={addMentor} setView={setView} />;
            case 'sessions':
                return <SessionList sessions={sessions} updateFeedback={updateSessionFeedback} />;
            case 'role_selection':
            default:
                return <RoleSelection setView={setView} />;
        }
    };

    // --- Sidebar Component ---
    const AppSidebar = () => {
         return (
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-item" title="Home" onClick={() => setView('role_selection')}>
                    <span className="icon"><FaHome /></span>
                    <span className="text">Home</span>
                </div>
                <div className="sidebar-item" title="Sessions" onClick={() => setView('sessions')}>
                    <span className="icon"><FaCalendarAlt /></span>
                    <span className="text">Sessions</span>
                </div>
                
                <div className="sidebar-item" title="Logout" onClick={handleLogout}>
                    <span className="icon"><FaSignOutAlt /></span>
                    <span className="text">Logout</span>
                </div>
                
                <div className="sidebar-item toggle-btn" title="Toggle Menu" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <span className="icon"><FaBars /></span>
                    <span className="text">Collapse Menu</span>
                </div>
            </div>
        );
    };

    return (
        <div className="app-container">
            <AppSidebar />
            <div className={`main-content ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
                <h1 className="neon-title">Mentor-Mentee Hub</h1>
                {renderContent()}
            </div>
        </div>
    );
};

export default App;