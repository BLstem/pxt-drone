input.onButtonPressed(Button.A, function () {
    drone.prepared()
})
input.onButtonPressed(Button.B, function () {
    basic.pause(2000)
    drone.take_off()
})
