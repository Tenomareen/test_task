import { Form, Input, Modal } from "antd";
import React, { FC, useEffect, useState } from "react";
import { getClientById, updateClientById } from "../services/ClientsService";
import { StyledSpin } from "./styled";

interface EditClientModalProps {
  id: number;
  isEditOpen: boolean;
  onClose: () => void;
  updateData: () => void;
}

interface ClientType {
  id: number;
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  linkedin: string;
}

export const EditClientModal: FC<EditClientModalProps> = ({
  id,
  isEditOpen,
  onClose,
  updateData,
}) => {
  const [form] = Form.useForm();
  const [client, setClient] = useState<ClientType>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    setIsLoading(true);
    getClientById(id).then(({ data }) => {
      setIsLoading(false);
      setClient(data);
    });
  };

  const handleSubmit = () => {
    const formData = form.getFieldsValue();
    updateClientById(id, formData).then(() => {
      updateData();
      onClose();
    });
  };

  return (
    <Modal
      open={isEditOpen}
      closable={false}
      onCancel={onClose}
      okText="Save Client"
      onOk={handleSubmit}
    >
      {isLoading && <StyledSpin size="large" spinning={isLoading} />}
      {!isLoading && (
        <Form form={form} initialValues={client}>
          <h1>Edit Client</h1>
          <Form.Item
            name="firstName"
            rules={[
              { required: true, message: "Please input your First Name!" },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="secondName"
            rules={[
              { required: true, message: "Please input your Second Name!" },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              { required: true, message: "Please input your email!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="linkedin"
            rules={[
              {
                type: "url",
                message: "The input is not valid Linkedin link!",
              },
            ]}
          >
            <Input placeholder="Linkedin" />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
