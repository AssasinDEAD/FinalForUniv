import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Vacancy } from "../types/vacancy";

const API_URL = "http://192.168.225.12:3000/vacancies";

// Получение заголовков с авторизацией
const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("token");
  if (!token) throw new Error("Вы не авторизованы");
  return { Authorization: `Bearer ${token}` };
};

// Создание вакансии
export const createVacancy = async (vacancy: Vacancy) => {
  const { data } = await axios.post(API_URL, vacancy, {
    headers: await getAuthHeaders(),
  });
  return data;
};

// Обновление вакансии
export const updateVacancy = async (id: string, vacancy: Vacancy) => {
  const { data } = await axios.put(`${API_URL}/${id}`, vacancy, {
    headers: await getAuthHeaders(),
  });
  return data;
};

// Удаление вакансии
export const deleteVacancy = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: await getAuthHeaders(),
  });
};

// Получить вакансию по ID
export const getVacancyById = async (id: string): Promise<Vacancy> => {
  const { data } = await axios.get(`${API_URL}/${id}`, {
    headers: await getAuthHeaders(),
  });
  return data;
};

// Получить все вакансии для пользователя
export const getMyVacancies = async (): Promise<Vacancy[]> => {
  const { data } = await axios.get(`${API_URL}/my`, {
    headers: await getAuthHeaders(),
  });
  return data;
};
