import { atom } from "jotai"

export const currentTimeAtom = atom<string>("")
export const setCurrentTimeAtom = atom(null, (_get, set, update: string) =>
  set(currentTimeAtom, (prev) => update)
)

export const globalCurrentTimeAtom = atom<string>((get) => get(currentTimeAtom))
