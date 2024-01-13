import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async () => {
    try {
      const response = await fetch('https://3a6c0f80-717c-416f-9f7f-87969ce3e739-00-38g56lzus3htq.global.replit.dev/events');
      const data = await response.json();
      console.log(data);
      return data.data;  
    } catch (error) {
      console.error('Error fetching event data:', error);
      throw error;  
    }
  }
);

export const addEvent = createAsyncThunk(
  'events/addEvent',
  async (eventData, { dispatch }) => {
    try {
      console.log(eventData);

      const response = await fetch('https://3a6c0f80-717c-416f-9f7f-87969ce3e739-00-38g56lzus3htq.global.replit.dev/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      const addedEvent = await response.json();
      console.log(addedEvent.data);
      return addedEvent.data;  // Return the data instead of dispatching an action here
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;  // Throw the error to let createAsyncThunk handle the failure action
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (eventId, { dispatch }) => {
    try {
      console.log(eventId);

      const response = await fetch(`https://3a6c0f80-717c-416f-9f7f-87969ce3e739-00-38g56lzus3htq.global.replit.dev/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      const deletedEvent = await response.json();
      console.log(deletedEvent.data);
      return deletedEvent.data; 
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;  // Throw the error to let createAsyncThunk handle the failure action
    }
  }
);

export const editEvent = createAsyncThunk(
  'events/editEvent',
  async (updatedEvent, { dispatch }) => {
    try {
      const eventId = updatedEvent._id;

      const response = await fetch(`https://3a6c0f80-717c-416f-9f7f-87969ce3e739-00-38g56lzus3htq.global.replit.dev/events/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) {
        throw new Error('Failed to edit event');
      }

      const editedEvent = await response.json();
      console.log(editedEvent);
      return editedEvent.data;  // Return the data instead of dispatching an action here
    } catch (error) {
      console.error('Error editing event:', error);
      throw error;  // Throw the error to let createAsyncThunk handle the failure action
    }
  }
);







const initialState = {
  events: [],
  status: "idle",
  error: null,
  filter: "All",
  sortBy: "name"
};

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    }
  },
  extraReducers: {
    [fetchEvents.pending]: (state) => {
      state.status = "loading";
    },
    [fetchEvents.fulfilled]: (state, action) => {
      state.status = "success";
      state.events = action.payload;
    },
    [fetchEvents.rejected]: (state, action) => {
      state.status = "error";
      console.log(action.error.message);
      state.error = action.error.message;
    },
    [addEvent.pending]: (state) => {
      state.status = "loading";
    },
    [addEvent.fulfilled]: (state, action) => {
      state.status = "success";
      state.events.push(action.payload);
    },
    [addEvent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editEvent.pending]: (state) => {
      state.status = "loading";
    },
    [editEvent.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedEvent = action.payload;
      const index = state.events.findIndex((s) => s._id === updatedEvent._id);
      if (index !== -1) {
        state.events[index] = updatedEvent;
      }
    },
    [editEvent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteEvent.pending]: (state) => {
      state.status = "loading";
    },
    [deleteEvent.fulfilled]: (state, action) => {
      state.status = "success";
      state.events = state.events.filter(
        (event) => event._id !== action.payload._id
      );
    },
    [deleteEvent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});

export const { setFilter, setSortBy } = eventSlice.actions;

export default eventSlice.reducer;
