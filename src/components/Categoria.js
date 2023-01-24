import React from "react";
import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";

const Categoria = ({ categoria }) => {
  const { categoriaActual, handleClickCategoria } = useQuiosco();
  const { nombre, icono, id } = categoria;
  return (
    <>
      <div
        className={`${
          categoriaActual?.id === id ? "bg-amber-400" : ""
        } flex items-center gap-4 cursor-pointer w-full  p-5 hover:bg-amber-400 position-relative`}
      >
        <Image
          src={`/assets/img/icono_${icono}.svg`}
          alt={nombre}
          width={50}
          height={50}
        />

        <button
          onClick={() => handleClickCategoria(id)}
          className="text-2xl font-bold text-white w-full text-left"
        >
          {nombre}
        </button>
      </div>
    </>
  );
};

export default Categoria;
