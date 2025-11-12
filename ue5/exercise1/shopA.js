'use strict';

let products = [];

function updateCart() {
	let output = document.getElementById("orderedItems");
	output.innerHTML= "";
	let total = 0;
	for (let p of products) {
		if (p.numInCart >0) { 
			let newP = document.createElement ("li");
			newP.appendChild(document.createTextNode (p.title+" "+p.price+"("+p.numInCart +")"));
			output.appendChild(newP);
			total += p.numInCart*p.price;
		}
	}
	document.getElementById("totalPrice").innerHTML = total.toFixed(2);
}

let productDivs = Array.from(document.querySelectorAll("div.product"));

productDivs.sort((a, b) => {
	let priceA = parseFloat(a.getElementsByClassName('price')[0].innerText);
	let priceB = parseFloat(b.getElementsByClassName('price')[0].innerText);
	return priceA - priceB;
});
// If price A is less than price B, a comes first (negative value)
// If price A is greater than price B, b comes first (positive value)
// If they are equal, order stays the same (zero)

let parent = productDivs[0].parentNode;
// Your order Div
let yourOrder = document.querySelector("div:has(ul)");
console.log(yourOrder);
for (let pd of productDivs) parent.insertBefore(pd, yourOrder);


for (let pdiv of document.querySelectorAll("div.product")) {
	let cp = {};
	// Parsing Data from HTML
	cp.id = pdiv.dataset.prodid;
	cp.title = pdiv.firstChild.nextSibling.firstChild.nodeValue;
	cp.desc = pdiv.getElementsByClassName('desc')[0].innerText;
	cp.price = parseFloat(pdiv.getElementsByClassName('price')[0].innerText);
	cp.numInCart = 0;
	cp.domElement = pdiv;
	products.push(cp);
	
	// OLD
	// function addListener(e) {
	// 	console.log(e);
	// 	cp.numInCart +=1;
	// 	updateCart();
	// }
		
	//set Event Listener
	let clickButton = pdiv.getElementsByClassName('buy')[0];

	// OLD
	// clickButton.addEventListener('click', addListener);

	// Anonymous Function
	// clickButton.addEventListener('click', function (e) {
	// 	console.log(e);
	// 	cp.numInCart +=1;
	// 	updateCart();
	// });

	// Arrow Function
	clickButton.addEventListener('click', (e) => {
		console.log(e);
		cp.numInCart +=1;
		updateCart();
	});
}


document.getElementById("emptyCard").addEventListener('click', (e) => {
	for (let p of products) {
		p.numInCart = 0;
	}
	updateCart();
});



