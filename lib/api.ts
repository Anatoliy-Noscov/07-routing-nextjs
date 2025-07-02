import axios from "axios";
import type { CreateNoteValues, Note, FetchNotesValues } from "../types/note";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

axios.interceptors.request.use((config) => {
  if (process.env.NEXT_PUBLIC_NOTEHUB_TOKEN) {
    config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;
  }
  return config;
});

export async function fetchNotes(
  search: string,
  page: number,
  tag?: string
): Promise<FetchNotesValues> {
  const params = new URLSearchParams({
    page: page.toString(),
    perPage: "12",
    ...(search && { search }),
    ...(tag && { tag }),
  });

  try {
    const res = await axios.get<FetchNotesValues>(
      `/notes?${params.toString()}`
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || error.message);
    } else {
      toast.error("An unknown error occurred");
    }
    throw error;
  }
}

export async function fetchNoteById(id: number): Promise<Note> {
  try {
    const res = await axios.get<Note>(`/notes/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("Note not found");
    }
    throw error;
  }
}

export async function createNote({
  title,
  content,
  tag,
}: CreateNoteValues): Promise<Note> {
  try {
    const res = await axios.post<Note>("/notes", { title, content, tag });
    toast.success("Note created successfully");
    return res.data;
  } catch (error) {
    toast.error(
      axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Failed to create note"
    );
    throw error;
  }
}

export async function deleteNote(id: number): Promise<void> {
  try {
    await axios.delete(`/notes/${id}`);
    toast.success("Note deleted successfully");
  } catch (error) {
    toast.error(
      axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Failed to delete note"
    );
    throw error;
  }
}

export function useNote(id: number) {
  return useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    retry: false,
  });
}
