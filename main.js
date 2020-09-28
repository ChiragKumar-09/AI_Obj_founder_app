
status = "";
object_name = "";

function setup() {
    canvas = createCanvas(480 , 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(480 , 380);
}
function draw() {
    image(video , 0 , 0 , 480 , 380);
}

function start() {
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "STATUS : DETECTING OBJECTS";
    object_name = document.getElementById("object_name").value;
    console.log(object_name);
}

function modelLoaded() {
  console.log("model is loaded");
  status = true;
}