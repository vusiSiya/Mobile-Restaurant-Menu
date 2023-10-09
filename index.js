const menuContainer = document.querySelector(".menu");
const ordersContainer = document.querySelector(".orders");
const modal = document.querySelector(".modal");
const form = document.querySelector("form");

const menuArray = [{
    id: 0,
    name: "Pizza",
    ingredients: ["pepperoni", "mushrom", "mozarella"],
    price: 14,
    emoji: "🍕"
}, {
    id: 1,
    name: "Hamburger",
    ingredients: ["beef", "cheese", "lettuce"],
    price: 12,
    emoji: "🍔",
}, {
    id: 2,
    name: "Beer",
    ingredients: ["grain, hops, yeast, water"],
    price: 12,
    emoji: "🍺",
}]

let orderedItems = [];
let itemsAreRemoved = false;
let showMessage;

render();

form.addEventListener("submit",(e)=>handleSubmit(e))

document.addEventListener("click", (e) =>{
    switch(e.target.className){
        case "add-btn":
            addToCart(e);
            break;
        case "remove":
            addToCart(e)
            break;
        case "orders-btn":
            displayElement(modal, true);
            break;
        case "close-modal-btn":
            displayElement(modal, false);
            break;
        default:
            break;
    }
    
})

function render() {
    
    menuContainer.innerHTML = menuArray.reduce((acc, item) => {
        return acc + (
            `<div class="menu-item" >
                <span>${item.emoji}</span>
                <div>
                    <h4>${item.name}</h4>
                     <p class="ingredients">${item.ingredients}</p>
                    <p><strong>R ${item.price}</strong></p>
                </div>
                <button type="button" id="${item.id}" class="add-btn">+</button>
            </div>`)
    }, "");
    
    if (orderedItems[0] || itemsAreRemoved) {

        let totalPrice = 0; 
        ordersContainer.innerHTML = (
           `<h4 class="orders-header">Your orders</h4>
            <div class="ordered-items">
                ${
                    orderedItems.reduce((acc, item) => {
                        totalPrice += item.price;
                        
                        return acc + (
                            `<div>
                                <div id="${item.id}">
                                    <p>${item.name}</p>
                                    <p class="remove">remove</p>
                                </div>
                                <p id="${item.id}"style="margin: auto 0 auto">R ${item.price}</p>
                            </div>`);
                        
                    },"") || ""
                }
            </div>
            <h4 class="total">
                Total price:
                <p class="total-price">R ${totalPrice}</p>
            </h4>
            <button type="button" class="orders-btn">Complete your orders</button>`
        );

        displayElement(ordersContainer, true);
    }
}
function addToCart(event) {
    const {id,className,parentElement} = event.target
    
    if(className === "add-btn"){
        orderedItems.push(menuArray[id])
    }
    else {
        let parentId = parseInt(parentElement.id)
        let matchingItems = orderedItems.filter(item => item.id === parentId)
        let itemsNotMatching = orderedItems.filter(item => item.id != parentId)

        let firstEl = matchingItems[0];
        matchingItems.pop(firstEl)
        
        let newArray = [...matchingItems, ...itemsNotMatching ];
        orderedItems = newArray;
        
        itemsAreRemoved = true;
    }
    
    render();
}
function displayElement(element, showElement) {
    element.style.display = showElement ? "grid" : "none"
}

function handleSubmit(event) { 
    
    let username = form["username"].value
    ordersContainer.innerHTML = (
        `<p class="order-complete-message">
            Thank you ${username},
             your order is on the way
         </p>`
    );
    
    form.reset();
    displayElement(modal, false);
    orderedItems =[];
    
    event.preventDefault();
}  
