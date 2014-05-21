function Ingredient(data) { 
    this.title = ko.observable(data.title);
    this.includeInRecipe = ko.observable(data.includeInRecipe);
}

function IngredientListViewModel() {
    // Data
    var self = this;
    self.ingredients = ko.observableArray([]);
    self.newIngredientText = ko.observable();
    self.incompleteTasks = ko.computed(function () {
        return ko.utils.arrayFilter(self.ingredients(), function (ingredient) {
            return !ingredient.includeInRecipe();
        });
    });

    // Operations
    self.addIngredient = function () {
        self.ingredients.push(new Ingredient({ 
            title: this.newIngredientText(),
            includeInRecipe: true
        }));
        self.newIngredientText("");
    };
    self.removeTask = function (ingredient) {
        self.ingredients.remove(ingredient);
    };

    self.getRecipes = function () {
        // Load initial state from server, convert it to Task instances, then populate self.tasks
        var newUrl = "http://food2fork.com/api/search?key=b49f1a7e472550dd4fa5d08d735db081&q=shredded%20chicken";
        var urlTest = "http://api.yummly.com/v1/api/recipes?_app_id=246a2dfe&_app_key=575d5e01b0e7c25ab538e27743dc15db&q=onion+soup&callback=?";
        var url = "http://api.yummly.com/v1/api/recipes?_app_id=246a2dfe&_app_key=575d5e01b0e7c25ab538e27743dc15db";
        if (self.ingredients().length > 0) {
            for (var i = 0; i < self.ingredients().length; i++) {
                url += "&allowedIngredient[]=" + self.ingredients()[i].title();
            }
            $.support.cors = true;
            $.getJSON(urlTest, {
                dataType: 'jsonp',
                xhrFields: {
                    withCredentials: true
                },
                success: function (json) {
                    // do stuff with json (in this case an array)
                    alert("Success");
                    alert(json);
                },
                error: function () {
                    alert("Error");
                }
            });


        } else {
            alert("Please enter at least one ingredient.");
        }
    };
}

function myCallback(jsonp) {
    alert("CALLBACK CALLED!");
}

ko.applyBindings(new IngredientListViewModel());
