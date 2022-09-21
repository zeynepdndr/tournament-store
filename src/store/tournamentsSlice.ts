import { ITournamentItem } from './../components/Tournaments/TournamentList';
import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API_TOURNAMENTS_URL } from './../constants/api';

interface TournamentState {
  items: ITournamentItem[];
  loading?: boolean;
  error: any;
}
const initialState: TournamentState = {
  items: [],
  loading: false,
  error: false,
};

//These are action creators that support promises to dispatch the API call

export const fetchTournamentsFromAPI = createAsyncThunk(
  'tournaments/getTournaments',
  async () => {
    const response = await fetch(API_TOURNAMENTS_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json());
    return response;
  }
);

export const addTournamentWithAPI = createAsyncThunk(
  'tournaments/addTournament',
  async (enteredTournamentName: string) => {
    const response = await fetch(API_TOURNAMENTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: enteredTournamentName }),
    }).then((response) => response.json());
    return response;
  }
);

export const deleteTournamentWithAPI = createAsyncThunk(
  'tournaments/deleteTournament',
  async (enteredTournamentId: string) => {
    await fetch(`${API_TOURNAMENTS_URL}/${enteredTournamentId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json());
    return enteredTournamentId;
  }
);
export const editTournamentWithAPI = createAsyncThunk(
  'tournaments/editTournament',
  async (updatedTournament: any) => {
    const { id, name } = updatedTournament;
    const response = await fetch(`${API_TOURNAMENTS_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name }),
    }).then((response) => response.json());
    return response;
  }
);

export const tournamentsSlice = createSlice({
  name: 'tournaments',
  initialState,
  reducers: {},

  //This field lets the slice handle actions generating by createAsyncThunk
  extraReducers: (builder) => {
    builder.addCase(fetchTournamentsFromAPI.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(
      fetchTournamentsFromAPI.fulfilled,
      (state: any, action: AnyAction) => {
        state.loading = false;
        state.items = action.payload;
      }
    );
    builder.addCase(fetchTournamentsFromAPI.rejected, (state: any) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(
      addTournamentWithAPI.fulfilled,
      (state: any, action: AnyAction) => {
        state.items.push(action.payload);
      }
    );
    builder.addCase(
      deleteTournamentWithAPI.fulfilled,
      (state: any, action: AnyAction) => {
        const newItems = state.items.filter(
          (item: ITournamentItem) => item.id !== action.payload
        );
        state.items = newItems;
      }
    );
    builder.addCase(
      editTournamentWithAPI.fulfilled,
      (state: any, action: AnyAction) => {
        const updatedTournament = state.items.find(
          (item: ITournamentItem) => item.id === action.payload.id
        );

        if (updatedTournament) {
          state.items[action.payload.id] = action.payload;
        }
      }
    );
  },
});

export const tournamentActions = tournamentsSlice.actions;
