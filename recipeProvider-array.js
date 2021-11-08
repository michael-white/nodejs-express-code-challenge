var nextRecipeId = 1;

RecipeProvider = function() {
    this.recipes = [];

    this.fetchAllRecipes = function(cb) {
        cb(null, this.recipes);
    };

    this.fetchRecipeById = function(id, cb) {
        var foundRecipes= this.recipes.filter(function(recipe) {return recipe.id == id});

        if (foundRecipes.length == 0) {
            cb('Recipes not found', null);
        } else {
            cb(null, foundRecipes[0]);
        }
    };

    this.insertRecipe= function(recipe, cb) {
        recipe.id = nextRecipeId++;
        this.recipes.push(recipe);

        cb(null, recipe);
    };

    this.updateRecipe = function(recipe, cb) {
        this.fetchRecipeById(recipe.id, function(error, _recipe) {
            if (error) {
                cb(error, null);
            } else {
                _recipe.name = recipe.name;
                _recipe.city = recipe.city;
                _recipe.state = recipe.state;

                cb(null, _recipe);
            }
        });
    };

    this.deleteRecipe= function(id, cb) {
        this.recipes = this.recipes.filter(function(recipe) {return recipe.id != id});
        cb(null, {id:id});
    };
};

exports.RecipeProvider = RecipeProvider;