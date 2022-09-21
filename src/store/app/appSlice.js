import { createSlice } from "@reduxjs/toolkit";

/* En appSlice.js se definen las acciones que puede ejecutar el 
   slice app */

export const appSlice = createSlice({
  name: "app",
  initialState: {
    // Estado inicial
    productos: [], // listado de todos productos
    ventas: [], // listado de ventas
    productoActivo: null // producto seleccionado
  },
  reducers: {
    // Acciones que mutan el estado actual
    onProductoActivo: (state, { payload }) => {
      state.productoActivo = payload;
    },
    agregarProducto: (state, { payload }) => {
      state.productos.push(payload);
    },
    modificarProducto: (state, { payload }) => {
      //map -> itera sobre los productos
      //        si encuentra el producto, lo actualiza y devuelve una lista con todos los productos
      //        de lo contrario devuelve la misma sin ninguna modificacion
      state.productos = state.productos.map((prod) => {
        if (prod.nombre === payload.nombre) {
          return payload;
        }
        return prod;
      });
    },
    borrarProducto: (state, { payload }) => {
      // filter -> devuele una lista de productos sin el producto a eliminar
      state.productos = state.productos.filter(
        (prod) => prod.nombre !== payload.nombre
      );
    },
    setProductos: (state, { payload }) => {
      state.productos = payload;
    },
    agregarVenta: (state, { payload }) => {
      state.ventas.push(payload);
    },
    setVentas: (state, { payload }) => {
      state.ventas = payload;
    }
  }
});

// Se exportan las acciones
export const {
  agregarProducto,
  modificarProducto,
  borrarProducto,
  onProductoActivo,
  setProductos,
  agregarVenta,
  setVentas
} = appSlice.actions;
