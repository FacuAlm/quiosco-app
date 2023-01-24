import Layout from "@/layout/Layout";
import useQuiosco from "@/hooks/useQuiosco";
import Producto from "@/components/Producto";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { categoriaActual } = useQuiosco();
  return (
    <Layout pagina={`${categoriaActual?.nombre}`}>
      <h1 className="text-3xl text-center font-bold mt-10">
        {categoriaActual?.nombre}
      </h1>

      <p className="text-2xl my-10 mx-2">
        Elige y personaliza tu pedido a continuacion.
      </p>

      <button
        className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-10"
        onClick={() => router.push("/resumen")}
      >
        Ir al resumen
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {categoriaActual?.productos?.map((producto) => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </div>
    </Layout>
  );
}
