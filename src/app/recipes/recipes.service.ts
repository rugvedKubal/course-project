import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipesService {
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe( "Ukdi che Modak", 
    //                 "Delecious Steamed modak - healthy sweet dish",
    //                 "https://www.blendwithspices.com/wp-content/uploads/2014/08/ravamodak-2.jpg",
    //                 [
    //                     new Ingredient("coconut", 10),
    //                     new Ingredient("rawa", 2)
    //                 ]),
    //     new Recipe( "Matar Karanji",
    //                 "Delecious snack made from green peas",
    //                 "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/madhulia/Matar_Karanji_Spicy_Maharashtrian_deep_fried_snack.jpg",
    //                 [
    //                    new Ingredient("Matar", 20),
    //                    new Ingredient("Wheat", 5)
    //                 ])    
    // ];

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}