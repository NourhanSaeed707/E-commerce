import { Buttons } from "@/constants/auth";
import { AddCancelButtonProps } from "@/types/product";
import { Button, Form } from "antd";
import { useRouter } from "next/router";
import React from "react";

export default function AddCancelButton({ edit }: AddCancelButtonProps) {
  const router = useRouter();
  return (
    <div>
      <Form.Item>
        {edit && (
          <Button type="primary" htmlType="submit" className="w-full">
            {Buttons.EDIT}
          </Button>
        )}
        {!edit && (
          <Button type="primary" htmlType="submit" className="w-full">
            {Buttons.ADD}
          </Button>
        )}
        <Button
          type="default"
          className="mt-3 w-full"
          onClick={() => router.push("/")}
        >
          {Buttons.CANCEL}
        </Button>
      </Form.Item>
    </div>
  );
}
