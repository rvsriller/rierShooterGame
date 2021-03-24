const yourShip = document.querySelector('.playerShooter');
const playArea = document.querySelector('#mainPlayArea');
const aliensImg = ['img/firstmonster.png', 'img/secondmonster.png', 'img/thirdmonster.png'];
const instructionsText = document.querySelector('.gameInstructions');
const startButton = document.querySelector('.startButton');
let alienInterval;

//Move and shoot of ship
function flyShip(event) {
    if(event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } else if(event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    } else if(event.key === " ") {
        event.preventDefault();
        fireLaser();
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
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

//This function creates every laser element and show it on display
function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'img/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 10}px`;
    return newLaser;
}

