const yourShip = document.querySelector('.playerShooter');
const playArea = document.querySelector('#mainPlayArea');
const aliensImg = ['img/firstmonster.png', 'img/secondmonster.png', 'img/thirdmonster.png'];
const instructionsText = document.querySelector('.gameInstruction');
const startButton = document.querySelector('.startButton');
const pointsStatus = document.querySelector('.pointsStatus');
let alienInterval, points = 0;


//Move and shoot of ship
function flyShip(event) {
    if(event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();  //allows the ship goes up
    } else if(event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown(); //allows the ship goes down
    } else if(event.key === " ") {
        event.preventDefault();
        fireLaser(); //fire a laser as a shot
    }
}

//This function allows the ship to go up 
function moveUp() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "0px") {
        return
    } else {
        let position = parseInt(topPosition);
        position -= 50;
        yourShip.style.top = `${position}px`;
    }
}


//This function allows the ship to go down
function moveDown() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "510px"){
        return
    } else {
        let position = parseInt(topPosition);
        position += 50;
        yourShip.style.top = `${position}px`;
    }
}

//This function allows the ship to shoot in objects
function fireLaser() {
    let laser = createLaserElement(); //create the element
    playArea.appendChild(laser); //set laser in plane game area
    moveLaser(laser); //laser animation in horizontal axis
}


/** This function creates every laser element and show it on display
 * Extract x position of the ship
 * Extract y position of the ship
 * Creates a laser animation using its picture as illustration
 * Set laser position based on ship's position in plane
*/
function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'img/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition}px`;
    return newLaser;
}



//This function makes the laser aninatiom
function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach((alien) => { //checking if there were aliens collision, if yes, an explosion image is set
            if(checkLaserCollision(laser, alien)) {
                alien.src = 'img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('deadAlien');
                setPoints('currentPlaying');
            }
        })

        if(xPosition === 340) {
            laser.remove();
        } else {
            laser.style.left = `${xPosition + 8}px`;
        }
    }, 10);
}


//This function creates random enemies
function createAliens() {
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; //selecting image of enemies
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alienTransition');
    newAlien.style.left = '370px';
    newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

//This function moves all enemies
function moveAlien(alien) {
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if(xPosition <= 50) {
            if(Array.from(alien.classList).includes('deadAlien')) {
                alien.remove();
            } else {
                gameOver();
            }
        } else {
            alien.style.left = `${xPosition - 4}px`;
        }
    }, 30);
}



//This function allows colision effect
function checkLaserCollision(laser, alien) {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 30;
    if(laserLeft != 340 && laserLeft + 40 >= alienLeft) {
        if(laserTop <= alienTop && laserTop >= alienBottom) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}


//This function starts the game
startButton.addEventListener('click', (event) => {
    playGame();
})

function playGame() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown', flyShip);
    alienInterval = setInterval(() => {
        createAliens();
    }, 2000);
}



//Game over function
function gameOver() {
    window.removeEventListener('keydown', flyShip);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    setTimeout(() => {
        alert('game over!');
        yourShip.style.top = "250px";
        startButton.style.display = "block";
        instructionsText.style.display = "block";
    });
}

//Experience points
function setPoints(status){
    if(status == 'startingGame'){
        points = 0;
    } else if (status == 'currentPlaying'){
        points = points + 10; 
    }
    pointsStatus.innerHTML = `${points} xp`;
}