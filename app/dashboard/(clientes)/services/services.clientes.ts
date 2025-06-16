import axios from "@/service/axiosInstance";

export async function getClientes() {
  try {
    const res = await axios.get(`/clientes`);
    return res.data; // Retorna los datos de las aulas
  } catch (error) {
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
}
