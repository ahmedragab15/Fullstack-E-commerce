import { Button, Dialog,  Portal, Stack, CloseButton } from "@chakra-ui/react";
import { type ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: ReactNode;
  title: string;
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

const Modal = ({  isOpen, onOpenChange, trigger, title, children,isLoading = false, loadingText = "Saving...", onConfirm, onCancel, confirmLabel = "Save", cancelLabel = "Cancel" }: IProps) => {

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => onOpenChange(e.open)}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body pb="4">
              <Stack gap="4">{children}</Stack>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onCancel}>
                  {cancelLabel}
                </Button>
              </Dialog.ActionTrigger>
              <Button loading={isLoading} loadingText={loadingText} onClick={onConfirm}>
                {confirmLabel}
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton position="absolute" right="2" top="2" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default Modal;
