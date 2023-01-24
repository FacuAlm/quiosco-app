import Layout from "@/layout/Layout";
import { useEffect, useCallback } from "react";
import useQuiosco from "@/hooks/useQuiosco";
import { formatearDinero } from "@/helpers";

export default function Total() {
  const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco();
  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === "";
  }, [pedido, nombre]);

  useEffect(() => {
    comprobarPedido();
  }, [pedido, comprobarPedido]);

  return (
    <Layout pagina="Total y Confirmar Pedido">
      <h1 className="text-4xl  font-black">Total y Confirmar Pedido</h1>
      <p className="text-2xl  my-10">Confirma tu pedido a continuacion</p>

      <form className="mt-10" onSubmit={colocarOrden}>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded w-full lg:w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombre"
            type="text"
            placeholder="Nombre Cliente"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mt-10">
          <p className="text-2xl">
            Total a pagar {""}{" "}
            <span className="font-bold">{formatearDinero(total)}</span>
          </p>
        </div>

        <div>
          <input
            type="submit"
            className={` ${
              comprobarPedido()
                ? "bg-gray-700"
                : "bg-amber-500 hover:bg-amber-700 cursor-pointer"
            } w-full lg:w-1/3 text-center   text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-10`}
            value="Confirmar Pedido"
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </Layout>
  );
}
