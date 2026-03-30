import { reactive } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const store = reactive({
  items: [] as any[],

  addToCart(product: any, quantity: number) {
      this.items.push({
        slug: product.slug,
        name: product.name,
        price: Number(product.price),
        quantity: quantity,
      });
  },

  getTotalPrice() {
    let total = 0;
    for (let item of this.items) {
      total = total + item.price * item.quantity;
    }
    return total;
  },

  async checkout() {
    const authStore = useAuthStore();

    let formattedProducts = [];

    for (let item of this.items) {
      formattedProducts.push({
        slug: item.slug,
        quantity: item.quantity,
      });
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/orders",
        {
          products: formattedProducts,
        },
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error("Order failed:", error);
    }
  },
});

export function useCartStore() {
  return store;
}
