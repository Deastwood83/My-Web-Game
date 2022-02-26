//create player 1
function player1Ship(x,y) {
    const element = newImage('assets/Exhaust_1_1_000.png');
    element.style.zIndex = 1;
    element.style.transform = 'rotate(90deg)';
    element.style.height = '25%'

    move(element).withArrowKeys(x, y)

    

    return {
        element: element
    }
}

