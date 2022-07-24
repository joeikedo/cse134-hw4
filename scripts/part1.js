function alertFunction(event){
    alert('Alert button was pressed');
}

function confirmFunction(event){
    let confirmResult = confirm('Press a button!');

    const outputTag = document.getElementById('confirmOutputTag');
    outputTag.innerText = `The value returned by the confirm method is : ${confirmResult}`;
}

function promptUnsafeFunction(event){
    let userInput = prompt('Please enter your input', '');
    const outputTag = document.getElementById('promptUnsafeOutput');

    if(userInput == null){
        outputTag.innerText = 'User didn’t enter anything';
    }
    else{
        outputTag.innerText = `The user entered: ${userInput}`;
    }
}

function promptSafeFunction(event){
    let clean = DOMPurify.sanitize('hi there');
    console.log(clean);
}


document.addEventListener('DOMContentLoaded', () =>
    {
        const alertButton = document.getElementById('alertButton');
        alertButton.addEventListener('click', alertFunction);

        const confirmButton = document.getElementById('confirmButton');
        confirmButton.addEventListener('click', confirmFunction);

        const promptButtonUnsafe = document.getElementById('promptButtonUnsafe');
        promptButtonUnsafe.addEventListener('click', promptUnsafeFunction);

        const promptButtonSafe = document.getElementById('promptButtonSafe');
        promptButtonSafe.addEventListener('click', promptSafeFunction);
    }
)
