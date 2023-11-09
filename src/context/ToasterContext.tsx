"use client";
import { Toaster } from "react-hot-toast";

export default function ToasterContext() {
  return (
    <div>
      <Toaster
        reverseOrder={false}
        position="top-center"
        toastOptions={{
          duration: 45000,
          style: {},
        }}
      ></Toaster>
    </div>
  );
}
