let outputTag;

// Alert
function alertFunction(event){
    const alertDialog = document.getElementById('alertDialog');
    outputTag.innerHTML = '';

    alertDialog.showModal();
}

//Confirm
let confirmDialog;
function confirmFunction(event){
    outputTag.innerHTML = '';

    confirmDialog.showModal();
}

//Prompt
let promptUnsafeDialog;
let unsafeInput;
function promptUnsafeFunction(event){
    outputTag.innerHTML = '';
    unsafeInput.value = '';
    promptUnsafeDialog.showModal();
}

//Prompt Safer
let promptSafeDialog;
let safeInput;
function promptSafeFunction(event){
    outputTag.innerHTML = '';
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
                outputTag.innerHTML = `The value returned by the confirm method is : ${confirmDialog.returnValue}`;
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
                    outputTag.innerHTML = 'User didn\'t enter anything';
                }
                else if(promptUnsafeDialog.returnValue == 'ok'){
                    outputTag.innerHTML = `The user entered: ${unsafeInput.value}`;
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
                    outputTag.innerHTML = 'User didn\'t enter anything';
                }
                else if(promptSafeDialog.returnValue == 'ok'){

                    function myTemplateTag(strings, inputExp){
                        let str0 = strings[0];
                
                        return `(Safe Mode) ${str0} ${inputExp}`;
                    }

                    let cleanedInput = DOMPurify.sanitize(safeInput.value);

                    let finalOutput = myTemplateTag`The user entered: ${cleanedInput}`;

                    outputTag.innerHTML = finalOutput;
                }
            }
        )

    }
)