import Image from "next/image";
import { formatearDinero } from "@/helpers";
import axios from "axios";
import { toast } from "react-toastify";

const Orden = ({ orden }) => {
  const { id, nombre, total, pedido, fecha } = orden;

  const completarOrden = async () => {
    try {
      await axios.post(`/api/ordenes/${id}`);

      toast.success("Orden completada");
    } catch (error) {
      toast.error("Error al completar la orden");
    }
  };
  return (
    <div className="border p-10 space-y-5 ">
      <h3 className="text-xl text-gray-800 font-bold">Orden: {id}</h3>
      <p className="text-gray-800 font-bold">Nombre: {nombre}</p>

      <div>
        {pedido.map((plato) => (
          <div
            key={plato.id}
            className="py-3 flex border-b last-of-type:border-0 items-center"
          >
            <div className="w-32 ">
              <Image
                width={400}
                height={500}
                src={`/assets/img/${plato.imagen}.jpg`}
                alt={plato.nombre}
              />
            </div>
            <div className="p-5 space-y-2">
              <h4 className="text-amber-500 text-xl font-bold">
                {plato.nombre}
              </h4>
              <p className="text-gray-800 text-lg font-bold">
                Cantidad: {plato.cantidad}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="md:flex md:items-center md:justify-between my-10 ">
        <p className="text-amber-500 text-4xl  font-black">
          Total: {formatearDinero(total)}
        </p>

        <button
          className="bg-amber-500 hover:bg-amber-600 w-full md:w-auto text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={completarOrden}
        >
          Completar Orden
        </button>
      </div>
    </div>
  );
};

export default Orden;
