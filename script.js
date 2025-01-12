const localStorageKey = '_no-stack-dub-sack_recipeBox';
const project_name = 'recipe-box';

class LocalStorageManager {
  set(obj) {
    let currentState = JSON.stringify(obj);
    localStorage.setItem('_no-stack-dub-sack_recipeBox', currentState);
  }
  get() {
    let currentState = localStorage.getItem('_no-stack-dub-sack_recipeBox');
    return JSON.parse(currentState);
  }}


const recipeIndex = [
{
  'recipe': 'Artichoke-Pasta', 'ingredients': ['2 tablespoons butter', '2 cloves garlic, minced', '1 cup heavy cream', '3/4 teaspoon salt', '1 teaspoon fresh-ground black pepper', '2 1/2 cups canned, drained artichoke hearts (two 14-ounce cans), rinsed and cut into halves or quarters', '3/4 pound fusilli', '1/2 cup grated Parmesan cheese', '2 tablespoons chopped chives, scallion tops, or parsley'], 'directions': ['In a medium saucepan, melt the butter over moderately low heat. Add the garlic and cook for 30 seconds. Stir in the cream, salt, pepper, and artichoke hearts. Cook until just heated through, about 3 minutes.', 'In a large pot of boiling, salted water, cook the fusilli until just done, about 13 minutes. Drain the pasta and toss with the cream sauce, Parmesan, and chives.'] },

{
  'recipe': "Garlic-Chicken", "ingredients": ["3 tablespoons butter", "1 teaspoon seasoning salt", "1 teaspoon onion powder ", "4 skinless, boneless chicken breast halves", "2 teaspoons garlic powder"], "directions": ["Melt butter in a large skillet over medium high heat.", "Add chicken and sprinkle with garlic powder, seasoning salt and onion powder.", "Saute about 10 to 15 minutes on each side, or until chicken is cooked through and juices run clear."] },

{
  "recipe": "Easy-Chocolate-Pie", "ingredients": ["1 (12 ounce) can evaporated milk", "1 (5.9 ounce) package chocolate instant pudding mix", "1 (6.5 ounce) can whipped cream", "1/2 cup miniature semi-sweet chocolate chips (optional)", "1 (9 inch) graham cracker pie crust", "Another can of whipped cream for garnish (optional)"], "directions": ["Pour milk into medium bowl. Add dry pudding mix; beat with wire whisk until well blended and mixture just begins to thicken. Stir in half of the chocolate chips.", "Add contents of whipped cream can; stir gently but quickly until well blended. Pour into crust; cover.", "Refrigerate 6 hours, or until set. Cut into 8 slices to serve. Garnish with additional whipped cream and remaining chocolate chips, if desired."] },

{
  'recipe': 'Lime-Chicken-Tacos', 'ingredients': ['1 1/2 pounds skinless, boneless chicken breast meat - cubed', '1/8 cup red wine vinegar', '1/2 lime, juiced', '1 teaspoon white sugar', '1/2 teaspoon salt', '1/2 teaspoon ground black pepper', '2 green onions, chopped', '2 cloves garlic, minced', '1 teaspoon dried oregano', '10 (6 inch) corn tortillas', '1 tomato, diced', '1/4 cup shredded lettuce', '1/4 cup shredded Monterey Jack cheese', '1/4 cup salsa'], 'directions': ['Saute chicken in a medium saucepan over medium high heat for about 20 minutes. Add vinegar, lime juice, sugar, salt, pepper, green onion, garlic and oregano. Simmer for an extra 10 minutes.', 'Heat an iron skillet over medium heat. Place a tortilla in the pan, warm, and turn over to heat the other side. Repeat with remaining tortillas. Serve lime chicken mixture in warm tortillas topped with tomato, lettuce, cheese and salsa.'] },

{
  'recipe': 'Artichoke-Dip', 'ingredients': ['1 8oz package soft cream cheese', '4oz mayonnaise', '4oz sour cream', '1/4 Cup Fresh Grated Parmesan Cheese', '1/4 Cup Fresh Grated Romano Cheese', '2 eggs', '3/4 Cup dairy sour cream', '1 16oz can artichoke hearts', '1/4 Cup fresh chopped chives', '1 tbs fresh minced garlic'], 'directions': ['Soften the cream cheese before mixing.', 'Rinse well, then dice the artichokes into small ½” size pieces.', 'Into a mixing bowl place the softened cream cheese. Mix in the mayonnaise, sour cream, the Parmesan and Romano cheese, artichokes and garlic.', 'When the mixture is fairly well blended, spoon into a 9” round glass pie dish.', 'Set Oven to Bake at 350 degrees.', 'Place un-covered dish into oven for 20 – 25 minutes until the edges appear slightly golden and mixture is bubbling at the edge.', 'Remove and sprinkle chopped chives on top and let cool about 5 minutes before serving.', 'Enjoy!'] }];



