let select_replay = 0
let answer = false
let icon = 0
let life_time = 0
let lives = 0
let streak = 0
let difficulty = 0
let time_factor = 0
let set_difficulty = false
let start_icon = 1
music.setTempo(120)
for (let index = 0; index < 3; index++) {
    if (start_icon == 1) {
        music.playTone(392, music.beat(BeatFraction.Quarter))
        basic.showIcon(IconNames.Happy)
        basic.pause(100)
        basic.clearScreen()
    } else if (start_icon == 2) {
        music.playTone(392, music.beat(BeatFraction.Quarter))
        basic.showLeds(`
            . . # . .
            # # # # .
            # # # # #
            # # # # .
            . . # . .
            `)
        basic.pause(100)
        basic.clearScreen()
    } else if (start_icon == 3) {
        music.playTone(392, music.beat(BeatFraction.Quarter))
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . . . .
            . . # . .
            `)
        basic.pause(100)
        basic.clearScreen()
    }
    start_icon += 1
}
music.playTone(587, music.beat(BeatFraction.Whole))
let replay_option = 1
while (replay_option == 1) {
    set_difficulty = false
    basic.showString("Set level")
    basic.showString("A=1")
    basic.showString("Shake=2")
    basic.showString("B=3")
    while (set_difficulty == false) {
        if (input.buttonIsPressed(Button.A) == true) {
            time_factor = 0.07
            set_difficulty = true
            difficulty = 1
        } else if (input.isGesture(Gesture.Shake)) {
            time_factor = 0.085
            set_difficulty = true
            difficulty = 2
        } else if (input.buttonIsPressed(Button.B) == true) {
            time_factor = 0.1
            set_difficulty = true
            difficulty = 3
        }
    }
    basic.showNumber(difficulty)
    basic.pause(500)
    basic.clearScreen()
    streak = 0
    for (let index = 0; index < 2; index++) {
        lives = 1
        life_time = 3
        for (let index = 0; index <= 2; index++) {
            basic.showNumber(3 - index)
        }
        basic.clearScreen()
        while (lives > 0) {
            if (life_time > 0) {
                icon = randint(1, 6)
                if (icon == 1) {
                    basic.showLeds(`
                        . . # . .
                        . . # . .
                        . . # . .
                        . . . . .
                        . . # . .
                        `)
                    basic.pause(life_time * 1000 - 200)
                    if (input.isGesture(Gesture.Shake)) {
                        answer = true
                    } else {
                        answer = false
                    }
                } else if (icon == 2) {
                    basic.showIcon(IconNames.Happy)
                    basic.pause(life_time * 1000 - 200)
                    if (input.buttonIsPressed(Button.A)) {
                        answer = true
                    } else {
                        answer = false
                    }
                } else if (icon == 3) {
                    basic.showIcon(IconNames.Sad)
                    basic.pause(life_time * 1000 - 200)
                    if (input.buttonIsPressed(Button.B)) {
                        answer = true
                    } else {
                        answer = false
                    }
                } else if (icon == 4) {
                    basic.showLeds(`
                        . . # . .
                        . . . # .
                        # # # # #
                        . . . # .
                        . . # . .
                        `)
                    basic.pause(life_time * 1000 - 200)
                    if (input.isGesture(Gesture.TiltRight)) {
                        answer = true
                    } else {
                        answer = false
                    }
                } else if (icon == 5) {
                    basic.showLeds(`
                        . . # . .
                        . # . . .
                        # # # # #
                        . # . . .
                        . . # . .
                        `)
                    basic.pause(life_time * 1000 - 200)
                    if (input.isGesture(Gesture.TiltLeft)) {
                        answer = true
                    } else {
                        answer = false
                    }
                } else if (icon == 6) {
                    music.playTone(294, music.beat(BeatFraction.Whole))
                    basic.pause(life_time * 1000 - 200)
                    if (input.isGesture(Gesture.ScreenDown)) {
                        answer = true
                    } else {
                        answer = false
                    }
                }
                if (answer == true) {
                    streak += 1
                    if (streak <= 15) {
                        music.playTone(587, music.beat(BeatFraction.Whole))
                        life_time = 3 - streak * time_factor
                    } else {
                        music.playTone(208, music.beat(BeatFraction.Breve))
                        life_time = life_time + (3 - 15 * time_factor)
                    }
                } else if (answer == false) {
                    lives += -1
                    basic.showIcon(IconNames.No)
                    basic.pause(200)
                    basic.showIcon(IconNames.Heart)
                    basic.pause(50)
                    basic.showIcon(IconNames.SmallHeart)
                    basic.pause(50)
                    basic.showLeds(`
                        . . . . .
                        . . . . .
                        . . # . .
                        . . . . .
                        . . . . .
                        `)
                    basic.pause(50)
                    basic.showLeds(`
                        . # . # .
                        # . . . #
                        . . . . .
                        # . . . #
                        . # . # .
                        `)
                    basic.clearScreen()
                }
            }
        }
    }
    music.playTone(392, music.beat(BeatFraction.Double))
    basic.showString("Game Over")
    basic.showString("Score=")
    basic.showNumber(streak)
    if (streak <= 5) {
        music.playTone(233, music.beat(BeatFraction.Double))
        basic.showString("Get better!")
    } else if (streak > 5 && streak <= 10) {
        music.playTone(277, music.beat(BeatFraction.Double))
        basic.showString("Average")
    } else if (streak > 10 && streak <= 15) {
        music.playMelody("C D E F G A B C5 ", 120)
        basic.showString("Nice, good game")
    } else if (streak > 15) {
        music.playMelody("C5 B A G F E D C ", 120)
        basic.showString("Wow! Top Tier")
    }
    basic.showString("Try Again?")
    basic.showString("A=YES")
    basic.showString("B=NO")
    select_replay = 0
    while (select_replay != 1) {
        if (input.buttonIsPressed(Button.A)) {
            replay_option = 1
        } else if (input.buttonIsPressed(Button.B)) {
            replay_option = 0
        }
    }
    select_replay = 1
    if (replay_option == 0) {
        basic.showString("Ok, let's go!")
    } else if (replay_option == 0) {
        basic.showString("Thanks for playing :)")
    }
}
