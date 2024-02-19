const menuContainer = document.querySelector(".menu");
const ordersContainer = document.querySelector(".orders");
const modal = document.querySelector(".modal");
const form = document.querySelector("form");

const menuArray = [
	{
		id: 0,
		name: "Pizza",
		ingredients: ["pepperoni", "mushrom", "mozarella"],
		price: 14,
		count:0,
		emoji: "🍕"
	}, {
		id: 1,
		name: "Hamburger",
		ingredients: ["beef", "cheese", "lettuce"],
		price: 12,
		count:0,
		emoji: "🍔",
	}, {
		id: 2,
		name: "Kota",
		ingredients: ["bread", "russian", "potato chips", "atchar",],
		price: 12,
		count:0,
		emoji: "🥪",
	}
];

const getBoughtItems = ()=>menuArray.filter(item=>item.count);
const getTotalPrice = ()=>getBoughtItems().reduce((sum,item)=>(sum + item.count * item.price),0);

const increaseItemCount = (id)=>{
	menuArray.find(item=> item.id === id).count += 1;
	render();
}
const decreaseItemCount = (id)=>{
	menuArray.find(item=> item.id === id).count -= 1;
	render();
}

const removeItem = (id)=>{
	menuArray.find(item=> item.id === id).count = 0;
	render();
}
form.addEventListener("submit",(e)=>handleSubmit(e));

render();

function render() {
	
	menuContainer.innerHTML = menuArray.map(item => {
		return (
			`<div class="menu-item" >
				<span>${item.emoji}</span>
				<div>
					<h4>${item.name}</h4>
					 <p class="ingredients">${item.ingredients}</p>
					<p><strong>R ${item.price}</strong></p>
				</div>
				<button type="button" id="${item.id}" class="add-btn" onclick="increaseItemCount(Number(event.target.id))">+</button>
			</div>`)
	}).join("");

	const totalPrice = getTotalPrice() || 0;
	
	ordersContainer.innerHTML = (
		`<h2 class="orders-header">Your orders</h2>
		<div class="ordered-items">
			${
				getBoughtItems().map(item =>(
					`<div id="${item.id}">
						<div id="${item.id}">
							<h3>${item.name} </h3>
							<p style="color:red">${" x" + item.count}</p>
							<h4 
								class="remove"
								id="${item.id}"
								onclick="removeItem(Number(event.target.id))"
							>
								remove
							</h4>
						</div>
						<button
							type="button"
							id="${item.id}"
							class="add-btn"
							style="font-size: medium;font-weight: bold;"
							onclick="decreaseItemCount(Number(event.target.id))">-</button
						>
						<h3 id="${item.id}" style="margin: auto 0 auto">
							R ${item.price * (item.count || 1)}
						</h3>
					</div>`)
				).join("") || ""
			}
		</div>
		<h4 class="total">
			Total price:
			<p class="total-price">R ${totalPrice}</p>
		</h4>
		<button type="button" class="orders-btn" onclick="displayElement(modal, true)">Complete your orders</button>`
	);

	displayElement(ordersContainer, true);
}

function displayElement(element, showElement) {
	element.style.display = showElement ? "grid" : "none"
}

function handleSubmit(event) { 
	
	let username = form["username"].value;
	ordersContainer.innerHTML = (
		`<p class="order-complete-message">
			Thank you ${username}!
			 Your order is on the way
		 </p>`
	);
	
	form.reset();
	displayElement(modal, false);
	orderedItems =[];
	
	event.preventDefault();
}  
