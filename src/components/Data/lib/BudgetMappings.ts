import Bills from "./BudgetTypes/Bills";
import Clothing from "./BudgetTypes/Clothing";
import Education from "./BudgetTypes/Education";
import Entertainment from "./BudgetTypes/Entertainment";
import FoodDrinks from "./BudgetTypes/FoodDrinks";
import Groceries from "./BudgetTypes/Groceries";
import Housing from "./BudgetTypes/Housing";
import Pets from "./BudgetTypes/Pets";
import Transportation from "./BudgetTypes/Transportation";
import Travel from "./BudgetTypes/Travel";

const BudgetMappings = {
    'Bills': Bills,
    'Clothing': Clothing,
    'Education': Education,
    'Entertainment': Entertainment,
    'Food/Drinks': FoodDrinks, 
    'Groceries': Groceries,
    'Housing': Housing,
    'Pets': Pets,
    'Transportation': Transportation,
    'Travel': Travel,
};

export default BudgetMappings;