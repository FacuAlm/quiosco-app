import React from "react";
import Image from "next/image";
import { formatearDinero } from "../helpers/index";
import useQuiosco from "@/hooks/useQuiosco";

const Producto = ({ producto }) => {
  const { handleSetProducto, handleChangeModal } = useQuiosco();
  const { nombre, precio, imagen } = producto;
  return (
    <div key={producto.id} className="border p-3 ">
      <Image
        src={`/assets/img/${imagen}.jpg `}
        alt={nombre}
        width={400}
        height={400}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>

        <p className="mt-5 font-black text-4xl text-center text-amber-400">
          {" "}
          {formatearDinero(precio)}{" "}
        </p>

        <button
          type="button"
          className="bg-amber-400 hover:bg-amber-500 w-full mt-5 p-2 text-white uppercase font-bold"
          onClick={() => {
            handleSetProducto(producto);
            handleChangeModal(true);
          }}
        >
          Agregar al pedido
        </button>
      </div>
    </div>
  );
};

export default Producto;
