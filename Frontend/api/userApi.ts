import { baseUrl as constantBaseUrl } from "@/constants/constants";
import { User } from "@/interfaces/user.interface";
import axios from "axios";

const baseUrl = constantBaseUrl + '/user';

export const getAllUsers = () => axios.get<User[]>(baseUrl).then(res => res.data);
export const getOneUser = (id: number) => axios.get<User>(`${ baseUrl }/${ id }`).then(res => res.data);
export const createUser = (user: User) => axios.post<User>(baseUrl, user).then(res => res.data);
export const updateUser = (id: number, user: Partial<User>) => axios.put<User>(`${ baseUrl }/${ id }`, user).then(res => res.data);
export const deleteUser = (id: number) => axios.delete<void>(`${ baseUrl }/${ id }`).then(res => res.data);
export const login = (username: string) => axios.post<User>(`${ baseUrl }/login`, { username }).then(res => res.data);