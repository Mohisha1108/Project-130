var disney = "";
var peter_pan = "";

var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
function preload(){
    disney = loadSound("8d82b5_Disney_Intro_Theme_Song.mp3");
    peter_pan = loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(400,350);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("model is loaded");
}
function gotPoses(result){
    if (result.length > 0){
        console.log(result);
        leftWristY = result[0].pose.leftWrist.y;
        leftWristX = result[0].pose.leftWrist.x;
        rightWristY = result[0].pose.rightWrist.y;
        rightWristX = result[0].pose.rightWrist.x;
        console.log("left wrist y = "+leftWristY);
        console.log("left wrist x = "+leftWristX);
        console.log("right wrist x = "+rightWristX);
        console.log("right wrist y = "+rightWristY);
        scoreLeftwrist = result[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = "+scoreLeftwrist); 
        scorerightwrist = result[0].pose.keypoints[10].score;
        console.log("Score Right Wrist = "+scorerightwrist);
    }
}

function draw(){
    image(video,0,0,400,350);
    peter_pan_status = peter_pan.isPlaying();
    fill('blue');
    stroke('green');
    if (scoreLeftwrist > 0.2){
        circle(leftWristX,leftWristY,50);
        disney.stop();
        if(peter_pan_status == true){
            peter_pan.play();
            document.getElementById("song").innerHTML = "Peter Pan";
        }
    }
    disney_status = disney.isPlaying();
    fill('green');
    stroke('blue');
    if (scorerightwrist > 0.2){
        circle(rightWristX,rightWristY,50);
        peter_pan.stop();
        if(disney_status == true){
            disney.play();
            document.getElementById("song").innerHTML = "Disney Theme Song";
        }
    }
}