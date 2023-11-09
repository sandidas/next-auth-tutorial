"use client";
import { Toaster } from "react-hot-toast";

export default function ToasterContext() {
  return (
    <div>
      <Toaster
        reverseOrder={false}
        position="bottom-right"
        toastOptions={{
          duration: 20000,
          style: {},
        }}
      ></Toaster>
    </div>
  );
}
