import React, { useEffect, useState } from "react";
import AddVolunteer from "../components/AddVolunteers";
import { useDispatch, useSelector } from "react-redux";
import { deleteVolunteer, fetchVolunteers, editVolunteer } from "../features/volunteers/volunteerSlice";

export const VolunteerPage = () => {
  const dispatch = useDispatch();
  const volunteers = useSelector((state) => state.volunteers.volunteers);
  const status = useSelector((state) => state.volunteers.status);
  const error = useSelector((state) => state.volunteers.error);

  useEffect(() => {
    if (status === 'idle' || status === 'error') {
      dispatch(fetchVolunteers());
    }
  }, [status, dispatch]);

  const [editMode, setEditMode] = useState(null);
  const [editedVolunteer, setEditedVolunteer] = useState({});

  const handleEditClick = (index, volunteer) => {
   
    setEditedVolunteer({...volunteer}); // Store the original volunteer data for editing
    console.log(editedVolunteer)
    setEditMode(index);
  };

  const handleSaveClick = () => {
    dispatch(editVolunteer(editedVolunteer)); // Dispatch editVolunteer action with updated volunteer data
    setEditMode(null); // Exit edit mode after saving
  };

  const onDelete = (id) => {
    dispatch(deleteVolunteer(id));
  };

  const handleChange = (e, key) => {
    setEditedVolunteer({
      ...editedVolunteer,
      [key]: e.target.value
    });
    console.log(e);
    console.log(key);
    console.log(editedVolunteer[key])
  };

  return (
    <div>
      <h1>Volunteer Page</h1>
      <AddVolunteer />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Skills</th>
            <th>Availability</th>
            <th>Event</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((volunteer, index) => (
            <tr key={volunteer._id}>
              <td>{editMode === index ? <input type="text" value={editedVolunteer.name} onChange={(e) => handleChange(e, 'name')} /> : volunteer.name}</td>
              <td>{editMode === index ? <input type="text" value={editedVolunteer.contactInfo.email} onChange={(e) => handleChange(e, 'contactInfo.email')} /> : volunteer.contactInfo.email}</td>
              <td>{editMode === index ? <input type="text" value={editedVolunteer.contactInfo.phone} onChange={(e) => handleChange(e, 'contactInfo.phone')} /> : volunteer.contactInfo.phone}</td>
              <td>{editMode === index ? <input type="text" value={editedVolunteer.skills.join(', ')} onChange={(e) => handleChange(e, 'skills')} /> : volunteer.skills.join(', ')}</td>
              <td>{editMode === index ? <input type="text" value={editedVolunteer.availability.join(', ')} onChange={(e) => handleChange(e, 'availability')} /> : volunteer.availability.join(', ')}</td>
              <td>{volunteer.events.eventName}</td>
              <td>
                {editMode === index ? (
                  <button onClick={handleSaveClick}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(index, volunteer)}>Edit</button>
                )}
              </td>
              <td>
                <button onClick={() => onDelete(volunteer._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'error' && <div>Error: {error}</div>}
    </div>
  );
};


