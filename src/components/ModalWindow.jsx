import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            message: props.message
        };
    }

    render() {
        const { className, headerClassName } = this.props;
        const { modal } = this.state;
        const backdrop = this.props.backdrop ? this.props.backdrop : true;
        return (
            <Modal isOpen={true} toggle={this.toggleModal} className={className} backdrop={true} size="md my-10">
                <ModalHeader 
                className={headerClassName} style={{ justifyContent: 'center' }}>{this.props.title}  
                </ModalHeader>
                <ModalBody>{this.props.children}</ModalBody>
            </Modal>
        );
    }

    toggleModal = () => {
        this.setState((prevState) => ({ modal: !prevState.modal }));
        this.props.toggleModal();
    }
}

export default ModalWindow;