import Ember from 'ember';

export
default Ember.Route.extend({
    model: function() {
        return this.store.filter('todo', function(todo) {
            return !todo.get('isCompleted');
        });
    },

    // Normally transitioning into a new route changes the template rendered into the parent {{outlet}}, 
    // but in this case we'd like to reuse the existing todos/index template. 
    // We can accomplish this by implementing the renderTemplate method and calling render ourselves with the specific template and controller options.
    renderTemplate: function(controller) {
        this.render('todos/index', {
            controller: controller
        });
        // this.render creates a view, sets the template 'todos/index' on the view and the controller on the view as well.

        // var view = TodosActiveView.create({
        //      templateName: 'todos/index',
        //      controller: controller
        // });
    }
});