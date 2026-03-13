import React from 'react';
// Import the icons we need
import { FaUserTie, FaUserGraduate } from 'react-icons/fa';

const RoleSelection = ({ setView }) => {
    return (
        <div className="section view-section">
            <h2>Choose Your Role</h2>
            <div className="role-selection">
                <button onClick={() => setView('mentor_flow')} className="btn btn-large">
                    <FaUserTie style={{ marginRight: '0.5rem' }} /> Mentor
                </button>
                <button onClick={() => setView('mentee_hub')} className="btn btn-large">
                    <FaUserGraduate style={{ marginRight: '0.5rem' }} /> Mentee
                </button>
            </div>
        </div>
    );
};

export default RoleSelection; // <-- Don't forget this!