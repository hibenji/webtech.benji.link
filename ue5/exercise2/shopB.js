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
	
	this.updateProduct = function (e) {
		// this.numInCart +=1;
		product.numInCart +=1;
		updateCart();
	}
	

	// There will be one 4 functions in memory if there are 4 products. One per product.
	this.render = function () {
		return this.title+" "+this.price+"("+this.numInCart +")";
		
	}
	
	let clickButton = el.getElementsByClassName('buy')[0];
	clickButton.addEventListener('click', this.updateProduct);
}

for (let pdiv of document.querySelectorAll("div.product")) {
	products.push(new Product(pdiv));
}

