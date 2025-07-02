import { fetchNoteById } from "../../../lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { notFound } from "next/navigation";

interface NoteDetailsProps {
  params: { id: string };
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = params;
  const noteId = +id;
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", noteId],
      queryFn: () => fetchNoteById(noteId),
    });
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
