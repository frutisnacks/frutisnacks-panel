export interface DetalleCompra {
  id: number;
  compra_id: number;
  titulo: string;
  sub_titulo: string;
  sub_titulo2?: string | null;
  descripcion: string;
  url_image: string;
  unit_price: string;
  total_price: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface Compra {
  id: number;
  cliente_id: number;
  mercadopago_payment_id: string | null;
  total: string;
  estado_pago: string;
  metodo_pago: string | null;
  mercado_pago_id: string | null;
  created_at: string;
  updated_at: string;
  detalles: DetalleCompra[];
}

export interface Cliente {
  id: number;
  nombre_apellidos: string;
  email: string;
  dni: string;
  celular: string;
  direccion: string;
  referencia?: string | null;
  departamento?: string | null;
  provincia?: string | null;
  distrito?: string | null;
  created_at: string;
  updated_at: string;
  compra?: Compra | null;
}
