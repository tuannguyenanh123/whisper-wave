import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Profile } from "../gql/graphql";

interface ProfileStore {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile: Profile | null) => set({ profile: profile }),
    }),
    {
      name: "profile-store",
    }
  )
  // (set) => ({
  //     setActionModal: (modal: Modal | null) => set({ activeModal: modal }),
  // })
);
