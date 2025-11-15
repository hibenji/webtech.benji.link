

let container = document.getElementById('productContainer');
let productURL = "products.json"; // adapt to your real location!

initialize(productURL,container);

function initialize(jsonURL, domElement) {
	// This function should retrieve all products from jsonURL and render them
	// in the same way as on the last assignment sheet inside of domElement
	let xhr = new XMLHttpRequest();
	xhr.open("GET", jsonURL);
	xhr.onload = function() {
		if (xhr.status >= 200 && xhr.status < 300) {
			let products = JSON.parse(xhr.responseText);
			renderProducts(products, domElement);
		} else {
			domElement.innerHTML = "Error loading products: " + xhr.statusText;
		}
	};
	xhr.send();
}

function renderProducts(products, domElement) {
	domElement.innerHTML = ""; // clear existing content

	products.forEach(product => {
		let productDiv = document.createElement('div');
		productDiv.className = 'product';
		productDiv.innerHTML = `
			<h2>${product.title}</h2>
			<p>Price: $${product.price.toFixed(2)}</p>
			<p>${product.desc}</p>
		`;
		domElement.appendChild(productDiv);
	});
}