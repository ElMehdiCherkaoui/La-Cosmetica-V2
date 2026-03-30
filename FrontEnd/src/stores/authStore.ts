import { reactive } from "vue";

type Role = "client" | "employee" | "admin" | "guest";

const store = reactive({
  isAuthenticated:
    !!localStorage.getItem("token") &&
    localStorage.getItem("token") !== "undefined",

  role: localStorage.getItem("role") || "guest",

  token: localStorage.getItem("token"),

  login(userRole: Role, token: string) {
    const safeRole = userRole || "client";

    this.isAuthenticated = true;
    this.role = safeRole;
    this.token = token;

    localStorage.setItem("token", token);
    localStorage.setItem("role", safeRole);
  },

  logout() {
    this.isAuthenticated = false;
    this.role = "guest";
    this.token = null;

    localStorage.removeItem("token");
    localStorage.removeItem("role");
  },
});

export function useAuthStore() {
  return store;
}
