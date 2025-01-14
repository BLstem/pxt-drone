enum movement{
    //%block="Up"
    up, 
    //%block="Down"
    down, 
    //%block="Right"
    right, 
    //%block="Left"
    left, 
    //%block="Forward"
    forward, 
    //%block="Backward"
    backward, 
    //%block="Stay"
    stay, 
    //%block="Anti-Clockwise"
    anticlockwise, 
    //%block="Clockwise"
    clockwise
}

//% block="Drone STEM@eClass" color=#2B4556 icon="\uf1d8"
namespace drone {
    //connect to the board
    serial.redirect(SerialPin.P2, SerialPin.P1, 115200)

    //initialize commands
    let command: string = "170"
    let took_off: boolean = false
    let moving: boolean = false
    let fly_flag: string = "00"
    let direction: string = "00"

    //changing drone status
    basic.forever(function() {
        command = "170"
        command += fly_flag
        command += direction
        serial.writeString(command)
        basic.pause(100)
    })

    //%block="Be prepared" weight=100
    export function prepared(): void{
        fly_flag = "01"
        direction = "00"
    }

    //%block="END" weight=99
    export function end_section(): void{
        fly_flag = "00"
        direction = "00"
    }

    //%block="Take off" weight=98
    export function take_off(): void{
        direction = "06"
        took_off = true
    }

    //%block="Land" weight=97
    export function land(): void{
        direction = "07"
        took_off = false
    }

    //%block="Action %action" weight=96
    export function Action(action: movement): void {
        if (took_off){
            switch (action) {
                case movement.clockwise:
                    direction = "11"
                    moving = true
                    break
                case movement.anticlockwise:
                    direction = "12"
                    moving = true
                    break
                case movement.up:
                    direction = "01"
                    moving = true
                    break
                case movement.down:
                    direction = "00"
                    moving = true
                    break
                case movement.right:
                    direction = "05"
                    moving = true
                    break
                case movement.left:
                    direction = "04"
                    moving = true
                    break
                case movement.forward:
                    direction = "02"
                    moving = true
                    break
                case movement.backward:
                    direction = "03"
                    moving = true
                    break
                case movement.stay:
                    if (moving){
                        direction = "06"
                        command = "170" + fly_flag + direction
                        serial.writeString(command)
                        direction = "09"
                        moving = false
                    }
                    break
            }
        }
    }
}
