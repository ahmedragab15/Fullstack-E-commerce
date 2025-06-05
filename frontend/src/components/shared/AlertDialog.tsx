import { type ReactNode } from "react";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

interface AlertDialogProps {
  isOpen: boolean; 
  onOpenChange: (open: boolean) => void; 
  title?: string;
  description?: string;
  confirmText?: string;
  isLoading?: boolean;
  loadingText?: string;
  isSuccess?: boolean;
  confirmBG?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  triggerButton?: ReactNode;
}

const AlertDialog = ({ isOpen, onOpenChange, title = "Are you sure?", description = "This action cannot be undone.", confirmText = "Confirm", isLoading = false, loadingText = "Confirming...", isSuccess = false, confirmBG = "red.600", cancelText = "Cancel", onConfirm, onCancel, triggerButton }: AlertDialogProps) => {
  const handleClose = () => {
    onOpenChange(false);
    onCancel?.();
  };

  const handleConfirm = () => {
    onConfirm();
    if (isSuccess) onOpenChange(false);
  };

  return (
    <Dialog.Root lazyMount placement="center" open={isOpen} onOpenChange={(e) => onOpenChange(e.open)}>
      {triggerButton && <Dialog.Trigger asChild>{triggerButton}</Dialog.Trigger>}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>{description}</p>
            </Dialog.Body>
            <Dialog.Footer gap={2}>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={handleClose}>
                  {cancelText}
                </Button>
              </Dialog.ActionTrigger>
              <Button loading={isLoading} loadingText={loadingText} variant="solid" colorScheme="red" color={"white"} bg={confirmBG} onClick={handleConfirm}>
                {confirmText}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AlertDialog;
