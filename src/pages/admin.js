import useSWR from "swr";
import AdminLayout from "@/layout/AdminLayout";
import axios from "axios";
import Orden from "@/components/Orden";

export default function Admin() {
  const fetcher = (url) =>
    axios.get("/api/ordenes").then((datos) => datos.data);
  const { data, error, isLoading } = useSWR("/api/ordenes", fetcher, {refreshInterval: 100});

  return (
    <AdminLayout pagina="Admin">
      <h1 className="text-4xl text-gray-800 font-black">
        Panel de Administración
      </h1>
      <p className="text-2xl text-gray-800 my-10">Administra las ordenes</p>

      {data && data.length ? (
        data.map((orden) => <Orden key={orden.id} orden={orden} />)
      ) : (
        <p className="text-2xl text-gray-800 my-10">No hay ordenes</p>
      )}
    </AdminLayout>
  );
}
