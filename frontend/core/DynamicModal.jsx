import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";

export default function DynamicModal({
  isOpen,
  onClose,
  children,
  heading = "",
  width="full",
  height="[500px]"
}) {
  return (
    <>
      <Modal
      className={`w-${width} h-${height}`}
        isOpen={isOpen}
        onOpenChange={onClose}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent  >
          <>
            <ModalHeader className="flex flex-col gap-1">{heading}</ModalHeader>
            <ModalBody  >{children}</ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
