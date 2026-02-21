/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentProps } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface ModalProps extends ComponentProps<typeof DialogContent> {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string; // Made optional since you have a default value
  children?: React.ReactNode;
}

export default function Modal({
  open,
  onClose,
  title,
  description="",
  children,
  ...props
}: ModalProps) {
  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent {...props}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
            {children}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
