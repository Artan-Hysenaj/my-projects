import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
const CostumModal = (props) => {
  return (
    <Modal size="" isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>{props.title}</ModalHeader>
      <ModalBody>{props.body}</ModalBody>
      <ModalFooter>{props.children}</ModalFooter>
    </Modal>
  );
};

export default CostumModal;
