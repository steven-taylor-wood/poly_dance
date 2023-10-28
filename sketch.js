// READ BEFORE STARTING
// this project uses a video stored locally in ../assets
// if this video does not load (seeing a black screen)
// simply reload the project, this should fix things


let vid,
    poseNet,
    poses = [];
    pose1Positions = [];
    pose2Positions = [];
    pose3Positions = [];
    pose4Positions = [];
    const MAX_POS = 20;

function setup() {
  createCanvas(854, 480);
  vid = createVideo("assets/ballet2.mp4", vidReady);
  vid.size(854, 480);
  vid.loop();
  vid.volume(0.5);
  // vid.hide();
}

function vidReady(stream) {
  poseNet = ml5.poseNet(vid, modelReady);

  poseNet.on('pose', detectedPose);

  vid.hide();
}

function modelReady() {
  console.log("Model Ready");
}

function detectedPose(results) {
   poses = results;
   // console.log(poses);
}

// function drawKeyPoints(){
//   for (let this_pose of poses) {
//     let pose = this_pose.pose;

//     for (let keypoint of pose.keypoints) {
//       if (keypoint.score > 0.3) {
//         fill(0,255,255);
//         noStroke();
//         ellipse(keypoint.position.x, keypoint.position.y, 8, 8);
//       }
//     }
//   }
// }

function drawPoints() {
  // let history = [];
    if (poses.length > 0) {
      const pose = poses[0].pose;

      fill(255, 215, 0);
      const leftWrist = pose.leftWrist;
      ellipse(leftWrist.x, leftWrist.y, 9, 9);

      const rightWrist = pose.rightWrist;
      ellipse(rightWrist.x, rightWrist.y, 9, 9);

      const leftAnkle = pose.leftAnkle;
      ellipse(leftAnkle.x, leftAnkle.y, 9, 9);

      const rightAnkle = pose.rightAnkle;
      ellipse(rightAnkle.x, rightAnkle.y, 9, 9);

      pose1Positions.push({x: leftWrist.x, y: leftWrist.y});
      pose2Positions.push({x: rightWrist.x, y: rightWrist.y});
      pose3Positions.push({x: leftAnkle.x, y: leftAnkle.y});
      pose4Positions.push({x: rightAnkle.x, y: rightAnkle.y});

        //removes poses that are older than 50
      if (pose1Positions.length && 
          pose2Positions.length &&
          pose3Positions.length &&
          pose4Positions.length> MAX_POS) {
        pose1Positions.shift();
        pose2Positions.shift();
        pose3Positions.shift();
        pose4Positions.shift();
      }
      for (let i = 0; i < pose1Positions.length; i +=1) {
        // how you want to draw the previous poses
        // relate it to i to change pose drawing over time
        ellipse(pose1Positions[i].x, pose1Positions[i].y, i, i);
      }

      for (let i = 0; i < pose2Positions.length; i +=1) {
        // how you want to draw the previous poses
        // relate it to i to change pose drawing over time
        ellipse(pose2Positions[i].x, pose2Positions[i].y, i, i);
      }

      for (let i = 0; i < pose3Positions.length; i +=1) {
        // how you want to draw the previous poses
        // relate it to i to change pose drawing over time
        ellipse(pose3Positions[i].x, pose3Positions[i].y, i, i);
      }

      for (let i = 0; i < pose4Positions.length; i +=1) {
        // how you want to draw the previous poses
        // relate it to i to change pose drawing over time
        ellipse(pose4Positions[i].x, pose4Positions[i].y, i, i);
      }
  }
}

function draw() {
    background(0);
    image(vid, 0, 0);

    // drawKeyPoints();
    drawPoints();
}