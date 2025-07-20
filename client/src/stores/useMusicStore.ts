import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { Album, Song } from "@/types";

interface MusicStore {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;

  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/albums");
      const data = res.data;
      set({ albums: data });
    } catch (error: any) {
      set({
        error:
          error.response.data.message ||
          "An error occurred while fetching albums",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbumById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(`/albums/${id}`);
      const data = res.data;
      set({ currentAlbum: data });
    } catch (error: any) {
      set({
        error:
          error.response.data.message ||
          "An error occurred while fetching the album",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
