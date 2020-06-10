import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class Modal extends Component {

    componentDidMount() {
        const options = {
            // onOpenStart: () => {
            //   console.log("Open Start");
            // },
            // onOpenEnd: () => {
            //   console.log("Open End");
            // },
            // onCloseStart: () => {
            //   console.log("Close Start");
            // },
            // onCloseEnd: () => {
            //   console.log("Close End");
            // },
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
        };

        M.Modal.init(this.Modal, options);

        // let instance = M.Modal.getInstance(this.Modal);
        // instance.open();
        // instance.close();
        // instance.destroy();
    }

    render() {
        return (
        <div>
            <div
                className="waves-effect waves-light modal-trigger"
                data-target={this.props.pollId}
            >
                <i style={{color:"#222"}}
                    className="material-icons small polls-list__remove-button"
                >
                    delete
                </i>
            </div>

            <div 
                ref={Modal => {this.Modal = Modal}}
                id={this.props.pollId}
                className="modal"
            >

                <div className="modal-content" style={{
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"space-around",
                        alignItems:"center"
                    }}
                >
                    <h4 style={{textAlign:"center"}}>Удалить протокол?</h4>
                    <div>
                        <div style={{padding:"10px", display:"inline-block"}}>
                            <span className="modal-close waves-effect waves-red red btn"
                                onClick={() => this.props.removeHandler(this.props.pollId)}
                            >
                                Удалить
                            </span>
                        </div>
                        <span className="modal-close hovered blue btn">
                            Отмена
                        </span>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Modal;
