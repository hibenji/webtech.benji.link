console.log("\n--- Part A ---\n");
// Part a
let image = {
  width: 1920,
  height: 1080,
  bitdepth: 24,

  computeSize: function() {
    this.pixels = this.width * this.height;
    this.rawsize = (this.pixels * this.bitdepth) / 8; // bits to bytes
    return this.rawsize;
  }
}


// Call the function and compute values
image.computeSize();

// Print results to the console
console.log("Number of pixels:", image.pixels);
console.log("Raw size (bytes):", image.rawsize);


console.log("\n--- Part B ---\n");


// Part b
function Image(width, height, bitdepth) {
  this.width = width;
  this.height = height;
  this.bitdepth = bitdepth;
  this.pixels = width * height;
  this.rawsize = (this.pixels * this.bitdepth) / 8; // bits to bytes

  this.print = function() {
    for (let property in this) {
      // console.log(prop);
      if (typeof this[property] !== 'function') {
        console.log(property + ":", this[property]);
      }
    }
  };

  // PART C
  Image.prototype.printMore = function() {
    this.print();
    if (this.height > this.width) {
      console.log("This is a portrait.");
    } else if (this.width > this.height) {
      console.log("This is a landscape.");
    } else {
      console.log("This is a square.");
    }
  };

  // PART D - Exaple of runtime reassignment
  Image.prototype.test = function() {
    console.log("This is a test method on the prototype.");
  }

} 

// Create a new Image object
let img1 = new Image(800, 600, 32);
// Create a new Image object
let img2 = new Image(600, 800, 24);

// Print properties of the new Image object
img1.print();
console.log("");
img2.print();


// PART C
console.log("\n--- Part C ---\n");

// Call printMore method
img1.printMore();
console.log("");
img2.printMore();


// PART D
console.log("\n--- Part D ---\n");
// print() is defined inside the constructor, so every instance gets its own copy of the function.
// printMore() and test() is defined on the prototype, so all instances share the same function in memory.
// Example of runtime reassignment
img1.print = img2.test;
img1.print(); // now uses the test() behavior



// PART E
function Video(width, height, bitdepth,duration, framerate) {
  // Inherit properties from Image
  Image.call(this, width, height, bitdepth);

  this.duration = duration;
  this.framerate = framerate;

  this.totalFrames = function() {
    return this.duration * this.framerate;
  }

}

// Inherit prototype methods
Video.prototype = Object.create(Image.prototype);
Video.prototype.constructor = Video;

let vid1 = new Video(1920, 1080, 24, 120, 30);
let vid2 = new Video(1280, 720, 32, 60, 60);

console.log("Video 1 properties:");
vid1.print();
console.log("Total frames in Video 1:", vid1.totalFrames());

console.log("\nVideo 2 properties:");
vid2.print();
console.log("Total frames in Video 2:", vid2.totalFrames());


// PART F
console.log("\nCalling printMore on Video 1:");
vid1.printMore();



