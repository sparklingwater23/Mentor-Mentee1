import React, { useState } from 'react';

const AuthForm = ({ title, fields, buttonText, onSubmit, error }) => {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="section view-section" style={{ maxWidth: '500px', margin: '2rem auto' }}>
            <h2>{title}</h2>
            <form onSubmit={handleSubmit} className="form-grid">
                {fields.map(field => (
                    <div className="form-group full-width" key={field.name}>
                        <label htmlFor={field.name}>{field.label}</label>
                        <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                {error && <p className="full-width" style={{ color: '#ff3cff', textAlign: 'center' }}>{error}</p>}
                <div className="full-width">
                    <button type="submit" className="btn">{buttonText}</button>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;