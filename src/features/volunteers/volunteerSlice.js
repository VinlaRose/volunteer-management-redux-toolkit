import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVolunteers = createAsyncThunk(
  'volunteers/fetchVolunteers',
  async () => {
    try {
      const response = await fetch('https://backend-testing-khaki.vercel.app/volunteers');
      if (!response.ok) {
        throw new Error('Failed to fetch volunteer data');
      }
      const data = await response.json();
      console.log(data);
      return data.data;
    } catch (error) {
      console.error('Error fetching volunteer data:', error);
      throw error;
    }
  }
);

export const addVolunteer = createAsyncThunk(
  'volunteers/addVolunteer',
  async (volunteerData) => {
    try {
      const response = await fetch('https://backend-testing-khaki.vercel.app/volunteers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(volunteerData),
      });

      if (!response.ok) {
        throw new Error('Failed to add volunteer');
      }

      const addedVolunteer = await response.json();
      console.log(addedVolunteer.data);
      return addedVolunteer.data;
    } catch (error) {
      console.error('Error adding volunteer:', error);
      throw error;
    }
  }
);

export const deleteVolunteer = createAsyncThunk(
  'volunteers/deleteVolunteer',
  async (volunteerId) => {
    console.log(volunteerId)
    try {
      const response = await fetch(`https://backend-testing-khaki.vercel.app/volunteers/${volunteerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete volunteer');
      }

      const deletedVolunteer = await response.json();
      
      console.log(deletedVolunteer);
      return volunteerId;
    } catch (error) {
      console.error('Error deleting volunteer:', error);
      throw error;
    }
  }
);

export const editVolunteer = createAsyncThunk(
  'volunteers/editVolunteer',
  async (updatedVolunteer) => {
    try {
      console.log(updatedVolunteer)
      const volunteerId = updatedVolunteer._id;
      const response = await fetch(`https://backend-testing-khaki.vercel.app/volunteers/${volunteerId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVolunteer),
      });

      if (!response.ok) {
        throw new Error('Failed to edit volunteer');
      }

      const editedVolunteer = await response.json();
      console.log(editedVolunteer);
      return editedVolunteer.data;
    } catch (error) {
      console.error('Error editing volunteer:', error);
      throw error;
    }
  }
);

const initialState = {
  volunteers: [],
  status: "idle",
  error: null,
  filter: "All",
  sortBy: "name"
};

export const volunteerSlice = createSlice({
  name: "volunteers", // Corrected name to "volunteers"
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
    [fetchVolunteers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchVolunteers.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers = action.payload;
    },
    [fetchVolunteers.rejected]: (state, action) => {
      state.status = "error";
      console.error(action.error.message);
      state.error = action.error.message;
    },
    [addVolunteer.pending]: (state) => {
      state.status = "loading";
    },
    [addVolunteer.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers.push(action.payload);
    },
    [addVolunteer.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editVolunteer.pending]: (state) => {
      state.status = "loading";
    },
    [editVolunteer.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedVolunteer = action.payload;
      const index = state.volunteers.findIndex((volunteer) => volunteer._id === updatedVolunteer._id);
      if (index !== -1) {
        state.volunteers[index] = updatedVolunteer;
      }
    },
    [editVolunteer.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteVolunteer.pending]: (state) => {
      state.status = "loading";
    },
    [deleteVolunteer.fulfilled]: (state, action) => {
      state.status = "success";
      console.log(action.payload)
      state.volunteers = state.volunteers.filter((volunteer) => volunteer._id !== action.payload);
    },
    [deleteVolunteer.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});

export const { setFilter, setSortBy } = volunteerSlice.actions;

export default volunteerSlice.reducer;
