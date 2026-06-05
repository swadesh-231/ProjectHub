import { Modal } from "./Modal";
import { Button } from "./Button";

export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  isLoading = false,
  destructive = true,
}) => (
  <Modal
    open={open}
    onClose={onClose}
    title={title}
    description={description}
    size="sm"
    footer={
      <>
        <Button variant="secondary" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant={destructive ? "danger" : "primary"}
          size="sm"
          isLoading={isLoading}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </>
    }
  >
    <p className="text-sm text-muted">
      Please confirm you want to continue.
    </p>
  </Modal>
);
