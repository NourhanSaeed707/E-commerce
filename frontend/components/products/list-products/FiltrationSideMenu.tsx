import React from "react";
import { Select, Spin } from "antd";
import useGetAllEntity from "@/hooks/general-crud/useGetAllEntity";
import { FiltrationSideMenuProps } from "@/types/product";

const { Option } = Select;

export default function FiltrationSideMenu({
  setSortOrder,
    setColorFilter,
    setSizeFilter,
    setCategoryTypeFilter,
    sortOrder,
    colorFilter,
    sizeFilter,
    categoryTypeFilter
}: FiltrationSideMenuProps) {
  const apiCategoryUrl = "/api/category-type/get-all";
  const apiColorUrl = "/api/colors/get-all"; 
  const apiSizeUrl = "/api/sizes/get-all"; 
  const { entities: categoryTypes, loading: categoryLoading } = useGetAllEntity(apiCategoryUrl);
  const { entities: colors, loading: colorLoading } = useGetAllEntity(apiColorUrl);
  const { entities: sizes, loading: sizeLoading } = useGetAllEntity(apiSizeUrl);
  // Handle sort order change
  const handleSortChange = (value: string) => {
    if (value === "lowToHigh") {
      setSortOrder("lowToHigh");
    } else if (value === "highToLow") {
      setSortOrder("highToLow");
    } else {
      setSortOrder(null);
    }
  };

  const handleCategoryChange = (value: string) => {
    console.log("Selected category:", value);
    setCategoryTypeFilter(Number(value));
  };

  const handleColorChange = (value: string) => {
    console.log("Selected color:", value);
    setColorFilter(Number(value));
  };

   const handleSizeChange = (value: string) => {
     console.log("Selected size:", value);
    setSizeFilter(Number(value));
  };

  return (
    <aside className="w-1/4 p-4 bg-gray-100">
      <h2 className="font-bold text-xl mb-4">Filter by</h2>

      {/* Filter by Price */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Price</h3>
        <Select
          value={sortOrder || ""}
          style={{ width: "100%" }}
          onChange={handleSortChange}
        >
          <Option value="">None</Option>
          <Option value="lowToHigh">Price: Low to High</Option>
          <Option value="highToLow">Price: High to Low</Option>
        </Select>
      </div>

      {/* Filter by Category */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Category</h3>
        {categoryLoading ? (
          <Spin />
        ) : (
          <Select
            style={{ width: "100%" }}
            placeholder="Select Category"
            onChange={handleCategoryChange}
          >
            <Option value="">All Categories</Option>
            {categoryTypes?.map((category: any) => (
              <Option key={category.id} value={category.name}>
                {category.name}
              </Option>
            ))}
          </Select>
        )}
      </div>
      {/* Filter by Color */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Color</h3>
        {colorLoading ? (
          <Spin />
        ) : (
          <Select
            style={{ width: "100%" }}
            placeholder="Select Color"
            onChange={handleColorChange}
          >
            <Option value="">All Colors</Option>
            {colors?.map((color: any) => (
              <Option key={color.id} value={color.color}>
                {color.name}
              </Option>
            ))}
          </Select>
        )}
      </div>
      {/* Filter by Size */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Size</h3>
        {sizeLoading ? (
          <Spin />
        ) : (
          <Select
            style={{ width: "100%" }}
            placeholder="Select Size"
            onChange={handleSizeChange}
          >
            <Option value="">All Sizes</Option>
            {sizes?.map((size: any) => (
              <Option key={size.id} value={size.size}>
                {size.name}
              </Option>
            ))}
          </Select>
        )}
      </div>
    </aside>
  );
}
