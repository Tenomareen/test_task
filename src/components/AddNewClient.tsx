import { Form, Input, Modal } from "antd";
import React, { FC, useState } from "react";
import { postNewClient } from "../services/ClientsService";
import { StyledModal } from "./styled";

interface AddNewClientProps {
  init: () => void;
  isAddModalOpen: boolean;
  toggleModalOpen: () => void;
}

const AddNewClient: FC<AddNewClientProps> = ({
  init,
  isAddModalOpen,
  toggleModalOpen,
}) => {
  const [form] = Form.useForm();
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = () => {
    const formData = form.getFieldsValue();
    postNewClient(formData).then(() => {
      init();
      toggleModalOpen();
    });
  };

  const handleFieldsChange = () => {
    setTimeout(() =>
      setIsDisabled(
        !form.isFieldsTouched(true) ||
          form.getFieldsError().filter(({ errors }) => errors.length).length > 0
      )
    );
  };

  return (
    <>
      <StyledModal
        destroyOnClose
        open={isAddModalOpen}
        onCancel={() => toggleModalOpen()}
        closable={false}
        onOk={handleSubmit}
        okText="Add New Client"
        $isDisabledOk={isDisabled}
      >
        <Form form={form} onChange={handleFieldsChange}>
          <h1>Add New Client</h1>
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
            <Input placeholder="https://www.linkedin.com/in/vadim-strilciuc-00b815214/" />
          </Form.Item>
        </Form>
      </StyledModal>
    </>
  );
};

export default AddNewClient;
