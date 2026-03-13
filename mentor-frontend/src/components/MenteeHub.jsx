import React, { useState } from 'react';
import { FaUserTie, FaCalendarAlt, FaPaperPlane } from 'react-icons/fa';

// This constant was global in your HTML, so we define it here
const allInterests = ["Maths", "ECE", "AI", "Fullstack", "DevOps", "Cybersecurity"];

const MenteeHub = ({ allMentors, addSession, setView }) => {
    const [studentDetails, setStudentDetails] = useState({ name: '', srn: '', sem: '', interest: '' });
    const [detailsSubmitted, setDetailsSubmitted] = useState(false);
    const [matchedMentors, setMatchedMentors] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState("");
    const [date, setDate] = useState("");
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentDetails(prev => ({ ...prev, [name]: value }));
    };
    
    const handleFindMentor = () => {
        if (!studentDetails.srn || !studentDetails.interest) {
            alert("Please enter your SRN and select an interest.");
            return;
        }
        const matches = allMentors.filter(mentor => mentor.subjects.includes(studentDetails.interest));
        setMatchedMentors(matches);
        setDetailsSubmitted(true);
    };
    
    const scheduleSession = () => {
        if (!studentDetails.srn || !selectedMentor || !date) {
            alert("Please select a mentor and a date.");
            return;
        }
        const sessionDetails = { 
            mentee: `Student (SRN: ${studentDetails.srn})`, 
            mentor: selectedMentor, 
            date 
        };
        addSession(sessionDetails);
        alert(`Session with ${selectedMentor} scheduled!`);
        setView('sessions'); // Go to sessions page
    };
    
    const startOver = () => {
        setStudentDetails({ name: '', srn: '', sem: '', interest: '' });
        setDetailsSubmitted(false);
        setMatchedMentors([]);
        setSelectedMentor('');
        setDate('');
    };

    return (
        <div className="view-section">
            {!detailsSubmitted ? (
                <div className="section">
                    <h2>Mentee Details</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="srn">SRN</label>
                            <input type="text" name="srn" id="srn" placeholder="SRN" value={studentDetails.srn} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sem">Semester</label>
                            <select name="sem" id="sem" value={studentDetails.sem} onChange={handleInputChange}>
                                <option value="">-- Select Semester --</option>
                                {[...Array(8).keys()].map(i => 
                                    <option key={i+1} value={i+1}>{i+1}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group full-width">
                            <label htmlFor="interest">Interest</label>
                            <select name="interest" id="interest" value={studentDetails.interest} onChange={handleInputChange}>
                                <option value="">-- Select Interest --</option>
                                {allInterests.map(i => <option key={i} value={i}>{i}</option>)}
                            </select>
                        </div>
                        <div className="full-width">
                            <button onClick={handleFindMentor} className="btn">Find Mentor</button>
                        </div>
                        <div className="full-width text-center mt-1">
                            <button onClick={() => setView('role_selection')} className="btn-small btn-secondary">Back to Home</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="section">
                    <h2>Matched Mentors for {studentDetails.interest}</h2>
                    {matchedMentors.length > 0 ? (
                        <div className="cards">
                            {matchedMentors.map(u => (
                                <div className={`card ${selectedMentor === u.name ? 'card-selected' : ''}`} key={u._id || u.name}>
                                    <FaUserTie className="icon-large" />
                                    <h3>{u.name}</h3>
                                    <button className="btn-small" onClick={() => setSelectedMentor(u.name)}>
                                        {selectedMentor === u.name ? 'Selected' : 'Select'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center">No mentors found for this specialization. Try searching again later.</p>
                    )}

                    {selectedMentor && (
                        <div className="schedule">
                            <div className="form-group">
                                <label htmlFor="date"><FaCalendarAlt /> Schedule Date:</label>
                                <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} />
                            </div>
                            <button className="btn-small" onClick={scheduleSession}><FaPaperPlane /> Schedule</button>
                        </div>
                    )}
                    <div className="text-center mt-2">
                        <button onClick={startOver} className="btn-small btn-secondary">Search Again</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenteeHub;