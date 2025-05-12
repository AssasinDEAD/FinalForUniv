import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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
import { useCurrentUser } from "../hooks/useCurrentUser";  // Assuming it's available in your app

const Stack = createStackNavigator();

const AppRouter = () => {
  const { user } = useCurrentUser();  // Use context or hooks for user info

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Unprotected routes */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />

        {/* Protected routes (using a simple check for role in the component) */}
        {user && (
          <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="VacancyList" component={VacancyListPage} />
            <Stack.Screen name="VacancyDetails" component={VacancyDetailsPage} />
            <Stack.Screen name="NotificationList" component={NotificationListPage} />
            <Stack.Screen name="NotificationDetails" component={NotificationDetailsPage} />
          </>
        )}

        {/* Admin only routes */}
        {user?.role === "admin" && (
          <Stack.Screen name="CreateUser" component={CreateUser} />
        )}

        {/* Student specific routes */}
        {user?.role === "student" && (
          <Stack.Screen name="MyResume" component={ResumePage} />
        )}

        {/* Company and Career Center routes */}
        {(user?.role === "company" || user?.role === "career_center") && (
          <>
            <Stack.Screen name="ResumeList" component={ResumeListPage} />
            <Stack.Screen name="ResumeDetails" component={ResumeDetailsPage} />
          </>
        )}

        {/* Vacancy and Notification routes */}
        {user?.role === "company" && (
          <Stack.Screen name="VacancyForm" component={VacancyFormPage} />
        )}
        {user?.role === "career_center" && (
          <Stack.Screen name="NotificationForm" component={NotificationFormPage} />
        )}
        
        {/* Catch-all */}
        <Stack.Screen name="NotFound" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
