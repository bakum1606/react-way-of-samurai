import React from 'react'


export default class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
         this.setState({
             editMode: true
         });

    }
    deactivateEditMode = () => {
         this.setState({
             editMode: false
         });
         debugger
         this.props.updateStatus(this.state.status)

    }
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })

    }


    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                <span onDoubleClick={this.activateEditMode}>
                    {this.props.status}
                </span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input type="text" onChange={this.onStatusChange} autoFocus onBlur={this.deactivateEditMode} value={this.state.status}/>
                </div>
                }
            </div>
        )
    }
}