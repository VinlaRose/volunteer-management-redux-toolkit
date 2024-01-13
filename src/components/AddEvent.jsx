import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent } from '../features/events/eventSlice';

const AddEvent = () => {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [requiredVolunteerRoles, setRequiredVolunteerRoles] = useState([]);
  const dispatch = useDispatch()
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const dateTimeString = `${date}T${time}:00.000Z`;

    const newEvent = {
      eventName,
      date: dateTimeString,
      location,
      description,
      requiredVolunteerRoles,
    };

    console.log(newEvent);
    
dispatch(addEvent(newEvent));
    

    setEventName('');
    setDate('');
    setTime('');
    setLocation('');
    setDescription('');
    setRequiredVolunteerRoles([]);
   
  };

  return (
    <div className="event-form">
  <h2>Add Event</h2>
  <form onSubmit={handleSubmit}>
    <div className="form-row">
      <label className="form-label" htmlFor="eventName">
        Event Name:
      </label>
      <input
        type="text"
        id="eventName"
        className="form-input"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
    </div>
    <div className="form-row">
      <label className="form-label" htmlFor="date">
        Date:
      </label>
      <input
        type="date"
        id="date"
        className="form-input"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
    <div className="form-row">
      <label className="form-label" htmlFor="time">
        Time:
      </label>
      <input
        type="time"
        id="time"
        className="form-input"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
    </div>
    <div className="form-row">
      <label className="form-label" htmlFor="location">
        Location:
      </label>
      <input
        type="text"
        id="location"
        className="form-input"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>
    <div className="form-row">
      <label className="form-label" htmlFor="description">
        Description:
      </label>
      <textarea
        id="description"
        className="form-input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
    <div className="form-row">
      <label className="form-label" htmlFor="requiredVolunteerRoles">
        Required Volunteer Roles:
      </label>
      <input
        type="text"
        id="requiredVolunteerRoles"
        className="form-input"
        value={requiredVolunteerRoles.join(', ')}
        onChange={(e) => setRequiredVolunteerRoles(e.target.value.split(','))}
      />
    </div>
    <button type="submit" className="submit-button">
      Add Event
    </button>
  </form>
</div>

  );
};

export default AddEvent;
