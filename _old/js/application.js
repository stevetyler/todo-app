// Create new instance of Ember.Application as var Todos
window.Todos = Ember.Application.create();

// Add fixture data. Fixtures are a way to put sample data into an application before connecting the application to long-term persistence.
// Adapters are responsible for communicating with a source of data for your application. 
// Typically this will be a web service API, but in this case we are using an adapter designed to load fixture data:
//
// Todos.ApplicationAdapter = DS.FixtureAdapter.extend(); 

// Replace fixture data above with a localstorage-aware adapter instead for real persistence so todos remain between application modes.
Todos.ApplicationAdapter = DS.LSAdapter.extend({
    namespace: 'todos-emberjs'
});