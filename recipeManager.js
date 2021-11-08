RecipeManager = function(app) {
    var RecipeProvider = require('./recipeProvider-array').RecipeProvider;
    var recipeProvider = new RecipeProvider();

    recipeProvider.insertRecipe({_id:1, name:'Rocky', city:'Omaha', state:'NE'}, function(a,b){});
    recipeProvider.insertRecipe({_id:2, name:'Dave', city:'Stafford', state:'VA'}, function(a,b){});

    app.get('/recipes', function(req, res) {
        recipeProvider.fetchAllRecipes(function(error, recipes) {
            res.send(recipes);
        });
    });

    app.post('/recipes', function(req, res) {
        recipeProvider.insertRecipe(req.body, function(error, recipe) {
            if (error) {
                res.send(error, 500);
            } else {
                res.send(recipe);
            }
        });
    });

    app.get('/recipes/:id', function(req, res) {
        recipeProvider.fetchRecipeById(req.params.id, function(error, recipe) {
            if (recipe == null) {
                res.send(error, 404);
            } else {
                res.send(recipe);
            }
        });
    });

    app.post('/recipes/:id', function(req, res) {
        var _recipe = req.body;
        _recipe.id = req.params.id;

        recipeProvider.updateRecipe(_recipe, function(error, recipe) {
            if (recipe == null) {
                res.send(error, 404);
            } else {
                res.send(recipe);
            }
        });
    });

    app.delete('/recipes/:id', function(req, res) {
        recipeProvider.deleteRecipe(req.params.id, function(error, recipe) {
            if (recipe == null) {
                res.send(error, 404);
            } else {
                res.send(recipe);
            }
        });
    });
};

exports.RecipeManager = RecipeManager;