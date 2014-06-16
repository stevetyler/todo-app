// Implement the controller for each todo by matching the name used as the itemController value to a class in your application Todos.TodoController.
import Ember from 'ember';

export
default Ember.ObjectController.extend({

    actions: {

        // This method will delete the todo locally and then persist this data change.
        // Because the todo is no longer part of all todos, its <li> element in the page will be automatically removed for us. 
        // If the deleted todo was incomplete, the count of remaining todos will be decreased by one 
        // and the display of this number will be automatically re-rendered. 
        // If the new count results in an inflection change between "item" and "items" this area of the page will be automatically re-rendered.
        removeTodo: function() {
            var todo = this.get('model');
            todo.deleteRecord();
            todo.save();
        },

        editTodo: function() {
            this.set('isEditing', true);
        },

        acceptChanges: function() {
            this.set('isEditing', false);
            if (Ember.isEmpty(this.get('model.title'))) {
                this.send('removeTodo');
            } else {
                this.get('model').save();
            }
        }
    },

    // Define an initial isEditing value of false for controllers of this type and when the editTodo action is called 
    // it should set the isEditing property of this controller to true. 
    // This will automatically trigger the sections of template that use isEditing to update their rendered content.
    IsEditing: false,

    // When called from the template to display the current isCompleted state of the todo, 
    // this property will proxy that question to its underlying model. 
    // When called with a value because a user has toggled the checkbox in the template, 
    // this property will set the isCompleted property of its model to the passed value (true or false), 
    // persist the model update, and return the passed value so the checkbox will display correctly.
    isCompleted: function(key, value) {
        var model = this.get('model');

        if (value === undefined) {
            // property being used as a getter
            return model.get('isCompleted');
        } else {
            // property being used as a setter
            model.set('isCompleted', value);
            model.save();
            return value;
        }
    }.property('model.isCompleted')
});