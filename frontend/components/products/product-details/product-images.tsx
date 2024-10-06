import Image from 'next/image';
import React from 'react'

function ProductImages({images}) {
  return (
    <div
      className={`grid gap-2 ${
        images && images.length === 1
          ? 'grid-cols-1'
          : images.length === 2
          ? 'grid-cols-2'
          : 'grid-cols-2 grid-rows-2'
      }`}
    >
      {images && images.slice(0, 4).map((image, index) => (
        <div key={index} className="w-full aspect-square">
          <Image
            src={image.imageUrl}
            alt={`Product image ${index + 1}`}
            className="w-full h-full object-cover"
            width={200} 
            height={200} 
          />
        </div>
      ))}
    </div>
  );
}

export default ProductImages