// Add behaviour that immediately focuses the <input> when it appears, accepts user input and, 
// when the user presses the <enter> key or moves focus away from the editing <input> element, 
// persists these changes, then redisplays the todo with its newly updated text.

// To accomplish this, we'll create a new custom component and register it with Handlebars to make it available to our templates.
Todos.EditTodoView = Ember.TextField.extend({
    didInsertElement: function() {
        this.$().focus();
    }
});

Ember.Handlebars.helper('edit-todo', Todos.EditTodoView);