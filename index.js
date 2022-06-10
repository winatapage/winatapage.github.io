
// JavaScript source code
//hello person reading this, have a nice day :)

let ctx;
let desc;
const numOfCircles = screen.width / 200 + 2;
let origins = [];
let texts = [
    "a creator",
    "a hockey player",
    "a programmer",
    "a competitive person",
    "a game developer",
    "a musician",
    "a student",
    "a leader",
    "a designer",
    "an athlete",
    "a problem solver"
    
]
let textUp = true;
let numOfLetters = 0;
let wait = 0;
let descIndex = 0;
$(document).ready(function () {
    var canvas = document.getElementById("ctx");
    ctx = canvas.getContext("2d");
    canvas.width = parseInt(window.getComputedStyle(document.querySelector('#ctx')).width.replace("px","") ) / 5;
    canvas.height = parseInt(window.getComputedStyle(document.querySelector('#ctx')).height.replace("px", "")) / 5;
    console.log(canvas.width);
    Start();
    setInterval(function () {
        Update();
    }, 100)
})

function Start() {
    var canvas = document.getElementById("ctx");
    desc = document.getElementById("myDescription");

    for (i = 0; i < numOfCircles; i++) {
        origins.push([Math.random() * canvas.width, Math.random() * canvas.height, Math.round(Math.random()), Math.round(Math.random())]);
    }
    

}
function Update() {
    
    RunBackground();
    RunText();
}
function RunText() {
    desc.innerHTML = ">I am " + texts[descIndex].substring(0, numOfLetters) + "|";

    wait -= 0.1;
    if (wait <= 0) {
        if (textUp) {
            numOfLetters++;
            if (numOfLetters >= texts[descIndex].length) {
                wait = 2;
                textUp = false;
            }
        } else {
            numOfLetters--;
            if (numOfLetters <= 0) {
                textUp = true;
                descIndex++;
                if (descIndex >= texts.length) {
                    descIndex = 0;
                }

            }
        }


    }
}
function RunBackground() {
    var canvas = document.getElementById("ctx");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //origin movement
    for (i = 0; i < origins.length; i++) {
        var og = origins[i];
        if (og[2] == 0) {
            og[0]--;
        }
        if (og[2] == 1) {
            og[0]++;
        }
        if (og[3] == 0) {
            og[1]--;
        }
        if (og[3] == 1) {
            og[1]++;
        }
        if (og[0] < 10) {
            og[2] = 1;
        }
        if (og[0] > canvas.width - 10) {
            og[2] = 0;
        }
        if (og[1] < 10) {
            og[3] = 1;
        }
        if (og[1] > canvas.height - 10) {
            og[3] = 0;
        }
    }






    var imageData = ctx.createImageData(canvas.width, canvas.height);

    for (i = 0; i < canvas.width; i++) {
        for (id = 0; id < canvas.height; id++) {
            var val = 0;
            origins.forEach(function (c) {
                var strength = 1 / (Math.pow(c[0] - i, 2) + Math.pow(c[1] - id, 2));
                val += strength;

            })
            if (val > 0.001 & val < 0.0015) {
                var pixelindex = (id * canvas.width + i) * 4;
                imageData.data[pixelindex] = 0;
                imageData.data[pixelindex + 1] = 0;
                imageData.data[pixelindex + 2] = 0;
                imageData.data[pixelindex + 3] = 255;
                //(val - 0.005) * 127500
                //SetPixel(i, id, 255, 255, 255, 255);
                continue;
            }
            //if (val > 0.007) {
            //    var pixelindex = (id * canvas.width + i) * 4;
            //    imageData.data[pixelindex] = 255;
            //    imageData.data[pixelindex + 1] = 255;
            //    imageData.data[pixelindex + 2] = 255;
            //    imageData.data[pixelindex + 3] = 255;
            //}

        }
    }

    ctx.putImageData(imageData, 0, 0);
}
function SetPixel(x, y, r, g, b, a) {
    var id = ctx.createImageData(1, 1); // only do this once per page
    var d = id.data;                        // only do this once per page
    d[0] = r;
    d[1] = g;
    d[2] = b;
    d[3] = a;
    ctx.putImageData(id, x, y); 
}


