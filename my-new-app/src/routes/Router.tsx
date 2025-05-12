import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Экраны
import Home from "../pages/home/home/home";
import Login from "../pages/auth/login/login";
import Dashboard from "../pages/dashboard/dashboard/dashboard";
import CreateUser from "../pages/admin/createUser/createUser";
import ResumePage from "../pages/resume/list/resumePage";
import ResumeListPage from "../pages/resume/form/ResumeListPage";
import ResumeDetailsPage from "../pages/resume/details/ResumeDetailsPage";
import VacancyFormPage from "../pages/vacancy/form/VacancyFormPage";
import VacancyDetailsPage from "../pages/vacancy/details/VacancyDetailsPage";
import VacancyListPage from "../pages/vacancy/list/VacancyListPage";
import NotificationListPage from "../pages/notification/list/NotificationListPage";
import NotificationFormPage from "../pages/notification/form/NotificationFormPage";
import NotificationDetailsPage from "../pages/notification/details/NotificationDetailsPage";


// Типизация маршрутов
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Dashboard: undefined;
  CreateUser: undefined;
  MyResume: undefined;
  ResumeList: undefined;
  ResumeDetails: { id: string }; // Параметр id для экрана ResumeDetails
  VacancyList: undefined;
  VacancyDetails: { id: string }; // Параметр id для экрана VacancyDetails
  VacancyForm: { id?: string }; // Параметр id для экрана VacancyForm, необязательный
  NotificationList: undefined;
  NotificationDetails: { id: string }; // Параметр id для экрана NotificationDetails
  NotificationForm: { id?: string }; // Параметр id для экрана NotificationForm, необязательный
  NotFound: undefined;
};

const Stack = createStackNavigator<Omit<RootStackParamList, 'id'>>();

const AppRouter = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" id={undefined}>
      {/* Не защищенные маршруты */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />

      {/* Защищенные маршруты */}
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="VacancyList" component={VacancyListPage} />
      <Stack.Screen name="VacancyDetails" component={VacancyDetailsPage} />

      {/* Только для студента */}
      <Stack.Screen name="MyResume" component={ResumePage} />

      {/* Для компании и центра карьеры */}
      <Stack.Screen name="ResumeList" component={ResumeListPage} />
      <Stack.Screen name="ResumeDetails" component={ResumeDetailsPage} />

      {/* Для компаний (создание вакансий) */}
      <Stack.Screen name="VacancyForm" component={VacancyFormPage} />

      {/* Для центра карьеры (создание уведомлений) */}
      <Stack.Screen name="NotificationForm" component={NotificationFormPage} />
      <Stack.Screen name="NotificationDetails" component={NotificationDetailsPage} />

      {/* Страница 404 */}
      <Stack.Screen name="NotFound" component={Home} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppRouter;
