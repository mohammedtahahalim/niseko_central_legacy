import sharp from "sharp";

export default async function blurrifyImages(images) {
  if (!images.length) {
    return [];
  }
  const results = [];
  try {
    for (let image of images) {
      const response = await fetch(image);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const blurredImage = await sharp(buffer)
        .resize(20)
        .blur()
        .toBuffer()
        .then((data) => `data:image/jpeg;base64,${data.toString("base64")}`);
      results.push({ url: image, blur: blurredImage });
    }
    return results;
  } catch (err) {
    console.log(err);
    return [];
  }
}
