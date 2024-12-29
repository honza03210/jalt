
const pageWidth = document.documentElement.scrollWidth;
const pageHeight = document.documentElement.scrollHeight;

const default_player_size = 4;
const seeker_growth = 0.02

document.getElementById("player1").style.height = default_player_size + "vh";
document.getElementById("player1").style.width = default_player_size + "vh";

document.getElementById("player2").style.height = default_player_size + "vh";
document.getElementById("player2").style.width = default_player_size + "vh";

var lol = document.createElement('div');
lol.style.width = '100%';
lol.style.height = '100%';
lol.width = pageWidth;
lol.height = pageHeight;
lol.style.position = 'absolute';
lol.style.transform = 'translate(-50%, -50%)';
lol.style.left = "50%";
lol.style.top = "50%";
lol.style.zIndex = -1;
lol.style.pointerEvents = 'none';
lol.style.backgroundColor = "rgb(26, 26, 26)";
lol.style.color = "#0d56b6";
lol.style.fontStyle = "bold";
lol.style.textAlign = "center";
lol.style.verticalAlign = "middle";
lol.style.fontFamily = "Verdana";
lol.style.fontSize = "10em";
document.getElementById("background1").appendChild(lol);

var score = document.createElement('div');
score.style.width = '90%';
score.style.height = '90%';
score.width = pageWidth;
score.height = pageHeight;
score.style.position = 'absolute';
score.style.transform = 'translate(-50%, -50%)';
score.style.left = "50%";
score.style.top = "50%";
score.style.zIndex = 1;
score.style.pointerEvents = 'none';
score.style.color = "rgba(255, 255, 255, 0.1)";
score.style.fontStyle = "bold";
score.style.textAlign = "center";
score.style.fontFamily = "Verdana";
score.style.fontSize = "7vw";
document.getElementById("background1").appendChild(score);

var game_round = 1;
var round = document.createElement('div');
round.style.width = '90%';
round.style.height = '90%';
round.width = pageWidth;
round.height = pageHeight;
round.style.position = 'absolute';
round.style.transform = 'translate(-50%, -50%)';
round.style.left = "50%";
round.style.top = "130%";
round.style.zIndex = 1;
round.style.pointerEvents = 'none';
round.style.color = "rgba(255, 255, 255, 0.1)";
round.style.fontStyle = "bold";
round.style.textAlign = "center";
round.style.fontFamily = "Verdana";
round.style.fontSize = "4vw";
round.innerHTML = "Round " + game_round + ".0"
document.getElementById("background1").appendChild(round);

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
var p2 = { html: document.getElementById("player2"), size: default_player_size, ready: false, score: 0, speed_x: 0, speed_y: 0, up: 0, down: 0, left: 0, right: 0 }

var player = document.getElementById("player1");
player.style.right = "25%";
player.style.top = "65%";
var p1 = { html: document.getElementById("player1"), size: default_player_size, ready: false, score: 0, speed_x: 0, speed_y: 0, up: 0, down: 0, left: 0, right: 0 }


var running = false;
var seeker = p1;
var runner = p2;
score.innerHTML = "<span style = 'color: rgba(0, 255, 255, 0.2)'>p1</span>: " + Math.floor(p1.score) + " || <span style = 'color: rgba(255, 141, 10, 0.2)'>p2</span>: " + Math.floor(p2.score);

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
function caught(x, y, xi, yi) {
    return (Math.abs(x - xi) <= ((seeker.size + runner.size) / 2) * (pageHeight / pageWidth) && Math.abs(y - yi) <= ((seeker.size + runner.size) / 2));
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
    if (seeker == plr){
        xpos -= seeker_growth / (2 / (pageHeight / pageWidth));
        ypos -= seeker_growth / 2;
    }
    console.log(plr.html.style.right);
    console.log(xpos);
    console.log(ypos);

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
    if (running) {
        console.log(p1);
        console.log(p2);
       
        runner.score += 1;
        seeker.size += seeker_growth;
        score.innerHTML = "<span style = 'color: rgba(0, 255, 255, 0.2)'>p1</span>: " + Math.floor(p1.score) + " || <span style = 'color: rgba(255, 141, 10, 0.2)'>p2</span>: " + Math.floor(p2.score);

        var [xpos, ypos] = move_player(p1);
        var [p2_xpos, p2_ypos] = move_player(p2);


        console.log(xpos);
        console.log(p2_xpos);
        if (caught(xpos + p1.size / 2 * (pageHeight / pageWidth), ypos + p1.size / 2, p2_xpos + p2.size / 2 * (pageHeight / pageWidth), p2_ypos + p2.size / 2)) {
            if (seeker == p1) {
                p1.score += 1;
                seeker = p2;
                seeker.size = default_player_size;
                runner = p1;
                runner.size = default_player_size;

                p1.ready = false;
                running = false;
                announcement.innerHTML = "Seeker -> <span style = 'color: rgba(255, 141, 10, 0.2)'>p2</span>";
                player.style.right = "25%";
                player.style.top = "65%";

                move_player(p1);

                player2.style.right = "75%";
                player2.style.top = "35%";
                round.innerHTML = "Round " + game_round + ".5"
                move_player(p2);

            } else {
                p2.score += 1;
                seeker = p1;
                runner = p2;
                seeker.size = default_player_size;
                runner.size = default_player_size;

                running = false;
                p2.ready = false;
                announcement.innerHTML = "Seeker -> <span style = 'color: rgba(0, 255, 255, 0.2)'>p1</span>";
                player.style.right = "75%";
                player.style.top = "35%";
                move_player(p1);


                player2.style.right = "25%";
                player2.style.top = "65%";
                move_player(p2);

                game_round += 1;
                round.innerHTML = "Round " + game_round + ".0"
            }
            paused = 0
        }

    } else {
        paused += 1
        if ((paused > 100) && ((p1.ready && seeker == p2) || (p2.ready && seeker == p1))) {
            running = true;
            announcement.innerHTML = "";
        } else {
            if (seeker == p1) {
                announcement.innerHTML = "<span style = 'color: rgba(255, 141, 10, 0.2)'>p2</span> move to start";
            } else {
                announcement.innerHTML = "<span style = 'color: rgba(0, 255, 255, 0.2)'>p1</span> move to start";
            }
            p1.ready = false;
            p2.ready = false;
        }
    }

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
            p1.ready = true
            p1.right = 0;
            break;

        case 38: //up
            p1.ready = true
            p1.up = 0;
            break;

        case 39: //left
            p1.ready = true
            p1.left = 0;
            break;

        case 40: //down
            p1.ready = true
            p1.down = 0;
            break;



        case 65: // right
            p2.right = 0;
            p2.ready = true
            break;

        case 87: //up
            p2.ready = true
            p2.up = 0;
            break;

        case 68: //left
            p2.ready = true
            p2.left = 0;
            break;

        case 83: //down
            p2.ready = true
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
            p1.ready = true
            p1.right = 1;
            break;

        case 38: //up
            p1.ready = true
            p1.up = -1;
            break;

        case 39: //left
            p1.ready = true
            p1.left = -1;
            break;

        case 40: //down
            p1.ready = true
            p1.down = 1;
            break;


        case 65: // right
            p2.right = 1;
            p2.ready = true
            break;

        case 87: //up
            p2.up = -1;
            p2.ready = true
            break;

        case 68: //left
            p2.left = -1;
            p2.ready = true
            break;

        case 83: //down
            p2.down = 1;
            p2.ready = true
            break;
    }
}



