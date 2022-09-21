import { createSlice } from "@reduxjs/toolkit";

/* En appSlice.js se definen las acciones que puede ejecutar el 
   slice app */

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    // Estado inicial
    status: "not-authenticated", // estado de la autenticacion
    user: {}, // datos del usuario logeado
    errorMessage: ""
  },
  reducers: {
    // Acciones que mutan el estado actual
    login: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
    },
    logout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload?.errorMessage;
    },
    updateRole: (state, { payload }) => {
      state.user.rol = payload;
    }
  }
});

// Se exportan las acciones
export const { login, logout, updateRole } = authSlice.actions;
