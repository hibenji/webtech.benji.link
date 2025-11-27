let express = require('express');
const app = express();
let fs = require('fs');
let cors = require('cors');
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *
app.use(express.static('public')); // host public folder

// TODO: read the products.json file here into a string
let productsJson = fs.readFileSync('products.json', 'utf8');

app.get('/', function (req, res) {
	// TODO: set a content type (from ex.1)
	res.set('Content-Type', 'text/html');
  res.status(200).send("EX2: This is a simple application");
});

app.get('/products', function (req, res) {
    
	// write your code here to output the list of products as JSON
	res.set('Content-Type', 'application/json');
	console.log(productsJson);
	productIds = JSON.parse(productsJson).map(p => p.id);
	productsIds = {productIds: productIds};
	res.status(200).send(productsIds);
});

app.get('/product/:id', function (req, res) {
		let id = req.params.id;
		let products = JSON.parse(productsJson);
		let product = products.find(p => p.id == id);
		if (product) {
			res.set('Content-Type', 'application/json');
			res.status(200).send(product);
		}
		else {
			res.status(400).send("Product not found");
		}
});

// write your route handler to output a single product by its ID as JSON here

let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:"+port);
