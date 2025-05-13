export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "company" | "career_center" | "admin";
}