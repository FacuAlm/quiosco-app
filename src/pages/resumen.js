import Layout from "@/layout/Layout";
import useQuiosco from "@/hooks/useQuiosco";
import ResumenProducto from "@/components/ResumenProducto";
import { useRouter } from "next/router";

export default function Resumen() {
  const router = useRouter();
  const { pedido } = useQuiosco();
  return (
    <Layout pagina="Resumen">
      <h1 className="text-4xl  font-black">Resumen</h1>
      <p className="text-2xl my-10">Revisa tu pedido</p>

      {pedido.length === 0 ? (
        <p className="text-2xl text-center my-10">
          No hay elementos en tu pedido
        </p>
      ) : (
        pedido.map((producto) => (
          <ResumenProducto key={producto.id} producto={producto} />
        ))
      )}

      <button
        className={`${
          pedido.length === 0
            ? "bg-gray-500"
            : "bg-amber-500 hover:bg-amber-700"
        }  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-10`}
        onClick={() => {
          pedido.length > 0 && router.push("/total");
        }}
      >
        Terminar pedido
      </button>
    </Layout>
  );
}
