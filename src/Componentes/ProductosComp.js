/*
Este componente se encargara de la interaccion entre la app y la base de datos
hara uso de un componente hijo ProductosForm para recoger la informacion necesaria
y posteriormente hacer uso de esta.
By: Angelo Lozano
Last moidification: 28/08/2022
*/

import ProductosForm from "./ProductosForm";
import { useAppStore } from "../hooks/useAppStore";

const ProductosComp = (props) => {
  const {
    startAgregarProducto,
    startModificarProducto,
    startEliminarProducto
  } = useAppStore();

  const crear_modificar_Datos = async (valores) => {
    // se modifican los datos que ingrese el usuario
    // no tiene verificaciones
    startModificarProducto(valores);
    /*
    await setDoc(doc(props.db, "productos", valores.nombre), {
      precio: parseInt(valores.precio, 10),
      cantidad: parseInt(valores.cantidad, 10)
    });*/
  };

  const agregarDatos = async (valores) => {
    // se suman las cantidades del producto seleccionado, el producto tendra el valor de
    // la ultima modificacion

    startAgregarProducto(valores);

    /* 
    const docRef = doc(db, "productos", valores.nombre);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      //restamos en la base de datos max(valueOld-valueNew,0) y cargamos
      await setDoc(doc(props.db, "productos", valores.nombre), {
        precio: docSnap.data().precio,
        cantidad: docSnap.data().cantidad + parseInt(valores.cantidad, 10)
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    */
  };

  const eliminarDatos = async (valores) => {
    // se restan las cantidades del producto seleccionado, si es negativo se deja en 0
    startEliminarProducto(valores);

    /*const docRef = doc(db, "productos", valores.nombre);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      //restamos en la base de datos max(valueOld-valueNew,0) y cargamos
      await setDoc(doc(props.db, "productos", valores.nombre), {
        precio: docSnap.data().precio,
        cantidad: Math.max(
          docSnap.data().cantidad - parseInt(valores.cantidad, 10),
          0
        )
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }*/
  };
  return (
    <div>
      <ProductosForm
        crear_modificar_Datos={crear_modificar_Datos}
        agregarDatos={agregarDatos}
        eliminarDatos={eliminarDatos}
        code={props.code}
      ></ProductosForm>
    </div>
  );
};
export default ProductosComp;
