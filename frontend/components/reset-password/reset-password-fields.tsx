import React from 'react'
import { Input, Form } from 'antd';

function ResetPasswordFields() {
    return (
        <>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: 'Please input your new password!' },
              { min: 8, message: 'Password must be at least 8 characters long' },
            ]}
          >
            <Input.Password
            //   value={newPassword}
            //   onChange={onNewPasswordChange}
              placeholder="Enter your new password"
            />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords do not match!');
                },
              }),
            ]}
          >
            <Input.Password
            //   value={confirmPassword}
            //   onChange={onConfirmPasswordChange}
              placeholder="Confirm your new password"
            />
          </Form.Item>
        </>
      );
}

export default ResetPasswordFields;