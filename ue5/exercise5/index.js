console.log("\n--- Part B ---\n");
class Image {
  constructor(width, height, bitdepth) {
    this.width = width;
    this.height = height;
    this.bitdepth = bitdepth;
    this.pixels = width * height;
    this.rawsize = (this.pixels * this.bitdepth) / 8; // bits to bytes
  }


  print() {
    for (let property in this) {
      // console.log(prop);
      if (typeof this[property] !== 'function') {
        console.log(property + ":", this[property]);
      }
    }
  };

  printMore() {
    this.print();
    if (this.height > this.width) {
      console.log("This is a portrait.");
    } else if (this.width > this.height) {
      console.log("This is a landscape.");
    } else {
      console.log("This is a square.");
    }
  };

}

// Create a new Image object
let img1 = new Image(800, 600, 32);
// Create a new Image object
let img2 = new Image(600, 800, 24);

// Print properties of the new Image object
img1.print();
console.log("");
img2.print();

// Call printMore method
img1.printMore();
console.log("");
img2.printMore();

class Video extends Image {
  constructor(width, height, bitdepth, duration, framerate) {
    super(width, height, bitdepth);
    this.duration = duration;
    this.framerate = framerate;
  }

  totalFrames() {
    return this.duration * this.framerate;
  }

}

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



