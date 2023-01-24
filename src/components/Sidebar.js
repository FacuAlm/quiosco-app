import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";
import Categoria from "./Categoria";
const Sidebar = () => {
  const { categorias } = useQuiosco();
  return (
    <>
      <Image src="/assets/img/logo.svg" width={200} height={200} alt="logo"  />
      <nav className="mt-10 list-none">
        {categorias.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
