import { useState, useEffect } from "react";
import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";
import { formatearDinero } from "../helpers/index";
const ModalProducto = () => {
  const { producto, handleChangeModal, handleAgregarPedido, pedido } =
    useQuiosco();
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);

  useEffect(() => {
    if (pedido.some((item) => item.id === producto.id)) {
      setEdicion(true);
      setCantidad(pedido.find((item) => item.id === producto.id).cantidad);
    } else {
      setEdicion(false);
      setCantidad(1);
    }
  }, [producto, pedido]);

  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3">
        <Image
          width={300}
          height={400}
          alt={`Imagen de ${producto.nombre}`}
          src={`/assets/img/${producto.imagen}.jpg`}
        />
      </div>
      <div className="md:w-2/3">
        <div className="flex justify-end">
          <button type="button" onClick={() => handleChangeModal(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
        <p className=" text-5xl font-bold mt-5 text-amber-500">
          {formatearDinero(producto.precio)}
        </p>

        <div className="flex justify-between items-center mt-5">
          <button
            type="button"
            onClick={() => {
              if (cantidad <= 1) {
                return;
              } else {
                setCantidad(cantidad - 1);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          <p className="text-3xl font-bold">{cantidad}</p>

          <button
            type="button"
            onClick={() => {
              if (cantidad >= 5) {
                return;
              } else {
                setCantidad(cantidad + 1);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <button
          type="button"
          className="bg-amber-500 text-white font-bold py-2 px-4 rounded mt-5 hover:bg-amber-600 w-full"
          onClick={() => handleAgregarPedido({ ...producto, cantidad })}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ModalProducto;
