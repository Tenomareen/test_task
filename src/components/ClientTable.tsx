import { FC, useEffect, useState } from "react";
import { Button, Table } from "antd";

import { deleteClient, getAllClients } from "../services/ClientsService";

import { ColumnsType } from "antd/lib/table";

import AddNewClient from "./AddNewClient";
import { EditClientModal } from "./EditClientModal";
import { StyledBody, StyledButton } from "./styled";

interface ClientTableProps {}

interface TableType {
  id: number;
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  linkedin: string;
}

const ClientTable: FC<ClientTableProps> = () => {
  const [clients, setClients] = useState<TableType[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [editId, setEditId] = useState(0);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    setIsDataLoading(true);
    getAllClients().then(({ data }) => {
      setIsDataLoading(false);
      setClients(data);
    });
  };

  const columns: ColumnsType<TableType> = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (_, record) => (
        <span
          onClick={() => {
            setEditId(record.id);
            setTimeout(() => setIsEditOpen(true), 300);
          }}
        >
          {record.firstName}
        </span>
      ),
    },
    {
      title: "Second Name",
      dataIndex: "secondName",
      key: "secondName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Linkedin",
      dataIndex: "linkedin",
      key: "linkedin",
      render: (_, record) => (
        <a href={record.linkedin} rel="noreferrer" target="_blank">
          {record.linkedin}
        </a>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          onClick={() => {
            deleteClient(record.id).then(() => init());
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <StyledBody>
      {isEditOpen && (
        <EditClientModal
          id={editId}
          isEditOpen={isEditOpen}
          onClose={() => setIsEditOpen(!isEditOpen)}
          updateData={init}
        />
      )}
      {isAddModalOpen && (
        <AddNewClient
          init={init}
          toggleModalOpen={() => setIsAddModalOpen(!isAddModalOpen)}
          isAddModalOpen={isAddModalOpen}
        />
      )}
      <StyledButton onClick={() => setIsAddModalOpen(true)}>
        Add New Client
      </StyledButton>
      <Table
        bordered
        sticky
        loading={isDataLoading}
        columns={columns}
        dataSource={clients || []}
        rowKey={(client) => client.id}
      />
    </StyledBody>
  );
};

export default ClientTable;
