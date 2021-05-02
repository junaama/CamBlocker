const cc = require('camera-capture');
const axios = require('axios'); //you can use any http client
const tf = require('@tensorflow/tfjs-node');
const nsfw = require('nsfwjs');
const fs = require('fs');

let model, c;

const init = async () => {
  c = new cc.VideoCapture({
    mime: 'image/png'
  });

  console.log("initializing webcam");

  await c.initialize();

  console.log("initializing model");

  // To load a local model, nsfw.load('file://./path/to/model/')
  model = await nsfw.load("file:///home/vivek/ruhacks/api/nsfw_model/");

  console.log("initialized app");

  await setInterval(loop_func, 500);
}

async function loop_func() {
  let f = await c.readFrame();
  // fs.writeFileSync('tmp.png', f.data);  

  // Image must be in tf.tensor3d format
  // you can convert image to tf.tensor3d with tf.node.decodeImage(Uint8Array,channels)
  const image = await tf.node.decodeImage(f.data, 3);

  const predictions = await model.classify(image);

  // Tensor memory must be managed explicitly (it is not sufficient to let a tf.Tensor go out of scope for its memory to be released).
  image.dispose();

  console.log(predictions);
}

init();
  
// const pic = await axios.get(`https://cpb-us-e1.wpmucdn.com/sites.northwestern.edu/dist/f/1372/files/2016/10/18qt595p136wvjpg-1i2wdfc.jpg`, {
//   responseType: 'arraybuffer',
// })