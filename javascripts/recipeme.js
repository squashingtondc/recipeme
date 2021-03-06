function Ingredient(data) {
    this.title = ko.observable(data.title);
    this.includeInRecipe = ko.observable(data.includeInRecipe);
}

function Recipe(data) {
    this.title = ko.observable(data.title);
    this.recipeIngredients = ko.observableArray(data.recipeIngredients);
}

function IngredientListViewModel() {
    // Data
    var self = this;
    self.ingredients = ko.observableArray([]);
    self.newIngredientText = ko.observable();
    self.recipes = ko.observableArray([]);
    self.allRecipeIngredients = ko.observableArray([]);

    // Operations
    self.addIngredient = function () {
        self.ingredients.push(new Ingredient({
            title: this.newIngredientText(),
            includeInRecipe: true
        }));
        self.newIngredientText("");
    };
    self.removeIngredient = function (ingredient) {
        self.ingredients.remove(ingredient);
    };
    
    self.clearAll = function () {
        self.ingredients.removeAll();
        self.recipes.removeAll();
        self.allRecipeIngredients.removeAll();
    };


    self.getRecipes = function () {
        // Currently not working due to issues with CORS
        // Build the URL for Yummly
        var appId = '246a2dfe';
        var appKey = '575d5e01b0e7c25ab538e27743dc15db';
        var url = 'https://cors-anywhere.herokuapp.com/http://api.yummly.com/v1/api/recipes?callback=?_app_id=' + appId + '&_app_key=' + appKey;

        //Food2Fork Test URL
        //var f2fURL = "http://food2fork.com/api/search?key=b49f1a7e472550dd4fa5d08d735db081&q=shredded%20chicken";

        //Test URL
        var urlTest = "http://api.yummly.com/v1/api/recipes?callback=?_app_id=246a2dfe&_app_key=575d5e01b0e7c25ab538e27743dc15db&q=onion+soup";

        if (self.ingredients().length > 0) {
            for (var i = 0; i < self.ingredients().length; i++) {
                url += "&allowedIngredient[]=" + self.ingredients()[i].title();
            }
            $.support.cors = true;

            $.getJSON(urlTest, {
                dataType: 'jsonp',
                jsonpCallback: 'myCallback',
                xhrFields: {
                    withCredentials: true
                },
                success: function (data, textStatus, jqXHR) {
                    // create the Recipe view
                    alert("Success");
                    alert(data);
                },
                error: function () {
                    alert("Error");
                }
            });


        } else {
            alert("Please enter at least one ingredient.");
        }
    };

    self.mockUpRecipes = function () {
        self.recipes.removeAll();
        self.allRecipeIngredients.removeAll();
        self.recipes.push(new Recipe({
            title: "Mac & Cheese",
            recipeIngredients: [
                "pasta", "cheese", "milk"]
        }));
        self.allRecipeIngredients.push("pasta");
        self.allRecipeIngredients.push("cheese");
        self.allRecipeIngredients.push("milk");
        self.recipes.push(new Recipe({
            title: "Pasta Con Queso",
            recipeIngredients: [
                "pasta", "queso", "leche"]
        }));
        self.allRecipeIngredients.push("pasta");
        self.allRecipeIngredients.push("queso");
        self.allRecipeIngredients.push("leche");
    };
}

function myCallback(jsonp) {
    alert("CALLBACK CALLED!");
}

ko.applyBindings(new IngredientListViewModel());
