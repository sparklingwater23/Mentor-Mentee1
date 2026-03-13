import React from 'react';
import AuthForm from './AuthForm.jsx'; // <-- Imports the form

const LoginPage = ({ onLogin, setView, error }) => {
    const fields = [
        { name: 'email', label: 'Email', type: 'email', placeholder: 'user@email.com' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Your password' }
    ];

    return (
        <div>
            <AuthForm
                title="Login"
                fields={fields}
                buttonText="Login"
                onSubmit={onLogin}
                error={error}
            />
            <div className="text-center">
                <p>No account? <a href="#" onClick={(e) => { e.preventDefault(); setView('register'); }} style={{ color: '#0ff' }}>Register here</a></p>
            </div>
        </div>
    );
};

export default LoginPage;