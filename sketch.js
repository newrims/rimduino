// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/erFZ8EQg4/";
// 학습시킨 Teachable Machine에서 내보낸 모델의 URL을 설정
let model, webcam, ctx, labelContainer, maxPredictions;
// 변수 선언
// 각각 모델, 웹캠, 그리기 컨텍스트, 분류 결과를 표시할 컨테이너 및 최대 예측 값을 의미

let client;

const serialPort = '/dev/cu.usbmodemDC5475CFBB182';
// 아두이노와 연결할 시리얼 포트의 경로를 설정
let serial;
// 시리얼 통신을 담당

init();
// 초기설정

async function init() {
  serial = new p5.SerialPort();
  serial.open(serialPort);
  
    client = mqtt.connect('wss://patch.pral2a.com:8081');

  client.on('error', function(err) {
    console.log(err);
  });

  client.on('connect', function() {
    console.log('I am connected!');
  });
  
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  model = await tmPose.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const size = 200;
  const flip = true; // whether to flip the webcam
  webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);

  // append/get elements to the DOM
  const canvas = document.getElementById("canvas");
  canvas.width = size;
  canvas.height = size;
  ctx = canvas.getContext("2d");
  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) { // and class labels
    labelContainer.appendChild(document.createElement("div"));
  }
}

async function loop(timestamp) {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  // Prediction #1: run input through posenet
  // estimatePose can take in an image, video or canvas html element
  const {
    pose,
    posenetOutput
  } = await model.estimatePose(webcam.canvas);
  // Prediction 2: run input through teachable machine classification model
  const prediction = await model.predict(posenetOutput);

  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;


  }

  if (prediction[0].probability >= 0.90) {
    client.publish("/pose", "left")
    console.log("left");
    serial.write("1left\r\n");
  } 
  else if (prediction[1].probability >= 0.90) {
    client.publish("/pose", "right")
    console.log("right");
    serial.write("1right\r\n");
  }

  // finally draw the poses
  drawPose(pose);
}

function drawPose(pose) {
  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0);
    // draw the keypoints and skeleton
    if (pose) {
      const minPartConfidence = 0.5;
      tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }
  }
}
