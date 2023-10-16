// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/0YrwSzz80/"; // 방금 학습시켰던 Teachable Machine 모델의 URL을 저장
let model, webcam, ctx, labelContainer, maxPredictions; // 변수 선언

let client; // 변수 선언

init();

async function init() { // 웹캠 설정, teachable machine 모델 로드, 웹캠 활성화하는 함수
  
    client = mqtt.connect('wss://patch.pral2a.com:8081');
  // MQTT 클라이언트를 설정하고 특정 MQTT 브로커에 연결

  client.on('error', function(err) {
    console.log(err);
  });
  // MQTT 클라이언트에서 에러가 발생했을 때 처리할 함수를 정의

  client.on('connect', function() {
    console.log('I am connected!');
  });
  // MQTT 클라이언트가 브로커에 연결되면 실행할 함수를 정의
  // "I am connected!"가 확인되면 연결 성공적
  
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  // Teachable Machine 모델의 구조를 설명하는 JSON 파일의 URL을 생성
  // 모델의 메타데이터를 설명하는 JSON 파일의 URL을 생성
  
  // load the model and metadata
  model = await tmPose.load(modelURL, metadataURL);
  // 함수 사용하여 eachable Machine 모델을 로드
  maxPredictions = model.getTotalClasses();
  // 모델이 인식할 수 있는 클래스의 총 수를 저장

  // Convenience function to setup a webcam 웹캠 셋팅
  const size = 200;
  const flip = true; // 웹캠 영상을 뒤집을 것인지 여부를 결정하는 변수,true로 설정하면 영상이 수평으로 뒤집힘.
  webcam = new tmPose.Webcam(size, size, flip); //tmPose.Webcam 클래스를 사용하여 웹캠을 설정
  await webcam.setup(); // 웹캠 액세스 권한을 요청하고 웹캠을 설정
  await webcam.play(); // 웹캠 영상이 화면에 표시
  window.requestAnimationFrame(loop); // 계속해서 웹캠 영상을 업데이트하고 모델에 전달

  // append/get elements to the DOM
  const canvas = document.getElementById("canvas");
  // HTML 문서에서 id가 "canvas"인 요소를 찾아서 canvas 변수에 할당
  canvas.width = size;
  canvas.height = size;
  // 캔버스의 크기가 웹캠 영상과 일치
  ctx = canvas.getContext("2d");// 캔버스에 그림 그리기
  labelContainer = document.getElementById("label-container"); // 예측 결과를 표시할 레이블을 포함
  for (let i = 0; i < maxPredictions; i++) { // 예측 결과를 표시할 때 사용되는 반복문
    labelContainer.appendChild(document.createElement("div"));
  }
}

async function loop(timestamp) {
  webcam.update(); // webcam 객체의 update 메서드를 호출하여 웹캠의 프레임을 업데이트
  await predict();
  window.requestAnimationFrame(loop); // 웹캠 영상과 모델 예측을 지속적으로 업데이트
}

async function predict() {
  // Prediction #1: run input through posenet
  // estimatePose can take in an image, video or canvas html element
  const {
    pose,
    posenetOutput
  } = await model.estimatePose(webcam.canvas);
  // posenetOutput을 Teachable Machine 모델을 통해 예측
  // Prediction 2: run input through teachable machine classification model
  const prediction = await model.predict(posenetOutput);

  // 웹페이지 상에서 웹캠으로 캡처된 이미지가 어떤 클래스로 분류되었는지 실시간으로 표시
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;


  }

  if (prediction[0].probability >= 0.90) { // 첫번째 클래스 예측확률 0.9 이상일 때
    client.publish("/pose", "front")
    console.log("front!"); // front 출력
  } else if (prediction[1].probability >= 0.90) { // 두번째 클래스 예측확률 0.9 이상일 때
    client.publish("/pose", "turn")
    console.log("turn!"); // turn 출력
  }

  // finally draw the poses
  drawPose(pose); // 함수를 호출하여 이미지 상에 포즈를 그리는 작업을 수행
}

function drawPose(pose) {
  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0);
    // 웹캠 프레임 캔버스에 그림
    if (pose) { // pose 객체가 존재하는 경우에만 포즈 시각화 작업을 수행
      const minPartConfidence = 0.5;
      // 최소 키포인트 신뢰도를 정의
      // 키포인트 신뢰도가 이 임계값보다 낮은 경우 보이지 않음
      tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      // 포즈의 키포인트 그리기
      tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      // 포즈의 키포인트 연결부 그리기
    }
  }
}
