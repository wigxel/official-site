// add an event listener

let button = document.querySelector('.trigger')

button.addEventListener('click', handleClick)

// create function
function handleClick()  {
    // selects the .blue-element
    let blueElement = document.querySelector('.blue-element')

    // toggle .reveal when called
    blueElement.classList.toggle('reveal')
}


