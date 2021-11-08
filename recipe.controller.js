var RecipeService = require('../services/recipe.service')

exports.getRecipes = async function (req, res, next) {

    if(isNaN(req.params.id))  {
        return res.status(400).json({ status: 400, message: "id is required and must be int" });
    }

    var page = req.params.page ? req.params.page : 1;
    var limit = req.params.limit ? req.params.limit : 10;
    var id = req.params.id ? req.params.id : null;
    try {
        var recipes = await RecipeService.getRecipes(id, page, );
        return res.status(200).json({ status: 200, data: recipes, message: "Succesfully Retrieved Recipes" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}