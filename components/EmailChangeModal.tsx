"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { SubmitButton } from "./SubmitButton";

interface CustomModalProps {
  action: (formData: FormData) => void;
  label: string;
  name: string;
  placeholder: string;
  htmlFor: string;
  type: string;
}

export default function CustomModal(props: CustomModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const action = props.action;
  const label = props.label;
  const name = props.name;
  const placeholder = props.placeholder;
  const htmlFor = props.htmlFor;
  const type = props.type;

  return (
    <>
      <Button className="bg-zinc-800 text-base" onPress={onOpen}>
        Change
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Change {name}
              </ModalHeader>
              <ModalBody>
                <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                  <label className="text-md" htmlFor={htmlFor}>
                    {label}
                  </label>
                  <input
                    type={type}
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name={name}
                    placeholder={placeholder}
                    required
                  />
                  <SubmitButton
                    formAction={action} // Pass the function dynamically
                    className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 hover:bg-orange-800 bg-orange-700"
                    pendingText="Changing..."
                  >
                    Change
                  </SubmitButton>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
