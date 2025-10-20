import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { Album, Song, Stats } from "@/types";
import { toast } from "react-hot-toast";

interface MusicStore {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  featuredSongs: Song[];
  madeForYouSongs: Song[];
  trendingSongs: Song[];
  stats: Stats;

  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
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
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalArtists: 0,
  },

  fetchSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/songs");
      const data = res.data;
      set({ songs: data });
    } catch (error: any) {
      set({
        error:
          error.response.data.message ||
          "An error occurred while fetching songs",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSong: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/songs/${id}`);
      set((state) => ({
        songs: state.songs.filter((song) => song._id !== id),
      }));

      toast.success("Song deleted successfully.");
    } catch (error: any) {
      toast.error("Error deleteing song.");
      set({
        error:
          error.response.data.message ||
          "An error occurred while deleting the song",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAlbum: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/albums/${id}`);
      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id),
        songs: state.songs.map((song) =>
          song.albumId === state.albums.find((a) => a._id === id)?.title
            ? { ...song, album: null }
            : song
        ),
      }));
      toast.success("Album deleted successfully.");
    } catch (error: any) {
      toast.error("Error deleting album.");
      set({
        error:
          error.response.data.message ||
          "An error occurred while deleting the album",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/stats");
      const data = res.data;
      set({ stats: data });
    } catch (error: any) {
      set({
        error:
          error.response.data.message ||
          "An error occurred while fetching stats",
      });
    } finally {
      set({ isLoading: false });
    }
  },

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
