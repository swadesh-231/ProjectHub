import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, StickyNote } from "lucide-react";
import { useNotes, useDeleteNote } from "../../hooks/useNotes";
import { useProjectRole } from "../../hooks/useProjectRole";
import { Button } from "../common/Button";
import { Avatar } from "../common/Avatar";
import { Skeleton } from "../common/Skeleton";
import { EmptyState } from "../common/EmptyState";
import { ErrorState } from "../common/ErrorState";
import { ConfirmDialog } from "../common/ConfirmDialog";
import { NoteEditorModal } from "./NoteEditorModal";
import { fromNow } from "../../utils/format";
import { staggerContainer, fadeInUp } from "../../constants/motion";

export const NotesSection = ({ projectId }) => {
  const { data: notes, isLoading, isError, refetch } = useNotes(projectId);
  const { isAdmin } = useProjectRole(projectId);
  const deleteNote = useDeleteNote(projectId);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const openCreate = () => {
    setEditing(null);
    setEditorOpen(true);
  };
  const openEdit = (note) => {
    setEditing(note);
    setEditorOpen(true);
  };

  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          {notes?.length || 0} {notes?.length === 1 ? "note" : "notes"}
        </p>
        {isAdmin && (
          <Button size="sm" leftIcon={Plus} onClick={openCreate}>
            New note
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border-subtle bg-surface p-5"
            >
              <Skeleton className="h-3 w-full" />
              <Skeleton className="mt-2 h-3 w-4/5" />
              <Skeleton className="mt-4 h-6 w-28" />
            </div>
          ))}
        </div>
      ) : notes.length === 0 ? (
        <EmptyState
          icon={StickyNote}
          title="No notes yet"
          description={
            isAdmin
              ? "Capture decisions, context and updates for your team."
              : "Project admins can add notes for the team."
          }
          action={
            isAdmin && (
              <Button leftIcon={Plus} onClick={openCreate}>
                New note
              </Button>
            )
          }
        />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {notes.map((note) => (
            <motion.article
              key={note._id}
              variants={fadeInUp}
              className="group flex flex-col rounded-2xl border border-border-subtle bg-surface p-5 shadow-soft transition-shadow hover:shadow-card"
            >
              <p className="flex-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                {note.content}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-border-subtle pt-3.5">
                <div className="flex items-center gap-2">
                  <Avatar
                    name={note.createdBy?.fullName || note.createdBy?.username}
                    src={note.createdBy?.avatar?.url}
                    size="xs"
                  />
                  <span className="text-xs text-muted">
                    {note.createdBy?.username || "Unknown"} · {fromNow(note.createdAt)}
                  </span>
                </div>
                {isAdmin && (
                  <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => openEdit(note)}
                      className="grid h-7 w-7 place-items-center rounded-lg text-faint hover:bg-canvas hover:text-foreground"
                      aria-label="Edit note"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleting(note)}
                      className="grid h-7 w-7 place-items-center rounded-lg text-faint hover:bg-danger-soft hover:text-danger"
                      aria-label="Delete note"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}

      <NoteEditorModal
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        projectId={projectId}
        note={editing}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title="Delete note"
        confirmLabel="Delete"
        isLoading={deleteNote.isPending}
        onConfirm={() =>
          deleteNote.mutate(deleting._id, { onSuccess: () => setDeleting(null) })
        }
      />
    </div>
  );
};
