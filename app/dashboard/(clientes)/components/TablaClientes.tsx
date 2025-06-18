"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";
import Image from "next/image";
import { Cliente, DetalleCompra } from "../types/cliente.type";
import { formatCreatedAtDate } from "@/utils/formatCreatedAtDate";

type Props = {
  clientes: Cliente[];
};

export default function TablaClientes({ clientes }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [detalles, setDetalles] = useState<DetalleCompra[]>([]);
  const [infoCompra, setInfoCompra] = useState({
    total: 0, // Initialize total as a number
    estado_pago: "",
    // Consider adding a delivery_cost property to your Compra type/store
    // if you explicitly store it in your backend. This would be even better.
  });

  const handleVerDetalles = (cliente: Cliente) => {
    const compra = cliente.compra;
    if (compra) {
      setDetalles(compra.detalles);
      setInfoCompra({
        total: Number(compra.total), // Ensure it's a number
        estado_pago: compra.estado_pago,
      });
      onOpen();
    }
  };

  const calculateProductsTotal = () => {
    return detalles.reduce(
      (sum, detalle) => sum + Number(detalle.total_price),
      0
    );
  };

  const productsSubtotal = calculateProductsTotal();
  const calculatedDeliveryCost = infoCompra.total - productsSubtotal;
  return (
    <>
      <Table
        aria-label="Tabla de clientes"
        color="default"
        isStriped
        maxTableHeight={800}
        radius="sm"
        isHeaderSticky
      >
        <TableHeader>
          <TableColumn className="bg-black text-white">#</TableColumn>
          <TableColumn className="bg-black text-white">FECHA</TableColumn>

          <TableColumn className="bg-black text-white">
            NOMBRE Y APELLIDOS
          </TableColumn>
          <TableColumn className="bg-black text-white">EMAIL</TableColumn>
          <TableColumn className="bg-black text-white">DNI</TableColumn>
          <TableColumn className="bg-black text-white">CELULAR</TableColumn>
          <TableColumn className="bg-black text-white">DIRECCIÓN</TableColumn>
          <TableColumn className="bg-black text-white">
            DEPARTAMENTO
          </TableColumn>
          <TableColumn className="bg-black text-white">PROVINCIA</TableColumn>
          <TableColumn className="bg-black text-white">DISTRITO</TableColumn>
          <TableColumn className="bg-black text-white">COMPRA</TableColumn>
        </TableHeader>
        <TableBody>
          {clientes?.map((cliente, index) => {
            const estado = cliente.compra?.estado_pago;
            let rowClass = "";

            if (estado === "pendiente") {
              rowClass = "bg-white";
            } else if (estado === "rechazado") {
              rowClass = "bg-red-100 text-white";
            } else if (estado === "pagado") {
              rowClass = "bg-green-100";
            }

            return (
              <TableRow key={cliente.id} className={rowClass}>
                <TableCell className="text-xs">{index + 1}</TableCell>
                <TableCell className="text-xs">
                  {formatCreatedAtDate(cliente.created_at)}
                </TableCell>
                <TableCell className="text-xs">
                  {cliente.nombre_apellidos}
                </TableCell>
                <TableCell className="text-xs">{cliente.email}</TableCell>
                <TableCell className="text-xs">{cliente.dni}</TableCell>
                <TableCell className="text-xs">{cliente.celular}</TableCell>
                <TableCell className="text-xs">{cliente.direccion}</TableCell>
                <TableCell className="text-xs">
                  {cliente.departamento}
                </TableCell>
                <TableCell className="text-xs">{cliente.provincia}</TableCell>
                <TableCell className="text-xs">{cliente.distrito}</TableCell>
                <TableCell className="text-xs">
                  <Button
                    size="sm"
                    color="secondary"
                    className="bg-black"
                    onPress={() => handleVerDetalles(cliente)}
                  >
                    Ver detalles
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Modal de Detalles */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Detalles de la compra</ModalHeader>
              <ModalBody>
                <div className="text-sm mb-4">
                  <p>
                    <strong>Estado del pago:</strong> {infoCompra.estado_pago}
                  </p>
                  {/* Corrected Delivery Cost Calculation */}
                  <p>
                    <strong>Subtotal de productos:</strong> S/{" "}
                    {productsSubtotal.toFixed(2)}
                  </p>
                  <p>
                    <strong>Costo de Envío:</strong> S/{" "}
                    {calculatedDeliveryCost.toFixed(2)}
                  </p>
                  <p>
                    <strong>Total General:</strong> S/{" "}
                    {infoCompra.total.toFixed(2)}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {detalles.map((detalle) => (
                    <div
                      key={detalle.id}
                      className="border rounded p-3 shadow-sm flex gap-3"
                    >
                      <Image
                        src={detalle.url_image}
                        alt={detalle.titulo}
                        width={100}
                        height={100}
                        className="rounded h-max"
                      />
                      <div className="text-sm">
                        <p className="font-bold">{detalle.titulo}</p>
                        <p>{detalle.sub_titulo}</p>
                        {detalle.sub_titulo2 && <p>{detalle.sub_titulo2}</p>}
                        <p className="text-xs mt-1">{detalle.descripcion}</p>
                        <p className="mt-1">
                          <strong>Cantidad:</strong> {detalle.quantity}
                        </p>
                        <p>
                          <strong>Precio unitario:</strong> S/{" "}
                          {detalle.unit_price}
                        </p>
                        <p>
                          <strong>Total:</strong> S/ {detalle.total_price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
