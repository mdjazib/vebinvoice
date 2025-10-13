import { create } from 'zustand'

export const useStore = create((set) => ({
    customer: { name: "", email: "", address: "", abn: "", contact: "", walkIn: true },
    setCustomer: (value) => set(() => ({ customer: value })),
}))