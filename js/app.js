const side = {
    left: 0,
    right: 505,
    top: 0,
    bottom: 606
};
const distBwEnemy = {
    hor: 101,
    vert: 75
};
let dt;
let player;


//Enemy class
class Enemy {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.sprite = 'images/enemy-bug.png';
        this.speed = EnemySpeed();
    }

    // Update the enemy's position
    update(dt) {
        if (this.x < side.right) {
            this.x += dt * this.speed + player.level; //Increases the enemy speed at each level
        } else {
            this.x = 0;
            this.speed = EnemySpeed();
        }

        // Check for collision between enemy and player and decrese the players
        if (Math.abs(this.x - player.x) < 40 && Math.abs(this.y - player.y) < 40) {
            player.x = 200;
            player.y = 435;
            player.plays--;
        }

    }

    // Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

//Enemy speed
function EnemySpeed() {
    return (Math.floor(Math.random() * 70));
}

// Player class
class Player {
    constructor(x, y) {
        this.plays = 3;
        this.high = 0;
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
        this.scores = 0;
        this.level = 1;
    }

    // Update the player positiond
    update() {

        if (this.x > 402.5) {
            this.x = 402.5;
        }
        if (this.x < 0) {
            this.x = 5;
        }

        //Increase the scores and the level
        if (this.y < 0) {
            this.scores += 20;
            if (this.scores >= 100 && this.scores % 100 == 0) {
                this.level += 1;
            }
        }

        if (this.y > 402.5 || this.y < 0) {
            this.y = 436;
        }

    }

    //Draw the player on the screen
    render() {
        if (this.plays < 1) {
            if (this.scores > this.high) {
                this.high = this.scores;
            }
            //reset for new game
            this.plays = 3;
            this.games++;
            //move player to start point
            this.x = 205;
            this.y = 435;

            //Alert box after the end of the game
            alert(`You scores are: ${this.scores}. </br> 
            The best result is ${this.high} </br>
            Your level is ${this.level}`);

            this.scores = 0;
            this.level = 1;

        }

        ctx.font = "17px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText("Scores:", 125, 30);
        ctx.fillText(this.scores, 190, 31);

        ctx.font = "17px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText("Level:", 225, 30);
        ctx.fillText(this.level, 270, 31);

        ctx.font = "17px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText("High Scores:", 300, 30);
        ctx.fillText(this.high, 410, 31);

        let ememyLives = new Image();
        ememyLives.src = 'images/Heart.png';

        //show the players life on the top right corner 
        for (let i = 0; i < this.plays; i++) {
            ctx.drawImage(ememyLives, (i) * 35, 0, 30, 50);
        }

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        if (key === 'left') {
            this.x -= 100;
        } else if (key === 'right') {
            this.x += 100;
        } else if (key === 'down') {
            this.y += 100;
        } else if (key === 'up') {
            this.y -= 93;
        }
    }
}


// Add all enemy objects in an array
//Create player object

const allEnemies = [];
for (let i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(0, ((3 - i) * distBwEnemy.vert - 12)));
}
player = new Player(215, 435);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', e => {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Custom alert box
let alert_title = "Final result";
let alert_button_text = "Start a new game";

if (document.getElementById) {
    window.alert = function(txt) {
        createCustomAlert(txt);
    };
}

function createCustomAlert(txt) {
    d = document;

    if (d.getElementById("modalContainer")) return;

    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";

    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    if (d.all && !window.opera)
        alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left =
        (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";
    alertObj.style.visiblity = "visible";

    h1 = alertObj.appendChild(d.createElement("h1"));
    h1.appendChild(d.createTextNode(alert_title));

    msg = alertObj.appendChild(d.createElement("p"));
    msg.innerHTML = txt;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.appendChild(d.createTextNode(alert_button_text));
    btn.href = "#";
    btn.focus();
    btn.onclick = function() {
        removeCustomAlert();
        return false;
    };

    alertObj.style.display = "block";
}

function removeCustomAlert() {
    document
        .getElementsByTagName("body")[0]
        .removeChild(document.getElementById("modalContainer"));
}