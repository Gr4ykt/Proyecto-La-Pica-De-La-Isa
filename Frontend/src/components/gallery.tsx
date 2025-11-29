"use client";

import React, { useState } from "react";

const images = [
    "/Images/Imagen4.webp",
    "/Images/Imagen9.webp",
    "/Images/Imagen6.webp",
    "/Images/Imagen1.webp",
    "/Images/Imagen7.webp",
    "/Images/Imagen12.webp",
    "/Images/Imagen11.webp",
    "/Images/Imagen2.webp",
    "/Images/Imagen10.webp",
    "/Images/Imagen5.webp",
    "/Images/Imagen3.webp",
    "/Images/Imagen8.webp",
  ];
  

const GaleryComponent: React.FC = () => {

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      {/* --- LIGHTBOX MODAL --- */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-lg"
            alt="Selected"
          />
        </div>
      )}

      {/* --- GALLERY --- */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`img-${index}`}
            className="w-full mb-4 rounded-lg shadow-sm
                       hover:scale-105 hover:shadow-lg
                       transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
    </>
  );
};

export default GaleryComponent;
