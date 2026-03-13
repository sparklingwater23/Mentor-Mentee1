import React, { useState } from 'react';
import { FaUserGraduate, FaCalendarAlt } from 'react-icons/fa';

const SessionList = ({ sessions, updateFeedback }) => {
    const [feedbacks, setFeedbacks] = useState({});

    const submitFeedback = (index) => {
        const session = sessions[index];
        const feedbackText = feedbacks[index];
        
        if (!feedbackText || !session._id) return; // Need ID and text
        
        updateFeedback(session._id, feedbackText); // Call the API function
        
        setFeedbacks(prev => ({ ...prev, [index]: '' })); // Clear input
    };
    
    return (
        <div className="section view-section">
            <h2>Your Sessions</h2>
            {sessions.length === 0 ? (
                <p className="text-center">You have no scheduled sessions.</p>
            ) : (
                <div className="cards">
                    {sessions.map((s, index) => (
                        <div className="card" key={s._id || index}> {/* Use s._id as key */}
                            <FaUserGraduate className="icon-large" />
                            <h3>{s.mentee} ↔ {s.mentor}</h3>
                            <p><FaCalendarAlt style={{marginRight: '0.5rem'}} /> {new Date(s.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            {s.feedback ? (
                                <p className="feedback">Feedback: {s.feedback}</p>
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Enter feedback"
                                        value={feedbacks[index] || ""}
                                        onChange={e => setFeedbacks({ ...feedbacks, [index]: e.target.value })}
                                        style={{width: '100%', marginTop: '1rem', boxSizing: 'border-box'}}
                                    />
                                    <button className="btn-small" onClick={() => submitFeedback(index)}>
                                        Submit Feedback
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SessionList;