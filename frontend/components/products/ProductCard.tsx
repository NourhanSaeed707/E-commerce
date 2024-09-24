import { ProductForm } from "@/types/product";
import { Card } from "antd";
import React, { useEffect } from "react";
const { Meta } = Card;

function ProductCard({ product }) {
  useEffect(() => {
    console.log("prooooooduct card: ", product);
  }, [product]);

  return (
    <div>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={product && product.images && product.images[0]?.imageUrl} />}
      >
        <Meta title={product.name} description={product.price} />
      </Card>
    </div>
  );
}

export default ProductCard;
