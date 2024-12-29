
const pageWidth = document.documentElement.scrollWidth;
const pageHeight = document.documentElement.scrollHeight;

const default_player_size = 4;

document.getElementById("player1").style.height = default_player_size + "vh";
document.getElementById("player1").style.width = default_player_size + "vh";

document.getElementById("player2").style.height = default_player_size + "vh";
document.getElementById("player2").style.width = default_player_size + "vh";

var announcement = document.createElement('div');
announcement.style.width = '80%';
announcement.style.height = '80%';
announcement.style.position = 'absolute';
announcement.style.transform = 'translate(-50%, -50%)';
announcement.style.left = "50%";
announcement.style.top = "85%";
announcement.style.zIndex = 2;
announcement.style.fontStyle = "bold";
announcement.style.fontFamily = "Verdana";
announcement.style.verticalAlign = "bottom";
announcement.style.textAlign = "center";
announcement.style.fontSize = "6vw";
announcement.style.pointerEvents = 'none';
announcement.style.color = "rgba(255, 255, 255, 0.1)";
document.body.appendChild(announcement);

var aspect_ratio = pageWidth / pageHeight;
var min_x = 0;
var max_x = 100;
var min_y = 0;
var max_y = 96;
var paused = 0;

var acc = 0.5;
var friction = 0.4;
var max_speed = 2;
var min_speed = -2;
var max_speed_y = 2;
var min_speed_y = -2;

var player2 = document.getElementById("player2");
player2.style.right = "75%";
player2.style.top = "35%";
var p2 = { html: document.getElementById("player2"), size: default_player_size, speed_x: 0, speed_y: 0, up: 0, down: 0, left: 0, right: 0 }

var player = document.getElementById("player1");
player.style.right = "25%";
player.style.top = "65%";
var p1 = { html: document.getElementById("player1"), size: default_player_size, speed_x: 0, speed_y: 0, up: 0, down: 0, left: 0, right: 0 }

window.requestAnimationFrame(gameLoop);


function max(first, second) {
    if (first > second) {
        return first;
    }
    return second;
}
function min(first, second) {
    if (first > second) {
        return second;
    }
    return first;
}

function gibFriend() {
    p2.html.style.display = "block";
}

function colorRandomizer(player) {
    player.style.backgroundColor = "rgb(" + (Math.random() * (255 - 0) + 0) + ", " + (Math.random() * (255 - 0) + 0) + ", " + (Math.random() * (255 - 0) + 0) + ")"
}

function move_player(plr) {
    plr.speed_x = max(min_speed, min(max_speed, (plr.right + plr.left) * acc + plr.speed_x));
    plr.speed_y = max(min_speed_y, min(max_speed_y, (plr.up + plr.down) * acc + plr.speed_y));

    if (Math.abs(plr.speed_x) < friction) {
        plr.speed_x = 0;
    } else if (plr.speed_x > 0) {
        plr.speed_x = plr.speed_x - friction;
    } else {
        plr.speed_x = plr.speed_x + friction;
    }

    if (Math.abs(plr.speed_y) < friction) {
        plr.speed_y = 0;
    } else if (plr.speed_y > 0) {
        plr.speed_y = plr.speed_y - friction;
    } else {
        plr.speed_y = plr.speed_y + friction;
    }

    xpos = parseFloat(plr.html.style.right.slice(0, -1));
    ypos = parseFloat(plr.html.style.top.slice(0, -1));

    xpos = xpos + plr.speed_x / 2;
    ypos = ypos + plr.speed_y / 2;
    xpos = max(xpos, min_x);
    xpos = min(xpos, 100 - (plr.size / aspect_ratio));
    ypos = max(ypos, min_y);
    ypos = min(ypos, 100 - plr.size);
    xback = xpos + "%";
    yback = ypos + "%";

    plr.html.style.right = xback;
    plr.html.style.top = yback;
    plr.html.style.width = plr.size + "vh";
    plr.html.style.height = plr.size + "vh";

    return [xpos, ypos];
}


function gameLoop() {
    move_player(p1);
    move_player(p2);


    window.requestAnimationFrame(gameLoop);
}
/////////////////////////////////////////////////
// ************ keyboard controls ************ //
/////////////////////////////////////////////////

document.onkeyup = KeyUp;
function KeyUp(event) {
    var UpKeyID = event.keyCode;

    switch (UpKeyID) {
        case 37: // right
            p1.right = 0;
            break;

        case 38: //up
            p1.up = 0;
            break;

        case 39: //left
            p1.left = 0;
            break;

        case 40: //down
            p1.down = 0;
            break;



        case 65: // right
            p2.right = 0;
            break;

        case 87: //up
            p2.up = 0;
            break;

        case 68: //left
            p2.left = 0;
            break;

        case 83: //down
            p2.down = 0;
            break;
        case 191: //down
            colorRandomizer(document.getElementById("player1"))
            break;
        case 84: //down
            colorRandomizer(document.getElementById("player2"))
            break;
    }
}

document.onkeydown = KeyDown;
function KeyDown(event) {
    var DownKeyID = event.keyCode;

    switch (DownKeyID) {
        case 37: // right
            p1.right = 1;
            break;

        case 38: //up
            p1.up = -1;
            break;

        case 39: //left
            p1.left = -1;
            break;

        case 40: //down
            p1.down = 1;
            break;


        case 65: // right
            p2.right = 1;
            break;

        case 87: //up
            p2.up = -1;
            break;

        case 68: //left
            p2.left = -1;
            break;

        case 83: //down
            p2.down = 1;
            break;
    }
}



