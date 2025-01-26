import { Button } from "@nextui-org/react";
import React from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";

export const Navbar = () => {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token"); // Ambil token dari local storage

      if (!token) {
        throw new Error("Token not found");
      }

      // Kirim permintaan HTTP ke endpoint logout di backend Laravel
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Sertakan token dalam header
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Hapus token dari local storage setelah berhasil logout
      localStorage.removeItem("token");

      // Redirect ke halaman login atau halaman lainnya setelah logout berhasil
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      // Tampilkan pesan kesalahan kepada pengguna
    }
  };
  return (
    <div className="bg-white flex justify-between items-center px-5 h-12 shadow-md mb-1 fixed top-0 left-0 right-0  z-[999]">
      <h3 className="text-xl">D5 PlayStation</h3>
      <div>
        {/* <FaBarsStaggered className="cursor-pointer" /> */}
        <Button size="sm" color="default" variant="flat" onClick={handleLogout}>
          <IoIosLogOut size={20} />
        </Button>
      </div>
    </div>
  );
};
