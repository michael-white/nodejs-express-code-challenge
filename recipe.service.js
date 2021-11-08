var Recipe = require('../models/recipe.model')


var getRecipes = function (id, page, limit, callback) {
    // Perform database query that calls callback when it's done
    // This is our fake database!
    if (!recipes[id])
        return callback(new Error(
            'No recipe matching '
            + id
            )
        );
    return callback(null, recipes[id]);
};