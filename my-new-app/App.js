import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/home/home/home';
import Login from './src/pages/auth/login/login';
import Dashboard from './src/pages/dashboard/dashboard/dashboard';
import ResumePage from './src/pages/resume/list/resumePage';
import ResumeDetailsPage from './src/pages/resume/details/ResumeDetailsPage';
import VacancyFormPage from './src/pages/vacancy/form/VacancyFormPage';
import VacancyDetailsPage from './src/pages/vacancy/details/VacancyDetailsPage';
import VacancyListPage from './src/pages/vacancy/list/VacancyListPage';
import NotificationListPage from './src/pages/notification/list/NotificationListPage';
import NotificationFormPage from './src/pages/notification/form/NotificationFormPage';
import NotificationDetailsPage from './src/pages/notification/details/NotificationDetailsPage';
import { useCurrentUser } from './src/hooks/useCurrentUser';

const Stack = createStackNavigator();

export default function App() {
  const { user } = useCurrentUser();  // Получаем данные о текущем пользователе

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Resume" component={ResumePage} />
        <Stack.Screen name="ResumeDetails" component={ResumeDetailsPage} />
        <Stack.Screen name="VacancyForm" component={VacancyFormPage} />
        <Stack.Screen name="VacancyDetails" component={VacancyDetailsPage} />
        <Stack.Screen name="VacancyList" component={VacancyListPage} />
        <Stack.Screen name="Notifications" component={NotificationListPage} />
        <Stack.Screen name="NotificationForm" component={NotificationFormPage} />
        <Stack.Screen name="NotificationDetails" component={NotificationDetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
