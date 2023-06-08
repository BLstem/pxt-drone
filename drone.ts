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

//% block="Drone" color=#2B4556 icon="\uf1d8"
namespace drone {
    //connect to the board
    serial.redirect(SerialPin.P0, SerialPin.P1, 115200)

    //initialize commands
    let command: number[] = [170, 0, 0]
    let took_off: boolean = false
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
        switch (action) {
            case movement.up:
                direction = 1
            case movement.down:
                direction = 0
            case movement.right:
                direction = 5
            case movement.left:
                direction = 4
            case movement.forward:
                direction = 2
            case movement.backward:
                direction = 3
            case movement.stay:
                take_off()
                command[2] = direction
                serial.writeNumbers(command)
                direction = 9
        }
    }
}
