import { useDispatch, useSelector } from "react-redux";
import { FirebaseApp } from "../firebase/config";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import {
  agregarProducto,
  borrarProducto,
  modificarProducto,
  onProductoActivo,
  setProductos,
  agregarVenta,
  setVentas
} from "../store";
import { loadProducts } from "../helpers/loadProducts";
import { loadVentas } from "../helpers/loadVentas";

export const useAppStore = () => {
  // el dispatch se encargada de ejecutar las acciones del estado
  const dispatch = useDispatch();
  // atributos del estado de app
  const { ventas, productos, productoActivo } = useSelector(
    (state) => state.app
  );

  const db = getFirestore(FirebaseApp);

  const setProductoActivo = (producto) => {
    dispatch(onProductoActivo(producto));
  };

  const startAgregarProducto = async (producto) => {
    await setDoc(doc(db, "productos", producto.nombre), {
      precio: parseInt(producto.precio, 10),
      cantidad: parseInt(producto.cantidad, 10)
    });

    dispatch(agregarProducto(producto));
  };

  const startAgregarVenta = async (total, venta, currentData) => {
    await setDoc(doc(db, "ventas", currentData), {
      total,
      venta: { ...venta }
    });
    dispatch(agregarVenta(venta));
  };

  const startModificarProducto = async (producto) => {
    const docRef = doc(db, "productos", producto.nombre);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      //restamos en la base de datos max(valueOld-valueNew,0) y cargamos
      await setDoc(doc(db, "productos", producto.nombre), {
        precio: parseInt(producto.precio, 10),
        cantidad: parseInt(producto.cantidad, 10)
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    dispatch(modificarProducto(producto));
  };

  const startEliminarProducto = async (producto) => {
    const docRef = doc(db, "productos", producto.nombre);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      //restamos en la base de datos max(valueOld-valueNew,0) y cargamos
      await setDoc(doc(db, "productos", producto.nombre), {
        precio: docSnap.data().precio,
        cantidad: Math.max(
          docSnap.data().cantidad - parseInt(producto.cantidad, 10),
          0
        )
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    dispatch(borrarProducto(producto));
  };

  const startCargarProductos = async () => {
    // se cargan los productos de la DB
    const productos = await loadProducts();

    dispatch(setProductos(productos));
  };

  const startCargarVentas = async () => {
    // se cargan las ventas de la DB
    const ventas = await loadVentas();

    dispatch(setVentas(ventas));
  };

  return {
    // Propiedades
    productos,
    ventas,
    productoActivo,

    // Metodos
    setProductoActivo,
    startAgregarProducto,
    startModificarProducto,
    startEliminarProducto,
    startCargarProductos,
    startAgregarVenta,
    startCargarVentas
  };
};
