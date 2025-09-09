let video;
let facemesh;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("FaceMesh model loaded!");
}

function draw() {
  image(video, 0, 0, width, height);

  drawKeypoints(); // show facemesh points
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i++) {
    const keypoints = predictions[i].scaledMesh;

    for (let j = 0; j < keypoints.length; j++) {
      const [x, y] = keypoints[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(x, y, 3, 3);
    }
  }
}






