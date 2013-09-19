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

			var person = new PersonModel();
			this.collection.add(person);

			var data = {
				name: this.input_name.val(),
				number: this.input_number.val(),
				username: this.input_username.val(),
				position: this.collection.length
			};
			var _contacts_list = this.contacts_list	
			person.save( data, {
				success: function(model, response){
					alert("saved");	
					console.log(response);
					var view = new PersonView({model: model});
					_contacts_list.append(view.render().el);
				},
				error: function(e){
					alert(e.message);	
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
		urlRoot: "http://localhost:9090/persons",
		model: PersonModel,
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
		remove: function(env) {
			
			var id = $(env.target).attr("id");
			var person = new PersonModel({id: id});
			person.destroy({ success: function(model, response){
				$(env.target).closest("tr").fadeOut();	
			}});
		},
		edit: function(){
			
		}
	});
	var contactApp = new App({collection: new PersonCollection() });

})(jQuery, Backbone, _)
