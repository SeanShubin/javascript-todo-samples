define(['react'], function (React) {
    'use strict';
    return React.createClass({
        addButtonPressed: function (event) {
            var name = event.target.value;
            this.props.addTaskEvent(name);
        },
        render: function () {
            return <div>
                <input ref="taskNameField" type="text"/>
                <button ref="addTaskButton" onClick={this.addButtonPressed}>Add todo entry</button>
            </div>;
        }
    });
});
