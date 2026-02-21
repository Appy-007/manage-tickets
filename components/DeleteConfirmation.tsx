import Modal from "./Modal";
import { Button } from "./ui/button";

export default function DeleteConfirmationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
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
            <Button variant={"destructive"}>Delete</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
