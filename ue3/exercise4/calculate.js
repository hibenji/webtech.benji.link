// 1. Delete the paragraph with the duplicated heading.
document.getElementsByTagName("p")[0].remove();


// 2. Add a read-only price input element to the glass order form with the label price. 
var priceInput = document.createElement("input");
priceInput.setAttribute("readonly", true);
priceInput.setAttribute("id", "price");

var priceInputLabel = document.createElement("label");
priceInputLabel.setAttribute("for", "price");

var fieldset = document.getElementsByTagName("fieldset")[1];

fieldset.append(priceInput)
fieldset.append(priceInputLabel)


// 3. Implement a func<on calculate(width,height,thickness)
function calculate(width, height, thickness) {

  thickness = thickness / 100; // for the mm to cm

  var hex = document.getElementById("color").value; 
  
  hex = hex.replace("#", "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  if (r == g == b) { 
    price = width * height * thickness / 50
  } else { 
    price = width * height * thickness / 32
  }

  return price;
}

// 4. Implement an update() func<on
function update() {
  console.log("update called");
  var width = document.getElementById("width");
  var height = document.getElementById("height"); 
  var thicknessValues = document.getElementsByName("thickness");
  var thickness;
  for (var i = 0; i < thicknessValues.length; i++) {
    if (thicknessValues[i].checked) {
      thickness = thicknessValues[i].value;
      break;
    }
  }

  var priceInput = document.getElementById("price");
  var price = calculate(width.value, height.value, thickness);

  if (width.checkValidity() == false || height.checkValidity() == false || isNaN(price)) {
    priceInput.value = "-";
  } else {
    priceInput.value = price.toFixed(2) + " EUR";
  }

}


// 5. Add event listeners to the form elements to call update() on change
document.getElementsByTagName("form")[0].addEventListener("input", update);