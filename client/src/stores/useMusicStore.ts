import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { Album, Song } from "@/types";

interface MusicStore {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  featuredSongs: Song[];
  madeForYouSongs: Song[];
  trendingSongs: Song[];

  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  featuredSongs: [],
  madeForYouSongs: [],
  trendingSongs: [],

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

  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/songs/featured");
      const data = res.data;
      set({ featuredSongs: data });
    } catch (error: any) {
      set({
        error:
          error.response.data.message ||
          "An error occurred while fetching featured songs",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/songs/made-for-you");
      const data = res.data;
      set({ madeForYouSongs: data });
    } catch (error: any) {
      set({
        error:
          error.response.data.message ||
          "An error occurred while fetching made for you songs",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/songs/trending");
      const data = res.data;
      set({ trendingSongs: data });
    } catch (error: any) {
      set({
        error:
          error.response.data.message ||
          "An error occurred while fetching trending songs",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
