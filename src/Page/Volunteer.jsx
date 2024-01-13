import { useEffect, useState } from "react"
import AddVolunteer from "../components/AddVolunteers"
import { useDispatch, useSelector } from "react-redux"
import { deleteVolunteer, fetchVolunteers } from "../features/volunteers/volunteerSlice";

export const VolunteerPage = () => {
 const dispatch = useDispatch();
 
 const volunteers = useSelector((state) => state.volunteers.volunteers);
  console.log(volunteers)
const status = useSelector((state) => state.volunteers.status);
console.log(status)
const error = useSelector((state) => state.volunteers.error);
console.log(error)


  useEffect(() => {
    if (status === 'idle' || status === 'error') {
      dispatch(fetchVolunteers());
    }
  }, [status, dispatch]);
 const [editMode, setEditMode] = useState(null);

 const handleEditClick = (index) => {
   setEditMode(index);
 };

 const handleSaveClick = () => {
   setEditMode(null);
 };
const onDelete = (id) => {
  dispatch(deleteVolunteer(id))
  console.log(id)
}

  return (
    <div>
      <h1>Volunteer Page</h1>
      <AddVolunteer/>
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
            <td>{editMode === index ? <input type="text" defaultValue={volunteer.name} /> : volunteer.name}</td>
            <td>{editMode === index ? <input type="text" defaultValue={volunteer.contactInfo.email} /> : volunteer.contactInfo.email}</td>
            <td>{editMode === index ? <input type="text" defaultValue={volunteer.contactInfo.phone} /> : volunteer.contactInfo.phone}</td>
            <td>{editMode === index ? <input type="text" defaultValue={volunteer.skills.join(', ')} /> : volunteer.skills.join(', ')}</td>
            <td>{editMode === index ? <input type="text" defaultValue={volunteer.availability.join(', ')} /> : volunteer.availability.join(', ')}</td>
            <td>{volunteer.events.eventName}</td>
            
            
            <td>
              {editMode === index ? (
                <button onClick={handleSaveClick}>Save</button>
              ) : (
                <button onClick={() => handleEditClick(index)}>Edit</button>
              )}
            </td>
            <td>
              <button onClick={() => onDelete(volunteer._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}