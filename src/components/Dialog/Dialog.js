import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'
import Modal  from 'react-modal'
import './Dialog.scss'
class Dialog extends Component {
    constructor(props, context) {
        super(props, context)
    }
    renderButtons(){
        const {isOpen,openModal,closeModal,handleSaveClicked} = this.props
        const buttonText = this.props.buttonText || '保存'
        const isRender = this.props.hideButton
        if(!isRender) {
            return (
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" onClick={closeModal}>取消</button>
                    <button type="button" className="btn btn-primary" onClick={handleSaveClicked}>{buttonText}</button>
                </div>
            )
        }
    }
    render() {
        const {isOpen,openModal,closeModal,handleSaveClicked} = this.props
        const {renderHTML} = this.props
        const buttonText = this.props.buttonText || '保存'
        const title = this.props.title || '提交'
        return (
            <div id="dialog" className="form-horizontal form-wizard">
                <Modal isOpen={isOpen}  onRequestClose={closeModal}  className="Modal__Bootstrap modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={closeModal}>
                                <span aria-hidden="true">&times;</span>
                                <span className="sr-only">Close</span>
                            </button>
                            <h4 className="modal-title">{title}</h4>
                        </div>
                        <div className="modal-body">
                            {renderHTML()}
                        </div>
                        {this.renderButtons()}
                    </div>
                </Modal>
            </div>
        )
    }
}

Dialog.propTypes = {
    comp: PropTypes.array,
    renderHTML: PropTypes.func,
    title: PropTypes.string,
    isOpen:PropTypes.bool,
    hideButton: PropTypes.bool
}

export default Dialog
