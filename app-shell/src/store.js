import create from 'zustand';

const useStore = create((set) => ({
    products: [],
    cart: [],
    addProduct: (product) => set((state) => ({ products: [...state.products, product]})),
    addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
}));

export default useStore;