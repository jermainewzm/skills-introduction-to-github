const Item = require('../models/item-model');

// GET / : Display the main shop page and the current cart
exports.homeGet = async (req, res) => {
    // ### PART A ###
    // Retrieve the Items from DB
    // Retrieve the cart from the session
    // Pass the items and cart to the shop template for display
    try {
        const items = await Item.find()
        const cart = req.session.cart

        res.render("shop", {items,cart})

    } catch(err) {
        console.err("Error:", err)
    }
}

// POST /add-to-cart : Process adding items to the cart
exports.addToCart =  async (req, res) => {
    // ### PART B ###
    // Initialize cart if it doesn't exist
    // Fetch all available items from the database to get their correct prices.
    // Create cart items from the submitted form data
    // Add cart items to the session
    try {
    if (!req.session.cart) {
      req.session.cart = [];
    }
    
    for (let item in req.body){
        let number = Number(req.body[item])
        if (number > 0) {
            const dbItem = await Item.findOne({name:item})
            const newObj = {name: dbItem.name,
                            price: dbItem.price,
                            quantity: number
            }
            req.session.cart.push(newObj)
        }
    }
    const items = await Item.find()
    res.render("shop", {cart: req.session.cart,items})
} catch(err) {
    console.error("Error", err)
}

}

// POST /clear-cart : Clear all items from the cart
exports.clearCart =   (req, res) => {
    // ### PART C ###
    // Destroy the session cart
    delete req.session.cart
    res.redirect('/');
}

