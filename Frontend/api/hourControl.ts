import { HourControl } from '@/interfaces/hourContorl.interface';
import axios from 'axios';
import { baseUrl as constantBaseUrl } from '../constants/constants';

const baseUrl = `${constantBaseUrl}/hour-control`;

export const startStop = (userId: number) => axios.post<HourControl>(baseUrl, userId).then(res => res.data);
export const getByUser = (userId: number) => axios.get<HourControl[]>(baseUrl + '/by/user' + userId).then(res => res.data);
export const getByDate = (userId: number, startDate: string, endDate: string) => axios.post<HourControl[]>(`${baseUrl}/by/date`, { userId, startDate, endDate }).then(res => res.data);
