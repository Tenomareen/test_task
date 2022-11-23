import { instance as axios } from "../config/axiosInstance";

interface IClient {
  id: number;
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  linkedin: string;
}

export const getAllClients = () => axios.get<IClient[]>("/clients");
export const postNewClient = (client: IClient) =>
  axios.post("/clients", client);
export const deleteClient = (id: number) => axios.delete(`/clients/${id}`);
export const getClientById = (id: number) => axios.get(`/clients/${id}`);
export const updateClientById = (id: number, client: IClient) =>
  axios.put(`/clients/${id}`, client);
