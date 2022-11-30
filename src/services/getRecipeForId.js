const getRecipeForId = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const recipeId = await response.json();

  return recipeId;
};

export default getRecipeForId;
