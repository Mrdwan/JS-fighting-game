function rectanularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
            rectangle2.position.x &&
        rectangle1.attackBox.position.x <=
            rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle2.attackBox.height >=
            rectangle2.position.y &&
        rectangle1.attackBox.position.y <=
            rectangle2.position.y + rectangle2.height
    )
}

function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId)
    document.getElementById('displayText').style.display = 'flex'
    if (player.health === enemy.health) {
        document.getElementById('displayText').innerHTML = 'Tie'
    } else if (player.health > enemy.health) {
        document.getElementById('displayText').innerHTML = 'Player 1 winns'
    } else if (player.health < enemy.health) {
        document.getElementById('displayText').innerHTML = 'Player 2 winns'
    }
}

let timer = 60
let timerId
function decreseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreseTimer, 1000)
        timer--
        document.getElementById('timer').innerText = timer
    }

    if (timer === 0) {
        determineWinner({ player, enemy, timerId })
    }
}
