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
  // p5.js 를 사용하여 시리얼 포트를 생성->아두이노와 통신 가능
  // 포트 오픈
  
    client = mqtt.connect('wss://patch.pral2a.com:8081');
  // MQTT 클라이언트를 설정

  client.on('error', function(err) {
    console.log(err);
  });
  // 오류가 발생했을 때 기록할 수 있게 핸들러 설정

  client.on('connect', function() {
    console.log('I am connected!');
  });
  // 연결 성공 했을 때 기록할 수 있게 핸들러 설정
  
  const modelURL = URL + "model.json";
  // Teachable Machine URL 설정
  const metadataURL = URL + "metadata.json";
  // metadata URL 설정
    
  // load the model and metadata
  model = await tmPose.load(modelURL, metadataURL);
  // 로딩이 완료될 때 까지 기다리기
  maxPredictions = model.getTotalClasses();
  // 모델에서 예측할 수 있는 최대의 클래스 수 설정
  
  // Convenience function to setup a webcam
  const size = 200; // 웹캠 사이즈 
  const flip = true; // 뒤집을지 말지, true라서 뒤집음
  webcam = new tmPose.Webcam(size, size, flip); // 웹캠 크기와 뒤집음여부 결정
  await webcam.setup(); // 웹캠 액세스 권한
  await webcam.play(); // 웹캠 활성화 
  window.requestAnimationFrame(loop); 
  // 웹캠에서 가져온 이미지를 계속해서 처리하고 분류하는 루프를 설정

  // append/get elements to the DOM
  const canvas = document.getElementById("canvas");
  // HTML 문서에서 canvas라는 ID를 가진 요소를 가져와서 canvas 변수에 할당
  canvas.width = size;
  canvas.height = size;
  // 캔버스 크기 size 변수로 설정
  ctx = canvas.getContext("2d");
  // getContext("2d")를 호출하여 2D 렌더링 컨텍스트를 얻고, 이것을 ctx 변수에 할당
  // 그림 그릴 때 사용
  labelContainer = document.getElementById("label-container");
  // HTML 문서에서 label-container라는 ID를 가진 요소를 가져와서 labelContainer 변수에 할당
  for (let i = 0; i < maxPredictions; i++) { 
    // 모델이 예측하는 클래스 레이블 수에 따라 div 요소를 생성하는 반복문
    labelContainer.appendChild(document.createElement("div"));
  }
}

async function loop(timestamp) {
  webcam.update(); // webcam 객체의 update 메서드를 호출하여 웹캠 프레임을 업데이트
  await predict();
  // predict 함수를 호출하여 웹캠 이미지를 예측하고 결과를 표시
  window.requestAnimationFrame(loop);
} // 브라우저에서 다음 프레임을 렌더링할 때마다 loop 함수를 실행하여 웹캠 이미지를 계속 업데이트
  // 연속적인 이미지 분류할 수 있음

async function predict() {
  // Prediction #1: run input through posenet
  // estimatePose can take in an image, video or canvas html element
  const {
    pose,
    posenetOutput
  } = await model.estimatePose(webcam.canvas);
  // 웹캠에서 캡처한 이미지에 대한 포즈(자세) 및 PoseNet 출력을 추정
  // Prediction 2: run input through teachable machine classification model
  const prediction = await model.predict(posenetOutput);
  // 이미지 분류

  for (let i = 0; i < maxPredictions; i++) {
    // 모델이 예측한 각 클래스에 대해 반복
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;


  }

  if (prediction[0].probability >= 0.90) {
    // 첫 번째 클래스(left)의 확률이 0.9 이상일 때
    client.publish("/pose", "left")
    console.log("left");
    serial.write("1left\r\n");
    // left 메시지 표기
  } 
  else if (prediction[1].probability >= 0.90) {
    // 두 번째 클래스(right)의 확률이 0.9 이상일 때
    client.publish("/pose", "right")
    console.log("right");
    serial.write("1right\r\n");
  }
    // right 메시지 표기
  // 함수 호출하여 포즈 정보 그리기
  drawPose(pose);
}

function drawPose(pose) {
  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0);
    // 포즈의 키포인트와 스켈레톤 그리기
    if (pose) {
      const minPartConfidence = 0.5;
      // 키포인트 임계치 설정, 0.5 미만이면 보이지 않음
      tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }
  }
}
