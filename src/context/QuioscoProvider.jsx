import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [paso, setPaso] = useState(1);
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const obtenerCategorias = async () => {
    try {
      const { data } = await axios.get("api/categorias");
      setCategorias(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    if (categorias.length > 0) {
      setCategoriaActual(categorias[0]);
    }
  }, [categorias]);

  useEffect(() => {
    const nuevoTotal = pedido.reduce((total, producto) => {
      return total + producto.cantidad * producto.precio;
    }, 0);

    setTotal(nuevoTotal);
  }, [pedido]);

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((categoria) => categoria.id === id);
    setCategoriaActual(categoria[0]);

    router.push("/");
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      );
      setPedido(pedidoActualizado);

      toast.success("Producto actualizado");
    } else {
      setPedido([...pedido, producto]);
      toast.success("Producto agregado al pedido");
    }

    setModal(false);
  };

  const handleChangePaso = (paso) => {
    setPaso(paso);
  };

  const handleEditarPedido = (id) => {
    const producto = pedido.filter((producto) => producto.id === id);
    setProducto(producto[0]);
    setModal(true);
  };

  const handleEliminarPedido = (id) => {
    const pedidoActualizado = pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActualizado);

    toast.success("Producto eliminado");
  };

  const colocarOrden = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("api/ordenes", {
        nombre,
        pedido,
        total,
        fecha: Date.now().toString(),
      });

      //resetear la app
      setCategoriaActual(categorias[0]);
      setPedido([]);
      setNombre("");
      setTotal(0);

      toast.success("Orden colocada");

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        modal,
        handleChangeModal,
        pedido,
        handleAgregarPedido,
        handleChangePaso,
        handleEditarPedido,
        handleEliminarPedido,
        nombre,
        setNombre,
        colocarOrden,
        total,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
