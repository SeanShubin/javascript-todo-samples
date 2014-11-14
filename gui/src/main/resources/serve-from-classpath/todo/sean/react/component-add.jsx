define(['react'], function (React) {
    'use strict';
    return React.createClass({
        addButtonPressed: function () {
            this.props.addTaskEvent(this.state.taskName);
        },
        getInitialState: function () {
            return {taskName: ''};
        },
        textUpdated: function (event) {
            this.setState({taskName: event.target.value});
        },
        render: function () {
            return <div>
                <input ref="taskNameField" value={this.state.taskName} type="text" onChange={this.textUpdated}/>
                <button ref="addTaskButton" onClick={this.addButtonPressed}>Add todo entry</button>
            </div>;
        }
    });
});
