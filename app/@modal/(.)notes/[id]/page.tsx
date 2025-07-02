import { fetchNoteById } from "../../../../lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
  searchParams?: Record<string, string>;
}

export default async function NoteModal({ params }: Props) {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", params.id],
      queryFn: () => fetchNoteById(Number(params.id)),
    });
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}
