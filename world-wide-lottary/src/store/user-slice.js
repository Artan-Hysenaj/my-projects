import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  stats: [],
  generatedUser: {
    id: "",
    picture: "",
    fullName: "",
    email: "",
    gender: "",
    cell: "",
    phone: "",
    location: "",
    nat: "",
    isWinner: false,
    age: 0,
    timesPlayed: 0,
    time: "",
  },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setGeneratedUser(state, action) {
      const newUser = action.payload;
      state.generatedUser = newUser;
    },
    setUserToArray(state, action) {
      const newUser = action.payload;
      const existingUser = state.users.find((user) => user.id === newUser.id);
      if (!existingUser) {
        state.users.push({
          id: newUser.id,
          picture: newUser.picture,
          fullName: newUser.fullName,
          email: newUser.email,
          gender: newUser.gender,
          cell: newUser.cell,
          phone: newUser.phone,
          location: newUser.location,
          nat: newUser.nat,
          isWinner: newUser.isWinner,
          age: newUser.age,
          timesPlayed: 1,
          time: newUser.time,
        });
      } else {
        existingUser.timesPlayed++;
        existingUser.time = newUser.time;
      }
    },
    setStats(state, action) {
      const newUser = action.payload;
      if (state.stats.length === 0) {
        state.stats.push({
          nat: newUser.nat,
          players: 1,
        });
      } else {
        const existingNat = state.stats.find(
          (stat) => stat.nat === newUser.nat
        );
        if (!existingNat) {
          state.stats.push({
            nat: newUser.nat,
            players: 1,
          });
        } else {
          existingNat.players++;
        }
      }
    },
    sortDesc(state, action) {
      if (action.payload === "stats")
        state.stats = descendingStats(state.stats);
      if (action.payload === "user") state.users = descendingUsers(state.users);
    },
    sortAsc(state, action) {
      if (action.payload === "stats") state.stats = ascendingStats(state.stats);
      if (action.payload === "user") state.users = ascendingUsers(state.users);
    },
    editUser(state, action) {
      const newData = action.payload;
      const user = state.users.find((user) => user.id === newData.id);
      user.email = newData.email;
      state.generatedUser = user;
    },
    clearSession: () => initialState,
  },
});
//descending - sort by number of players
const descendingStats = (array) => {
  return array.sort(function (a, b) {
    return b.players - a.players;
  });
};
// ascending - sort by number of players
const ascendingStats = (array) => {
  return array.sort(function (a, b) {
    return a.players - b.players;
  });
};
//descending - sort time
const descendingUsers = (array) => {
  return array.sort(function (a, b) {
    return new Date(b.time).getTime() - new Date(a.time).getTime();
  });
};
// ascending - sort by time
const ascendingUsers = (array) => {
  return array.sort(function (a, b) {
    return new Date(a.time).getTime() - new Date(b.time).getTime();
  });
};

export const userActions = userSlice.actions;
export default userSlice;
