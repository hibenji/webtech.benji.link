

let container = document.getElementById('productContainer');
let productURL = "products.json"; // adapt to your real location!

initialize(productURL,container);

function initialize(jsonURL, domElement) {
	// This function should retrieve all products from jsonURL and render them
	// in the same way as on the last assignment sheet inside of domElement
	fetch(jsonURL)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok ' + response.statusText);
			}
			return response.json();
		})
		.then(products => {
			renderProducts(products, domElement);
		})
		.catch(error => {
			domElement.innerHTML = "Error loading products: " + error.message;
		});
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