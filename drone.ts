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
    stay
}

//% block="Drone STEM@eClass" color=#2B4556 icon="\uf1d8"
namespace drone {
    //connect to the board
    serial.redirect(SerialPin.P0, SerialPin.P1, 115200)

    //initialize commands
    let command: number[] = [170, 0, 0]
    let took_off: boolean = false
    let moving: boolean = false
    let fly_flag: number = 0
    let direction: number = 0

    //changing drone status
    basic.forever(function() {
        command[1] = fly_flag
        command[2] = direction
        serial.writeNumbers(command)
        basic.pause(100)
    })

    //%block="Be prepared" weight=100
    export function prepared(): void{
        fly_flag = 1
        direction = 0
    }

    //%block="END" weight=99
    export function end_section(): void{
        fly_flag = 0
        direction = 0
    }

    //%block="Take off" weight=98
    export function take_off(): void{
        direction = 6
        took_off = true
    }

    //%block="Land" weight=97
    export function land(): void{
        direction = 7
        took_off = false
    }

    //%block="Action %action" weight=96
    export function Action(action: movement): void {
        if (took_off){
            switch (action) {
                case movement.up:
                    direction = 1
                    moving = true
                    break
                case movement.down:
                    direction = 0
                    moving = true
                    break
                case movement.right:
                    direction = 5
                    moving = true
                    break
                case movement.left:
                    direction = 4
                    moving = true
                    break
                case movement.forward:
                    direction = 2
                    moving = true
                    break
                case movement.backward:
                    direction = 3
                    moving = true
                    break
                case movement.stay:
                    if (moving){
                        direction = 6
                        command[2] = direction
                        serial.writeNumbers(command)
                        direction = 9
                        moving = false
                    }
                    break
            }
        }
    }
}
