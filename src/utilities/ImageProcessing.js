const image = document.createElement("img");
const canvas = document.createElement("canvas");

// console.log(imageData);

// console.log(blinkyLegs1);
// console.log("context", context);

// console.log(canvas.toDataURL());
function convertImageDataToPixelArray({ data }) {
  const pixelArray = [];
  for (let i = 0; i < data.length; i += 4) {
    pixelArray.push({
      R: data[i],
      G: data[i + 1],
      B: data[i + 2],
      A: data[i + 3],
    });
  }
  return pixelArray;
}

function writePixelArrayToImageData(pixelArray, { data }) {
  //   console.log("imagedata", imageData);
  for (let i = 0; i < data.length; i += 4) {
    const pixel = pixelArray.shift();
    data[i] = pixel.R;
    data[i + 1] = pixel.G;
    data[i + 2] = pixel.B;
    data[i + 3] = pixel.A;
    // console.log("pixel", pixel);
  }
}

function filterImage(img, filterFunction) {
  image.src = img;
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixelArray = convertImageDataToPixelArray(imageData);
  const filteredPixelArray = pixelArray.map((pixel) => filterFunction(pixel));
  writePixelArrayToImageData(filteredPixelArray, imageData);
  context.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

function imagesAreLoaded(images) {
  try {
    images.forEach((img) => {
      image.src = img;
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);
      context.getImageData(0, 0, canvas.width, canvas.height);
    });
    return true;
  } catch (error) {
    console.log("interesting");
    return false;
  }
}

export { filterImage, imagesAreLoaded };
