import { Card } from "antd";
import Image from "next/image";
import React, { useEffect } from "react";
const { Meta } = Card;

type ProductCardProps = {
  product: any,
  productColorImg?: string
}
function ProductCard({ product }: ProductCardProps) {

  return (
    <div>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <Image
            alt="example"
            src={product && product.images && product.images[0]?.imageUrl}
            width={100}
            height={100}
            style={{ height: "200px", objectFit: "contain" }}
          />
        }
      >
        <Meta title={product.name} description={product.price} />
      </Card>
    </div>
  );
}

export default ProductCard;
