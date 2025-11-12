'use strict';

let products = [];

const productList = {
	products: products,
	listProducts: function() {
		// Use arrow function to preserve 'this' context
		this.products.forEach((product, index) => {
			if (product.numInCart > 0) {
				const nextProductIndex = (index + 1) % this.products.length;
				const nextProduct = this.products[nextProductIndex];
				console.log(`${nextProduct.title};`);
			}
		});
	}
};

function updateCart() {
	let output = document.getElementById("orderedItems");
	output.innerHTML= "";
	let total = 0;
	for (let p of products) {
		if (p.numInCart >0) { 
			let newP = document.createElement ("li");
			newP.appendChild(document.createTextNode (p.render()));
			output.appendChild(newP);
			total += p.numInCart*p.price;
		}
	}
	document.getElementById("totalPrice").innerHTML = total.toFixed(2);
	console.log("Log: Updated cart: ");
	productList.listProducts();
}

function Product(el) {
	this.id = el.dataset.prodid;
	this.title =  el.firstChild.nextSibling.firstChild.nodeValue;
	this.desc = el.getElementsByClassName('desc')[0].innerText;
	this.price = parseFloat(el.getElementsByClassName('price')[0].innerText);
	this.numInCart = 0;

	// Fix the issue
	let product = this;
	
	Product.prototype.updateProduct = function () {
		// this.numInCart +=1;
		product.numInCart +=1;
		removeButton.disabled = false;
		updateCart();
	}

	Product.prototype.removeOneFromCart = function () {
		if (product.numInCart > 0) {
			product.numInCart -= 1;

			if (product.numInCart === 0) {
				removeButton.disabled = true;
			}

			updateCart();
		}
	}

	Product.prototype.calculateTotalPrice = function () {
		return this.numInCart * this.price;
	}
	
	// There will be one 4 functions in memory if there are 4 products. One per product.
	Product.prototype.render = function () {
		let displayText = this.title+" "+this.price+"("+this.numInCart +") - " + this.calculateTotalPrice().toFixed(2);
		if (this.id == "sonyAIV") {
			displayText += " (New Arrival!)";
		}
		return displayText;
	}
	
	let clickButton = el.getElementsByClassName('buy')[0];
	clickButton.addEventListener('click', this.updateProduct);

	let removeButton = el.getElementsByClassName('remove')[0];
	removeButton.addEventListener('click', this.removeOneFromCart);

}

for (let pdiv of document.querySelectorAll("div.product")) {
	// get the div inside the product div
	let divInside = pdiv.querySelector("div");
	let button = document.createElement("button")
	button.innerText = "Remove one";
	button.disabled = true;
	button.className = "remove";
	divInside.appendChild(button);

	products.push(new Product(pdiv));
}

