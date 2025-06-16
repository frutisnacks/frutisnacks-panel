"use client";

import { removeToken } from "@/utils/authUtils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDoorOpen } from "react-icons/fa";
import { MdPointOfSale } from "react-icons/md";

const menuItems = [
  {
    name: "Ventas",
    href: "/dashboard",
    icon: <MdPointOfSale className="text-2xl" />,
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="min-w-[280px] w-[280px] h-screen overflow-y-auto bg-neutral-950 shadow-xl shadow-neutral-500 flex flex-col items-center py-10  border-1.5 border-neutral-600">
      <Image
        className="w-[100px]"
        src="/logo.png"
        alt="Logo"
        height={500}
        width={500}
        priority
      />

      <nav className="w-full h-full pt-10 px-1">
        <ul className="space-y-[3px]">
          {menuItems.map((item) => (
            <li key={item.href} className="w-full">
              <Link
                href={item.href}
                className={`flex items-center gap-3 p-4 text-white bg-neutral-700 hover:bg-yellow-500 ${
                  pathname === item.href ? "bg-yellow-500 font-semibold" : ""
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}

          <li
            className="w-full"
            onClick={() => {
              removeToken();
              window.location.reload(); // Corregido aquí
            }}
          >
            <button className="w-full flex items-center gap-3 p-4 text-white bg-red-500 hover:bg-red-600 ">
              <FaDoorOpen />
              <span>Cerrar Sesion</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
