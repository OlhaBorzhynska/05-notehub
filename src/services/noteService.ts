import axios from "axios";
import type { Note } from "../types/note";
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  searchQuery: string,
  currentPage: number,
  sortByQuery: string,
): Promise<NotesResponse> {
  const { data } = await axios.get<NotesResponse>(`/notes`, {
    params: {
      search: searchQuery,
      page: currentPage,
      sortBy: sortByQuery,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return data;
}

export async function createNote(newNote: Note): Promise<Note> {
  const { data } = await axios.post<Note>(`/notes`, newNote, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const { data } = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return data;
}
