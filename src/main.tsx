import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { create } from "zustand"
import { persist, createJSONStorage, devtools } from "zustand/middleware"

import "./index.css"

interface AppState {
  currentTime: string
  setCurrentTime: (time: string) => void
  annotations: object[]
  add: (item: any) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        annotations: [],
        currentTime: "00:00:00",
        setCurrentTime: (time: string) => set({ currentTime: time }),
        add: (item) =>
          set((state) => ({ annotations: [...state.annotations, item] })),
      }),
      {
        name: "app-storage",
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )
)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
)