const LSM = new LocalStorageManager();
if (LSM.get('_no-stack-dub-sack_recipeBox') === null) {
  LSM.set([recipeIndex[0], recipeIndex[1], recipeIndex[2], recipeIndex[3], recipeIndex[4]]);
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showDialog: false,
      recipes: LSM.get('_no-stack-dub-sack_recipeBox'),
      dialogType: '' };

    this.getRecipeList = this.getRecipeList.bind(this);
    this.showOnClick = this.showOnClick.bind(this);
    this.showRecipe = this.showRecipe.bind(this);
    this.defineDialogType = this.defineDialogType.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.populateFormData = this.populateFormData.bind(this);
    this.toggleDialogDisplay = this.toggleDialogDisplay.bind(this);
  }
  componentDidMount() {
    let recipes = LSM.get('_no-stack-dub-sack_recipeBox');
    let recipe = recipes[0].recipe.toLowerCase();
    this.setState({
      currentRecipe: recipe });

  }
  getRecipeList() {
    let allRecipes = [];
    let recipes = LSM.get('_no-stack-dub-sack_recipeBox');
    recipes.map(recipe => {
      allRecipes.push(recipe.recipe.toLowerCase());
    });
    return allRecipes;
  }
  showOnClick(e) {
    let currentRecipe = e.target.innerText;
    currentRecipe = currentRecipe.toLowerCase().split(' ').join('-');
    this.showRecipe(currentRecipe);
  }
  showRecipe(recipe) {
    this.setState({
      currentRecipe: recipe });

  }
  defineDialogType(e) {
    if (this.state.dialogType === 'Add Recipe') {
      this.addRecipe();
    } else {
      this.editRecipe();
    }
  }
  addRecipe() {
    let dialogIDs = this.state.dialogType === 'Add Recipe' ?
    ['add-recipe-name', 'add-ingredients', 'add-directions'] :
    ['edit-recipe-name', 'edit-ingredients', 'edit-directions'];
    let recipeName = document.getElementById(dialogIDs[0]).value.replace(/\s+/g, '-');
    if (recipeName.endsWith('-')) recipeName = recipeName.slice(0, -1);
    let newRecipe = {
      'recipe': recipeName,
      'ingredients': document.getElementById(dialogIDs[1]).value.split('\\'),
      'directions': document.getElementById(dialogIDs[2]).value.split('\\') };

    let recipes = LSM.get('_no-stack-dub-sack_recipeBox');
    let recipeList = this.getRecipeList();
    if (newRecipe.recipe === '') {
      alert('Your recipe must have a name!');
    } else if (recipeList.indexOf(recipeName.toLowerCase()) !== -1) {
      recipeName = recipeName.replace('-', ' ');
      alert(`${recipeName} has already been added to the Recipe Box!`);
    } else {
      recipes.push(newRecipe);
      LSM.set(recipes);
      setTimeout(() => {
        this.showRecipe(newRecipe.recipe.toLowerCase());
      }, 10);
      this.setState({
        recipes: recipes,
        showDialog: !this.state.showDialog });

    }
  }
  editRecipe() {
    let recipes = LSM.get('_no-stack-dub-sack_recipeBox');
    recipes = recipes.filter(obj => {
      return obj.recipe.toLowerCase() !== this.state.editThis;
    });
    LSM.set(recipes);
    this.addRecipe();
  }
  deleteRecipe(e) {
    if (confirm('Are you sure you want to delete "' + e.currentTarget.value.replace('-', ' ') + '" from the Recipe Box?')) {
      // handle tab focus after delete
      let tabToFocus;
      let recipeList = this.getRecipeList();
      recipeList.indexOf(e.currentTarget.value.toLowerCase()) >= 1 ?
      tabToFocus = recipeList[recipeList.indexOf(e.currentTarget.value.toLowerCase()) - 1] :
      tabToFocus = recipeList[1];
      this.showRecipe(tabToFocus);
      // delete recipe
      let recipes = LSM.get('_no-stack-dub-sack_recipeBox');
      recipes = recipes.filter(obj => {
        return obj.recipe !== e.currentTarget.value;
      });
      // reset storage & state
      LSM.set(recipes);
      this.setState({
        recipes: recipes });

    }
  }
  populateFormData(str) {
    // if dialog is being closed, or opened by add button, do nothing
    if (str === '') return;else
    {
      // if dialog is being opened to edit, find the correct recipe
      let recipe;
      for (let i = 0; i < this.state.recipes.length; i++) {
        if (this.state.recipes[i].recipe === str) {
          recipe = this.state.recipes[i];
        }
      }
      // wait for dialog to open, then populate data
      setTimeout(() => {
        document.getElementById('edit-recipe-name').value = recipe.recipe.replace(/-/g, ' ');
        document.getElementById('edit-ingredients').value = recipe.ingredients.join(' \\ ');
        document.getElementById('edit-directions').value = recipe.directions.join(' \\\n\n');
        this.setState({ editThis: recipe.recipe.toLowerCase() });
      }, 10);
    }
  }
  toggleDialogDisplay(e) {
    let indicator = e.currentTarget.title !== undefined ? e.currentTarget.title : '';
    this.setState({
      dialogType: indicator,
      showDialog: !this.state.showDialog });

    let val = e.currentTarget.value === undefined ? '' : e.currentTarget.value;
    this.populateFormData(val);
  }
  render() {
    let dialogText = this.state.dialogType === 'Add Recipe' ?
    ['Add a Recipe', 'Add'] : ['Edit Recipe', 'Save'];
    let dialogIDs = this.state.dialogType === 'Add Recipe' ?
    ['add-recipe-name', 'add-ingredients', 'add-directions', 'add-submit', 'add-close'] :
    ['edit-recipe-name', 'edit-ingredients', 'edit-directions', 'edit-submit', 'edit-close'];
    let dialogBox;
    if (this.state.showDialog) {
      dialogBox = /*#__PURE__*/
      React.createElement("div", { className: "dialog-box dialog-wrap" }, /*#__PURE__*/
      React.createElement(Dialog, {
        dialogType: dialogText[0],
        buttonType: dialogText[1],
        nameID: dialogIDs[0],
        ingredientsID: dialogIDs[1],
        directionsID: dialogIDs[2],
        submitID: dialogIDs[3],
        closeID: dialogIDs[4],
        handleSubmit: this.defineDialogType,
        handleClose: this.toggleDialogDisplay }));


    }
    return /*#__PURE__*/(
      React.createElement("div", { className: "recipe-box-wrapper" }, /*#__PURE__*/
      React.createElement("div", { className: "heading" }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-free-code-camp" }), /*#__PURE__*/React.createElement("div", null, "Recipe Box")),

      dialogBox, /*#__PURE__*/
      React.createElement(IndexView, {
        handleClick: this.showOnClick,
        contents: this.state.recipes }), /*#__PURE__*/
      React.createElement(RecipePane, {
        contents: this.state.recipes,
        displayRecipe: this.state.currentRecipe,
        handleDelete: this.deleteRecipe,
        handleEdit: this.toggleDialogDisplay }), /*#__PURE__*/
      React.createElement("div", { className: "add-button" }, /*#__PURE__*/
      React.createElement("button", {
        id: "add-recipe",
        title: "Add Recipe",
        onClick: this.toggleDialogDisplay }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-plus-square-o" })))));




  }}
;

class Dialog extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "dialog-box" }, /*#__PURE__*/
      React.createElement("h2", null, this.props.dialogType), /*#__PURE__*/
      React.createElement("div", { className: "input-title" }, "Recipe"), /*#__PURE__*/


      React.createElement("textarea", { rows: "1", id: this.props.nameID,
        placeholder: "Recipe Name" }), /*#__PURE__*/
      React.createElement("div", { className: "input-title" }, "Ingredients"), /*#__PURE__*/


      React.createElement("textarea", { id: this.props.ingredientsID, placeholder:
        'Separate each ingredient with a "\\": \n\nMilk ' +
        '\\ 2 Eggs \\ 1/3 Cup Sugar' }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/
      React.createElement("div", { className: "input-title" }, "Directions"), /*#__PURE__*/


      React.createElement("textarea", { id: this.props.directionsID, placeholder:
        'Separate each step with a "\\": \n\nPreheat oven to 350°F ' +
        '\\ \nCombine ingredients in pie crust \\ \nBake until crust ' +
        'is golden brown. \\' }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/
      React.createElement("button", {
        onClick: this.props.handleClose,
        className: "corner-close" }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-times" })), /*#__PURE__*/

      React.createElement("button", {
        id: this.props.submitID,
        onClick: this.props.handleSubmit },
      this.props.buttonType), /*#__PURE__*/

      React.createElement("button", {
        id: this.props.closeID,
        onClick: this.props.handleClose }, "Close")));




  }}


class IndexView extends React.Component {
  render() {
    let recipes = this.props.contents;
    let items = recipes.map((recipe, i) => /*#__PURE__*/
    React.createElement("div", {
      onClick: this.props.handleClick,
      key: i, id: i, className: "index-view-item", id: 'view-' + recipe.recipe.toLowerCase() },
    recipe.recipe.replace(/-/g, ' ')));



    return /*#__PURE__*/(
      React.createElement("div", { id: "index-view" },
      items));


  }}


class RecipePane extends React.Component {
  render() {
    let recipes = this.props.contents;
    let displayRecipe;
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].recipe.toLowerCase() === this.props.displayRecipe) {
        displayRecipe = /*#__PURE__*/
        React.createElement("div", { id: recipes[i].recipe.toLowerCase(), className: "recipe-view" }, /*#__PURE__*/
        React.createElement("div", { className: "recipe-title" }, /*#__PURE__*/
        React.createElement("div", { className: "recipe-view-name title-row" },
        recipes[i].recipe.replace(/-/g, ' ')), /*#__PURE__*/

        React.createElement("div", { className: "title-row" }, /*#__PURE__*/
        React.createElement("button", {
          id: 'delete-' + recipes[i].recipe.toLowerCase(),
          onClick: this.props.handleDelete,
          title: "Delete Recipe",
          value: recipes[i].recipe }, /*#__PURE__*/
        React.createElement("i", { className: "fa fa-trash" })), /*#__PURE__*/

        React.createElement("button", {
          id: 'edit-' + recipes[i].recipe.toLowerCase(),
          onClick: this.props.handleEdit,
          title: "Edit Recipe",
          value: recipes[i].recipe }, /*#__PURE__*/
        React.createElement("i", { className: "fa fa-pencil-square-o" })))), /*#__PURE__*/



        React.createElement("div", { className: "recipe-body" }, /*#__PURE__*/
        React.createElement("h4", null, "Ingredients:"), /*#__PURE__*/
        React.createElement("ul", { className: "ingredient list" },
        recipes[i].ingredients.map((ingredient, j) => /*#__PURE__*/
        React.createElement("li", { key: j }, ingredient))), /*#__PURE__*/

        React.createElement("h4", null, "Directions:"), /*#__PURE__*/
        React.createElement("ol", { className: "directions list" },
        recipes[i].directions.map((step, k) => /*#__PURE__*/
        React.createElement("li", { key: k }, step)))));




      }
    }
    return /*#__PURE__*/(
      React.createElement("div", null,
      displayRecipe));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));