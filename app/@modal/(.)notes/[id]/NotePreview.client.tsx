"use client";

import Modal from "../../../../components/Modal/Modal";
import NotePreview from "../../../../components/NotePreview/NotePreview";
import { useParams, useRouter } from "next/navigation";
import { useNote } from "../../../../lib/api";

export default function NotePreviewClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data } = useNote(+id);

  function handleClose() {
    router.back();
  }

  return (
    <Modal onClose={handleClose}>
      <NotePreview note={data} />
    </Modal>
  );
}
