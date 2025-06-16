"use client";

import { useEffect, useState } from "react";
import Skeleton from "@/components/Skeleton";
import TablaAlumnos from "./(clientes)/components/TablaClientes";
import { getClientes } from "./(clientes)/services/services.clientes";
import { Cliente } from "./(clientes)/types/cliente.type";
import { MdPointOfSale } from "react-icons/md";

export default function AlumnosPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const cargarEstudiantes = async () => {
    setLoading(true);
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error("Error al cargar aulas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  return (
    <section className="w-full min-h-[100vh] overflow-y-auto p-6  ">
      <div className="flex gap-2 items-center mb-4">
        <MdPointOfSale className="text-3xl" />
        <h1 className="text-2xl font-bold  underline">Ventas</h1>
      </div>

      {loading ? <Skeleton /> : <TablaAlumnos clientes={clientes} />}
    </section>
  );
}
