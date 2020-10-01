
status = "";
object_name = "";
objects = [];

function setup() {
    canvas = createCanvas(480 , 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(480 , 380);
}
function draw() {
    image(video , 0 , 0 , 480 , 380);

    if (status != "") {
        objectDetector.detect(video , gotResult);

        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "STATUS : OBJECTS DETECTED";

            fill("#FF1493");
            percent = objects[i].confidence * 100 ;
            text(objects[i].label+" "+percent+"%" , objects[i].x + 15 , bjects[i].y + 15);
            noFill();
            stroke("#FF1493");
            rect(bjects[i].x , bjects[i].y , bjects[i].width , bjects[i].height);

            if (objects[i].label == object_name) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("yes_no").innerHTML = object_name.toUpperCase()+" FOUND";
                var synth = window.speechSynthesis;
                speak_data = object_name;
                utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            } else {
                document.getElementById("yes_no").innerHTML = object_name.toUpperCase()+" NOT FOUND";
            }
        }
    }
}

function start() {
    if (document.getElementById("object_name").value != "") {
        objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
        document.getElementById("status").innerHTML = "STATUS : DETECTING OBJECTS";
        object_name = document.getElementById("object_name").value;
        console.log(object_name);  
    } else {
        document.getElementById("object_name").placeholder = "Please Enter a Object !";
    }

}

function modelLoaded() {
  console.log("model is loaded");
  status = true;
}

function gotResult(error , results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}