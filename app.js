var createError = require('http-errors');

const express = require('express'),
            path = require('path'),
          http = require('http'),
          request = require('request'),
            bodyParser = require('body-parser'),
            cookieParser = require('cookie-parser'),
            logger = require('morgan'),
            recipesRouter = require('./routes/recipes');

var app = express();

let recipes = [];
let ingredients = [];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/recipes', recipesRouter)
//app.all('/recipes/*', apiAuth);

app.post('/recipes/:id', (req, res) => {
  const id = req.params.id;
  const newRecipe = req.body;

  for(let i = 0; i< recipes.length; i++) {
    let recipe = recipes[i];
    if(recipe.id == id ) {
      recipes[i] = newRecipe;
    }
  }
  res.send('Recipe is edited with id=' + id);
});

app.post('/recipes' ,(req, res) => {
  const recipe = req.body;
  console.log(recipe);
  recipes.push(recipe);

  ;

  request.post(
      'http://localhost:8080/save-recipe',
      { json: { key: recipe } },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
        }
      }
  );
});

app.get('/recipes', (req,res) => {
    res.json(recipes);
});


app.get('/recipes/:id', (req,res) => {
  const id = req.params.id;
  for(let recipe of recipes) {
     if(recipe.id == id) {
       res.json(recipe);
       return
     }
  }
  res.status(404).send("Recipe not found with id = " + id);
});

app.delete('/recipes/:id', (res,req) => {
  const id = req.params.id;
  recipes = recipes.filter(i => {
    if(i.id !== id) {
      return true;
    }
    return false;
  });

  res.send('Recipe with id =' + id + ' is deleted');

});






app.post('/ingredients/:id', (req, res) => {
  const id = req.params.id;
  const newIngredient = req.body;

  for(let i = 0; i< ingredients.length; i++) {
    let ingredient = ingredients[i];
    if(ingredient.id == id ) {
      ingredients[i] = newIngredient;
    }
  }
  res.send('Ingredient is edited with id=' + id);
});

app.post('/ingredients' ,(req, res) => {
  const ingredient = req.body;
  console.log(ingredient);
 let ingredientList = [];
 let recipe = (recipes && recipes.length > 0) ? recipes.get(ingredient.recipe_id) : [];

  for(let ingredient of ingredients) {
    if(ingredient.recipe_id == recipe.id ) {
       ingredientList.add(ingredient);
    }
  }
  recipe.ingredients = ingredientList;

  for(let recipe  of recipes) {
    if(recipe.id  == ingredientList[0].ingredients[0].recipe_id) {
        recipe.ingredients = ingredientList;
    }

  }
  //recipes.get(ingredient.recipe_id).update())
  res.send('Ingredient is added to db')
});

app.get('/ingredients', (req,res) => {
  res.json(ingredients);
});


app.get('/ingredients/:id', (req,res) => {
  const id = req.params.id;


  for(let ingredient of ingredients) {
    if(ingredient.id == id) {
      res.json(ingredient);
      return
    }
  }
  res.status(404).send("Ingredient not found with id = " + id);
});

app.delete('/ingredients/:id', (res,req) => {
  const id = req.params.id;
  ingredients = ingredients.filter(i => {
    if(i.id != id) {
      return true;
    }
    return false;
  });

  res.send('Ingredient with id =' + id + ' is deleted');

});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
