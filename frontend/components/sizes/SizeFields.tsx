import { Buttons } from '@/constants/auth';
import { AddSizeRequired } from '@/constants/size';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import React from 'react'

export default function SizeFields({edit}) {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <Form.Item
        name="size"
        label="size"
        rules={[
          {
            required: true,
            message: `${AddSizeRequired.SIZE}`,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          {Buttons.ADD}
        </Button>
        <Button
          type="default"
          className="mt-3 w-full"
          onClick={() => router.push("/")}
        >
          {Buttons.CANCEL}
        </Button>
      </Form.Item>
    </div>
  )
}
