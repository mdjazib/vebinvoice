import { create } from 'zustand'

export const useStore = create((set) => ({
    customer: { name: "", email: "", address: "", abn: "", contact: "", walkIn: true },
    inv: 0,
    setCustomer: (value) => set(() => ({ customer: value })),
    setINV: (value) => set(() => ({ inv: value }))
}))