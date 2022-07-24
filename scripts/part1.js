let outputTag;

//Clear functions, clear text as soon as a button is clicked. 
function clearBeforeAlert(event){
    outputTag.innerText = '';

    setTimeout(alertFunction, 0);
}

function clearBeforeConfirm(event){
    outputTag.innerText = '';

    setTimeout(confirmFunction, 0);
}

function clearBeforePromptUnsafe(event){
    outputTag.innerText = '';

    setTimeout(promptUnsafeFunction, 0);
}

function clearBeforePromptSafe(event){
    outputTag.innerText = '';

    setTimeout(promptSafeFunction, 0);
}

//The functions called by the clear functions to do the actual alert boxes etc

function alertFunction(event){
    alert('Alert button was pressed');
}

function confirmFunction(event){
    let confirmResult = confirm('Press a button!');

    outputTag.innerText = `The value returned by the confirm method is : ${confirmResult}`;
}

function promptUnsafeFunction(event){
    let userInput = prompt('Please enter your input', '');

    if(userInput == null){
        outputTag.innerText = 'User didn\'t enter anything';
    }
    else{
        outputTag.innerText = `The user entered: ${userInput}`;
    }
}

function promptSafeFunction(event){
    function myTemplateTag(strings, inputExp){
        let str0 = strings[0];

        return `(Safe Mode) ${str0} ${inputExp}`;
    }


    let userInput = prompt('Please enter your input', '');
    let cleanedInput = DOMPurify.sanitize(userInput);

    let finalOutput = myTemplateTag`The user entered: ${cleanedInput}`;

    if(userInput == null){
        outputTag.innerText = 'User didn\'t enter anything';
    }
    else{
        outputTag.innerText = finalOutput;
    }

}


document.addEventListener('DOMContentLoaded', () =>
    {
        outputTag = document.getElementById('outputTag');

        const alertButton = document.getElementById('alertButton');
        alertButton.addEventListener('click', clearBeforeAlert);

        const confirmButton = document.getElementById('confirmButton');
        confirmButton.addEventListener('click', clearBeforeConfirm);

        const promptButtonUnsafe = document.getElementById('promptButtonUnsafe');
        promptButtonUnsafe.addEventListener('click', clearBeforePromptUnsafe);

        const promptButtonSafe = document.getElementById('promptButtonSafe');
        promptButtonSafe.addEventListener('click', clearBeforePromptSafe);
    }
)
