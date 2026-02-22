/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import Modal from "./Modal";
import { Button } from "./ui/button";

export default function DeleteConfirmationModal({
  open,
  onClose,
  onDelete,
  loading,
  error,
}: {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  loading: boolean;
  error: any;
}) {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title={"Are you absolutely sure?"}
        description={"This action cannot be undone. This will permanently delete this ticket any associated data from our servers."}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <div className="flex gap-4">
          <div>
            <Button variant={"outline"} onClick={onClose}>
              Cancel
            </Button>
          </div>
          <div>
            <Button onClick={onDelete} variant={"destructive"}>{loading ? "Deleting..." : "Delete"}</Button>
          </div>
        </div>
        {error && <p className="text-red-500">{error.message}</p>}
      </Modal>
    </>
  );
}
