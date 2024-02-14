import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVolunteer } from '../features/volunteers/volunteerSlice';
import { fetchEvents } from '../features/events/eventSlice';

const AddVolunteer = ({isOpen, onClose}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [skills, setSkills] = useState([]);
  const [availability, setAvailability] = useState('');
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [selectedDays, setSelectedDays] = useState([]);

  const dispatch = useDispatch();
  const allEvents = useSelector(state => state.events.events)

  useEffect(() => {
    dispatch(fetchEvents())
    },[dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
     
      console.error('Please fill in all required fields.');
      return;
    }

    const newVolunteer = {
      name,
      contactInfo: {
        phone,
        email,
      },
      events : selectedEvent,
      skills,
      availability,
    };

    console.log(newVolunteer);

     dispatch(addVolunteer(newVolunteer));

 
    setName('');
    setAvailability('');
    setEmail('');
    setPhone('');
    setSkills([]);
    setSelectedEvent([]);

    onClose();
  };

  const handleAddSkill = () => {
    if (skills && skills.length > 0) {
      setSkills([...skills, '']);
    } else {
      setSkills(['']);
    }
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };
 
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedEvent(value);
    
  };

 

  const handleDayChange = (e) => {
    const options = e.target.options;
    console.log(options)
   
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedDays.push(options[i].value);
      }
    }
    console.log(selectedDays)
    setSelectedDays(selectedDays);
    setAvailability(selectedDays)
  };
  if (!isOpen) return null;


  return (
     <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="event-form">
          <h2>Add Volunteer</h2>
    <div class="volunteer-form">
  <h2>Add New Volunteer</h2>
  <form class="volunteer-form" onSubmit={handleSubmit}>
    <div class="form-group">
      <label for="volunteerName">Volunteer Name:</label>
      <input
        type="text"
        id="volunteerName"
        class="form-control"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input
        type="text"
        id="email"
        class="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div class="form-group">
      <label for="events">Events:</label>
      <select
        id="events"
        class="form-control"
        value={selectedEvent}
        onChange={handleSelectChange}
      >
        <option value="">Select an option</option>
        {allEvents.map((event) => (
          <option key={event._id} value={event._id}>
            {event.eventName}
          </option>
        ))}
      </select>
    </div>
    <div class="form-group">
      <label for="phone">Phone:</label>
      <input
        type="text"
        id="phone"
        class="form-control"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
    </div>
    <div class="form-group">
      <label for="daySelector">Select Days:</label>
      <select
        id="daySelector"
        class="form-control"
        multiple
        value={selectedDays}
        onChange={handleDayChange}
      >
        <option value="">Select an option</option>
        {daysOfWeek.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <div class="selected-days">
        <label>Selected Days:</label>
        <div>{selectedDays.join(', ')}</div>
      </div>
    </div>
    <div class="form-group">
      <label for="skills">Skills:</label>
      {skills.map((skill, index) => (
        <div class="skill" key={index}>
          <input
            type="text"
            id={`skill${index}`}
            class="form-control"
            value={skill}
            onChange={(e) => handleSkillChange(index, e.target.value)}
          />
        </div>
      ))}
      <button class="add-skill" type="button" onClick={handleAddSkill}>
        Add Skill
      </button>
    </div>
    <button class="submit-button" type="submit">Add Volunteer</button>
    <button onClick={onClose}>Cancel</button>
  </form>
</div>
</div>
      </div>
    </div>

  );
};

export default AddVolunteer;
