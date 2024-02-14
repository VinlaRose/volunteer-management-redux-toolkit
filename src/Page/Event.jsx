import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddEvent from "../components/AddEvent";
import { deleteEvent, editEvent, fetchEvents } from "../features/events/eventSlice";

export const EventsPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  

  

  const events = useSelector((state) => state.events.events);
  console.log(events)
const status = useSelector((state) => state.events.status);
console.log(status)
const error = useSelector((state) => state.events.error);
console.log(error)


  useEffect(() => {
    if (status === 'idle' || status === 'error') {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);







  
  const [editingEventId, setEditingEventId] = useState(null);
  const [editedItemData, setEditedItemData] = useState({});



  const handleEditEvent = (event) => {
    setEditingEventId(event._id);
    setEditedItemData({ ...event });
  };

  const handleSaveEvent = (updatedEvent) => {
    
    dispatch(editEvent(updatedEvent));
    setEditingEventId(null);
  };

  const handleCancelEdit = () => {
    setEditingEventId(null);
  };

  const handleDeleteEvent = (id) => {
    dispatch(deleteEvent(id)); 
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Events Page</h1>

      <div>
      <button onClick={openModal}>Add New Event</button>
      <AddEvent isOpen={isModalOpen} onClose={closeModal} />
    </div>
      

      
      {status === 'loading' && <p>Loading Patients List...</p>}
      {error && <p>Error: {error}</p>}
      <div className="event-cards">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            {editingEventId === event._id ? (
              <div>
                <input
                  type="text"
                  name="eventName"
                  value={editedItemData.eventName}
                  onChange={handleEditInputChange}
                />
                <input
                  type="text"
                  name="date"
                  value={editedItemData.date}
                  onChange={handleEditInputChange}
                />
                <input
                  type="text"
                  name="location"
                  value={editedItemData.location}
                  onChange={handleEditInputChange}
                />
                <input
                  type="text"
                  name="description"
                  value={editedItemData.description}
                  onChange={handleEditInputChange}
                />
                <input
                  type="text"
                  name="requiredVolunteerRoles"
                  value={editedItemData.requiredVolunteerRoles.join(",")}
                  onChange={handleEditInputChange}
                />
                <button onClick={() => handleSaveEvent(editedItemData)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <p><strong>Event Name:</strong> {event.eventName}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Description:</strong> {event.description}</p>
                <p><strong>Required Volunteer Roles:</strong> {event.requiredVolunteerRoles.join(", ")}</p>
              </div>
            )}
            <div className="button-container">
              <button onClick={() => handleEditEvent(event)}>Edit</button>
              <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
