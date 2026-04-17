import { createRouter, createWebHistory } from "vue-router";

import HomeView from "./views/public/HomeView.vue";
import LoginView from "./views/public/LoginView.vue";
import RegisterView from "./views/public/RegisterView.vue";
import ProductListView from "./views/shop/ProductListView.vue";
import ProductDetailView from "./views/shop/ProductDetailView.vue";
import MyOrdersView from "./views/client/MyOrdersView.vue";
import EmployeeOrdersView from "./views/employee/EmployeeOrdersView.vue";
import AdminDashboard from "./views/admin/AdminDashboard.vue";
import ManageProducts from "./views/admin/ManageProducts.vue";
import ManageCategories from "./views/admin/ManageCategories.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginView, meta: { hideLayout: true } },
  { path: "/register", component: RegisterView , meta: { hideLayout: true }},
  { path: "/products", component: ProductListView },
  { path: "/products/:slug", component: ProductDetailView },
  { path: "/orders", component: MyOrdersView },
  { path: "/employee/orders", component: EmployeeOrdersView },
  { path: "/admin", component: AdminDashboard },
  { path: "/admin/products", component: ManageProducts },
  { path: "/admin/categories", component: ManageCategories },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
