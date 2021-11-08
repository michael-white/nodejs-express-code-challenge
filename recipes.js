var express = require('express');
var router = express.Router();



var findRecipesById = function (id, callback) {
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


router.get('/recipes/:id', function (req,res,next) {
    var id = req.params.id;
    findRecipeById(id, function(error, user) {
        if (error) return next(error);
        return res.render('recipe', recipe);
    });
})


module.exports = router;
