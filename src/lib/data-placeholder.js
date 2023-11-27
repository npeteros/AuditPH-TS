const budget_types = [
    { 
        id: 1, 
        typeName: "Bills", 
        color: "#0052CC" 
    },
    { 
        id: 2, 
        typeName: "Clothing", 
        color: "#002855" 
    },
    { 
        id: 3, 
        typeName: "Education", 
        color: "#00AADD" 
    },
    { 
        id: 4, 
        typeName: "Entertainment", 
        color: "#91C9F6" 
    },
    { 
        id: 5, 
        typeName: "Food/Drinks", 
        color: "#006B37" 
    },
    { 
        id: 6, 
        typeName: "Groceries", 
        color: "#00974C" 
    },
    { 
        id: 7, 
        typeName: "Housing", 
        color: "#FF5733" 
    },
    { 
        id: 8, 
        typeName: "Pets", 
        color: "#333333" 
    },
    { 
        id: 9, 
        typeName: "Transportation", 
        color: "#666666" 
    },
    { 
        id: 10, 
        typeName: "Travel", 
        color: "#CCCCCC"
    }
];

const budgets = [
    {
        id: '1',
        user_id: '1',
        budget_type_id: 5,
        budget_total: 12000.00,
        budget_current: 10000.00
    },
    {
        id: '2',
        user_id: '3',
        budget_type_id: 7,
        budget_total: 15000.00,
        budget_current: 5000.00
    },
    {
        id: '3',
        user_id: '3',
        budget_type_id: 4,
        budget_total: 25000.00,
        budget_current: 0.00
    }
]

const goals = [
    
]

module.exports = {
    budget_types,
    budgets
};