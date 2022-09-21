import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./app/appSlice";
import { authSlice } from "./auth/authSlice";

/* este archivo define los estados (slices) que se van a manejar
   en toda la aplicacion

   estos estados sirven para que los componentes obtengan rapidamente
   los datos que necesitan en cierto punto y poder hacer validaciones
   con estos. 
   E.j 
    El estado "auth" ofrece los datos del usuario que esta logeado, 
    El estado "app" ofrece los datos de los productos que hay en la db
    , etc
 */

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    auth: authSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
