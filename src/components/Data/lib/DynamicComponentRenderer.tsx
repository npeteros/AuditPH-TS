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
import Undefined from "./BudgetTypes/Undefined"

type ComponentObject = {
    [key: string]: React.ComponentType<any>;
}

const BudgetMappings: ComponentObject = {
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
    'Undefined': Undefined
};

const DynamicComponentRenderer = ({ componentName }: { componentName: string | undefined }) => {
    const ComponentToRender = BudgetMappings[componentName ? componentName : ''] || null;

    return (
        <>
            {ComponentToRender && <ComponentToRender />}
        </>
    );
};

export default DynamicComponentRenderer;