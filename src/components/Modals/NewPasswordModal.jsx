import React from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";

export const NewPasswordModal = ({title, newPassword, ...props }) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Password: {newPassword}</Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-primary me-2"
          onClick={() => {
            navigator.clipboard.writeText(newPassword);
            toast.success("copied.");
          }}
        >
          copy
        </Button>
        <Button
          variant="secondary"
          className="btn btn-primary me-2"
          onClick={() => props.onHide()}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
