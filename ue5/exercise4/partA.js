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