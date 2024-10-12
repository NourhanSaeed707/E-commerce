import React from "react";
import { Form, Input } from "antd";
import countries from "world-countries";
import Flag from "react-flagkit";
import Select from "react-select";

const countryOptions = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.cca2,
}));
const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
  }),
};
function ShippingFormFields() {
  return (
    <>
      <Form.Item
        label="Full Name"
        name={["shippingInfo", "fullName"]} // Nested name for validation
        rules={[{ required: true, message: "Please enter your full name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Address"
        name={["shippingInfo", "address"]}
        rules={[{ required: true, message: "Please enter your address" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="City"
        name={["shippingInfo", "city"]}
        rules={[{ required: true, message: "Please enter your city" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Postal Code"
        name={["shippingInfo", "postalCode"]}
        rules={[{ required: true, message: "Please enter your postal code" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Country"
        name={["shippingInfo", "country"]}
        rules={[{ required: true, message: "Please enter your country" }]}
      >
        <Select
          options={countryOptions}
          styles={customStyles}
          formatOptionLabel={(country) => (
            <div className="flex items-center">
              <Flag country={country.flag} className="mr-2" />
              <span>{country.label}</span>
            </div>
          )}
          isClearable={false} 
          isMulti={false} 
        />
      </Form.Item>
    </>
  );
}

export default ShippingFormFields;
