let outputTag;

// Alert
function alertFunction(event){
    const alertDialog = document.getElementById('alertDialog');
    outputTag.innerText = '';

    alertDialog.showModal();
}

//Confirm
let confirmDialog;
function confirmFunction(event){
    outputTag.innerText = '';

    confirmDialog.showModal();
}

//Prompt
let promptUnsafeDialog;
let unsafeInput;
function promptUnsafeFunction(event){
    outputTag.innerText = '';
    unsafeInput.value = '';
    promptUnsafeDialog.showModal();
}

//Prompt Safer
let promptSafeDialog;
let safeInput;
function promptSafeFunction(event){
    outputTag.innerText = '';
    safeInput.value = '';
    promptSafeDialog.showModal();
}


document.addEventListener('DOMContentLoaded', () =>
    {
        outputTag = document.getElementById('outputTag');

        //Alert
        const alertButton = document.getElementById('alertButton');
        alertButton.addEventListener('click', alertFunction);

        //Confirm
        const confirmButton = document.getElementById('confirmButton');
        confirmButton.addEventListener('click', confirmFunction);
        confirmDialog = document.getElementById('confirmDialog');

        confirmDialog.addEventListener('close', () =>
            {
                outputTag.innerText = `The value returned by the confirm method is : ${confirmDialog.returnValue}`;
            }
        )
        
        //Prompt
        unsafeInput = document.getElementById('unsafeInput');
        const promptButtonUnsafe = document.getElementById('promptButtonUnsafe');
        promptButtonUnsafe.addEventListener('click', promptUnsafeFunction);
        promptUnsafeDialog = document.getElementById('promptUnsafeDialog');

        promptUnsafeDialog.addEventListener('close', () =>
            {
                if(promptUnsafeDialog.returnValue == 'cancel'){
                    outputTag.innerText = 'User didn\'t enter anything';
                }
                else if(promptUnsafeDialog.returnValue == 'ok'){
                    outputTag.innerText = `The user entered: ${unsafeInput.value}`;
                }
            }
        )

        //Safer Prompt
        safeInput = document.getElementById('safeInput');
        const promptButtonSafe = document.getElementById('promptButtonSafe');
        promptButtonSafe.addEventListener('click', promptSafeFunction);
        promptSafeDialog = document.getElementById('promptSafeDialog');

        promptSafeDialog.addEventListener('close', () =>
            {
                if(promptSafeDialog.returnValue == 'cancel'){
                    outputTag.innerText = 'User didn\'t enter anything';
                }
                else if(promptSafeDialog.returnValue == 'ok'){

                    function myTemplateTag(strings, inputExp){
                        let str0 = strings[0];
                
                        return `(Safe Mode) ${str0} ${inputExp}`;
                    }

                    let cleanedInput = DOMPurify.sanitize(safeInput.value);

                    let finalOutput = myTemplateTag`The user entered: ${cleanedInput}`;

                    outputTag.innerText = finalOutput;
                }
            }
        )

    }
)