const budget_types = [
    { 
        id: 1, 
        name: "Bills", 
        color: "#0052CC" 
    },
    { 
        id: 1, 
        name: "Clothing", 
        color: "#002855" 
    },
    { 
        id: 3, 
        name: "Education", 
        color: "#00AADD" 
    },
    { 
        id: 4, 
        name: "Entertainment", 
        color: "#91C9F6" 
    },
    { 
        id: 5, 
        name: "Food/Drinks", 
        color: "#006B37" 
    },
    { 
        id: 6, 
        name: "Groceries", 
        color: "#00974C" 
    },
    { 
        id: 7, 
        name: "Housing", 
        color: "#FF5733" 
    },
    { 
        id: 8, 
        name: "Pets", 
        color: "#333333" 
    },
    { 
        id: 9, 
        name: "Transportation", 
        color: "#666666" 
    },
    { 
        id: 10, 
        name: "Travel", 
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