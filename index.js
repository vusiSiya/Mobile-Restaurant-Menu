const menuContainer = document.querySelector(".menu");
const orderedItemsContainer = document.querySelector(".ordered-items");
const ordersContainer = document.querySelector(".orders");
const paymentModal = document.querySelector(".modal");

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
let orderdItems = [];
let itemsAreRemoved = false
render();

document.addEventListener("click", (e) =>{
    switch(e.target.className){
        case "add-btn":
            addToCart(e);
            break;
        case "orders-btn":
            completeOrder(e);
            break;
        case "remove":
            addToCart(e)
            break;
        default:
            break;
    }
    
})
function render() {

    const ordersMarkUp = menuArray.reduce((acc, item) => {
        return acc + (
            `<div class="menu-item" style="display:flex">
                <span>${item.emoji}</span>
                <div>
                    <h4>${item.name}</h4>
                     <p class="ingredients">${item.ingredients}</p>
                    <p><strong>R ${item.price}</strong></p>
                </div>
                <button type="button" id="${item.id}" class="add-btn" >+</button>
            </div>`
        );
    }, "");

    menuContainer.innerHTML = ordersMarkUp;
    
    if (orderdItems[0] || itemsAreRemoved) {
        ordersContainer.style.display = "grid"
        let totalPrice = 0
        orderedItemsContainer.innerHTML = orderdItems.reduce((acc, item) => {
            totalPrice += item.price;
            return acc + (
                `<div>
                    <div id="${item.id}">
                        <p>${item.name}</p>
                        <p class="remove">remove</p>
                    </div>
                    <p id="${item.id}"style="margin: auto 0 auto">R ${item.price}</p>
                </div>`
            )
        },"") || ""
        document.querySelector(".total-price").textContent = totalPrice;
    }
}
function addToCart(event) {
    const {id,className,parentElement} = event.target
    
    if(className === "add-btn"){
        orderdItems.push(menuArray[id])
    }
    else {
        let itemsNotRemoved = orderdItems.filter(item => item.id != parentElement.id);
        orderdItems = itemsNotRemoved;
        itemsAreRemoved = true;
    }

    render()   
}
function completeOrder(e) {
    paymentModal.style.display ="grid"
}
function handleSubmit(event) {
    event.preventDefault();
    let container = document.createElement("div");
    let paragraph = document.createElement("p");
    paragraph.classList.add("orders-delivery");
    paragraph.textContent = "Thank you, Your order is on its way";

    container.append(paragraph);
    ordersContainer.append(container);
}
