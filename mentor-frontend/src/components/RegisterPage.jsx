import React from 'react';
import AuthForm from './AuthForm.jsx'; // <-- Imports the form

const RegisterPage = ({ onRegister, setView, error }) => {
    const fields = [
        { name: 'email', label: 'Email', type: 'email', placeholder: 'user@email.com' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Choose a strong password' }
    ];

    return (
        <div>
            <AuthForm
                title="Register"
                fields={fields}
                buttonText="Register"
                onSubmit={onRegister}
                error={error}
            />
            <div className="text-center">
                <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setView('login'); }} style={{ color: '#0ff' }}>Login here</a></p>
            </div>
        </div>
    );
};

export default RegisterPage; // <-- THIS IS THE MISSING LINE