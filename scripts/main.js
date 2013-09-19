(function ($, BB, _) {

	$('#add_contact').tooltip();

	var App = Backbone.View.extend({
		el: "#contacts",
		events: {
			'click #add_contact': 'addPerson'
		},
		initialize: function () {
			this.input_name = $('#inputs input[name=fullname]');
			this.input_number = $('#inputs input[name=number]');
			this.input_username = $('#inputs input[name=username]');
			this.contacts_list = $('.table tbody');
		},
		addPerson: function (evt) {

			var person = new PersonModel({
				name: this.input_name.val(),
				number: this.input_number.val(),
				username: this.input_username.val(),
				position: ""
			});

			this.collection.add(person);
			person.set("position", this.collection.length);
			person.save({
				success: function(model, response){
					alert("saved");	
					console.log(response);
					var view = new PersonView({model: model});
					this.contacts_list.append(view.render().el);
				},
				error: function(){
					alert("error");	
				}
			});

		}
	});

	var PersonModel = Backbone.Model.extend({
		urlRoot: "http://localhost:9090/persons",
		defaults: {
			'name': '-',
			'number': '-',
			'username': '-'
		},
		initialize: function () {

		}
	});

	var PersonCollection = Backbone.Collection.extend({
		model: PersonModel,
		url: '/contacts',
		initialize: function () {

		}
	});

	var PersonView = Backbone.View.extend({
		tagName: 'tr',
		template: $('#contact_template').html(),
		events: {
			'click .delete' : 'remove',
			'click .edit' : 'edit'
		},
		initialize: function() {

		},
		render: function() {
			var compiledTemplate = _.template(this.template);
			this.$el.html(compiledTemplate(this.model.toJSON()))
			return this;
		},
		remove: function() {
			
		},
		edit: function(){

		}
	});

	var contactApp = new App({collection: new PersonCollection()});



})(jQuery, Backbone, _)
