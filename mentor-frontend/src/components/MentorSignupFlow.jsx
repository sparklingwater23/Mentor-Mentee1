
import React, { useState } from 'react';

// This constant was global in your HTML, so we define it here too
const allInterests = ["Maths", "ECE", "AI", "Fullstack", "DevOps", "Cybersecurity"];

const MentorSignupFlow = ({ addMentor, setView }) => {
    const [step, setStep] = useState('role_selection'); // role_selection, signup_form
    const [mentorRole, setMentorRole] = useState('');
    const [mentorDetails, setMentorDetails] = useState({ name: '', specializations: [] });

    const handleRoleSelect = (role) => {
        setMentorRole(role);
        setStep('signup_form');
    };

    const handleSpecializationChange = (spec) => {
        setMentorDetails(prev => {
            const newSpecs = prev.specializations.includes(spec)
                ? prev.specializations.filter(s => s !== spec)
                : [...prev.specializations, spec];
            return { ...prev, specializations: newSpecs };
        });
    };
    
    const handleMentorSubmit = () => {
        if (!mentorDetails.name || mentorDetails.specializations.length === 0) {
            alert("Please enter your name and select at least one specialization.");
            return;
        }
        const newMentor = {
            name: `${mentorDetails.name} (${mentorRole})`,
            subjects: mentorDetails.specializations
        };
        addMentor(newMentor); // Add to main app state
        alert(`Thank you, ${mentorDetails.name}! Your details have been recorded.`);
        setView('role_selection');
    };
    
    if (step === 'role_selection') {
        return (
             <div className="section view-section">
                <h2>You are a...</h2>
                <div className="role-selection">
                    <button onClick={() => handleRoleSelect('Student')} className="btn btn-medium">Student</button>
                    <button onClick={() => handleRoleSelect('Teacher')} className="btn btn-medium">Teacher</button>
                    <button onClick={() => handleRoleSelect('Alumni')} className="btn btn-medium">Alumni</button>
                </div>
                <div className="text-center mt-2">
                    <button onClick={() => setView('role_selection')} className="btn-small btn-secondary">Back</button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="section view-section">
            <h2>Mentor Details ({mentorRole})</h2>
            <div className="form-grid">
                <div className="form-group full-width">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Enter your name" 
                        value={mentorDetails.name} 
                        onChange={e => setMentorDetails({...mentorDetails, name: e.target.value})} 
                    />
                </div>
                <div className="full-width">
                    <label>Select Your Specializations:</label>
                    <div className="specialization-options">
                        {allInterests.map(spec => (
                            <div key={spec}>
                                <input 
                                    type="checkbox" 
                                    id={spec} 
                                    checked={mentorDetails.specializations.includes(spec)}
                                    onChange={() => handleSpecializationChange(spec)}
                                />
                                <label htmlFor={spec}>{spec}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="full-width">
                  <button onClick={handleMentorSubmit} className="btn">Submit Details</button>
                </div>
                <div className="full-width text-center mt-1">
                    <button onClick={() => setStep('role_selection')} className="btn-small btn-secondary">Back</button>
                </div>
            </div>
        </div>
    );
};

export default MentorSignupFlow;