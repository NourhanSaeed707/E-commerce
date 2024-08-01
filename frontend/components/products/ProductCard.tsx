import { ProductForm } from "@/types/product";
import { Card } from "antd";
import React from "react";
const { Meta } = Card;

function ProductCard({ product }) {
  return (
    <div>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src={product.images && product.images[0]}
          />
        }
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>
    </div>
  );
}

export default ProductCard;
