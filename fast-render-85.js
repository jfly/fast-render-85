People = new Meteor.Collection("people");

TestController = RouteController.extend({
  fastRender: true,
  waitOn: function() {
    return Meteor.subscribe("home");
  },
});

Router.map(function() {
  this.route('home', {
    path: '/',
    controller: 'TestController',
  });
});

if(Meteor.isClient) {
  Template.home.helpers({
    people: function() {
      return People.find();
    }
  });
}

if(Meteor.isServer) {
  Meteor.startup(function() {
    People.remove({});
    [ 'Calvin', 'Hobbes' ].forEach(function(name) {
      People.insert({ name: name });
    });
  });
  Meteor.publish("home", function() {
    return People.find({});
  });
}
