function toMove(key, camera, angle, angleNormalization){
    const pace = 0.1

    if(key === "ArrowUp"){
        walkAhead(camera, pace, angle, angleNormalization)
    }else if(key === "ArrowDown"){
        walkBackwards(camera, pace, angle, angleNormalization)
    }else if (key === "ArrowRight"){
        walkRight(camera, pace, angle, angleNormalization)
    }else if(key === "ArrowLeft"){
        walkLeft(camera, pace, angle, angleNormalization)
    }
    else if(key === " "){
        jump(camera, 0.15).then(()=>{
            jumping = false
        })
    }

}


function walkAhead(camera, pace, angle, normalization){
    angle *= normalization
    camera.position.z = camera.position.z - (pace * Math.cos(angle))
    camera.position.x = camera.position.x - (pace * Math.sin(angle))
}

function walkBackwards(camera, pace, angle, normalization){
    angle *= normalization
    camera.position.z = camera.position.z + (pace * Math.cos(angle))
    camera.position.x = camera.position.x + (pace * Math.sin(angle))
}

function walkRight(camera, pace, angle, normalization){
    angle -= 90    
    angle *= normalization
    camera.position.z = camera.position.z - (pace * Math.cos(angle))
    camera.position.x = camera.position.x - (pace * Math.sin(angle))
}

function walkLeft(camera, pace, angle, normalization){
    angle += 90    
    angle *= normalization
    camera.position.z = camera.position.z - (pace * Math.cos(angle))
    camera.position.x = camera.position.x - (pace * Math.sin(angle))}

async function jump(camera, height){
    const acceleration = 0.05

    for(let i = 0; i < height; i += acceleration){
        camera.position.y += i
        await delay(0.1)
    }
    for(let i = 0; i < height; i += acceleration){
        camera.position.y -= i
        await delay(0.1)
    }
}


function calculateAngle(movementX, cursorPosition, velocity){
    cursorPosition -= movementX 
    cursorPosition = Math.abs(cursorPosition) > window.innerWidth ? 0 : cursorPosition
    return {angle: (cursorPosition/window.innerWidth) * 360, cursorPosition: cursorPosition}
}

function rotate(camera, angle, normalization){
    camera.rotation.y = angle * normalization
}

class Movements{
    velocity = 0.05
    angleNormalization = 0.0177711999

    constructor(camera){
        this.camera = camera
        this.rotateInformation = {angle:0, cursorPosition: 0}

        document.onmousemove = this.interpretMouseMovement.bind(this)
        window.onkeydown = this.interpretKey.bind(this)
    }

    interpretKey(event){
        toMove(event.key, this.camera, this.rotateInformation.angle, this.angleNormalization)
    }

    interpretMouseMovement(event){
        this.rotateInformation = calculateAngle(event.movementX, this.rotateInformation.cursorPosition, this.velocity)
        rotate(this.camera, this.rotateInformation.angle, this.angleNormalization)
    }
    

}

















