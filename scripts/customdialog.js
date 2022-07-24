// Alert
function alertFunction(event){
    const alertDialog = document.getElementById('alertDialog');
    alertDialog.showModal();
}

//Confirm
let confirmDialog;
function confirmFunction(event){
    confirmDialog.showModal();
}

//Prompt
let promptUnsafeDialog;
let unsafeInput;
function promptUnsafeFunction(event){
    unsafeInput.value = '';
    promptUnsafeDialog.showModal();
}

//Prompt Safer
let promptSafeDialog;
let safeInput;
function promptSafeFunction(event){
    safeInput.value = '';
    promptSafeDialog.showModal();
}


document.addEventListener('DOMContentLoaded', () =>
    {
        //Alert
        const alertButton = document.getElementById('alertButton');
        alertButton.addEventListener('click', alertFunction);

        //Confirm
        const confirmButton = document.getElementById('confirmButton');
        confirmButton.addEventListener('click', confirmFunction);
        confirmDialog = document.getElementById('confirmDialog');
        const confirmOutputTag = document.getElementById('confirmOutputTag');

        confirmDialog.addEventListener('close', () =>
            {
                confirmOutputTag.innerText = `The value returned by the confirm method is : ${confirmDialog.returnValue}`;
            }
        )
        
        //Prompt
        unsafeInput = document.getElementById('unsafeInput');
        const promptButtonUnsafe = document.getElementById('promptButtonUnsafe');
        promptButtonUnsafe.addEventListener('click', promptUnsafeFunction);
        promptUnsafeDialog = document.getElementById('promptUnsafeDialog');
        const promptUnsafeOutputTag = document.getElementById('promptUnsafeOutput');

        promptUnsafeDialog.addEventListener('close', () =>
            {
                if(promptUnsafeDialog.returnValue == 'cancel'){
                    promptUnsafeOutputTag.innerText = 'User didn\'t enter anything';
                }
                else if(promptUnsafeDialog.returnValue == 'ok'){
                    promptUnsafeOutputTag.innerText = `The user entered: ${unsafeInput.value}`;
                }
            }
        )

        //Safer Prompt
        safeInput = document.getElementById('safeInput');
        const promptButtonSafe = document.getElementById('promptButtonSafe');
        promptButtonSafe.addEventListener('click', promptSafeFunction);
        promptSafeDialog = document.getElementById('promptSafeDialog');
        const promptSafeOutputTag = document.getElementById('promptSafeOutput');

        promptSafeDialog.addEventListener('close', () =>
            {
                if(promptSafeDialog.returnValue == 'cancel'){
                    promptSafeOutputTag.innerText = 'User didn\'t enter anything';
                }
                else if(promptSafeDialog.returnValue == 'ok'){
                    
                    function myTemplateTag(strings, inputExp){
                        let str0 = strings[0];
                        let str1 = strings[1];
                
                        return `${str0} "${inputExp}" ${str1} Thanks user!`;
                    }

                    let cleanedInput = DOMPurify.sanitize(safeInput.value);

                    let finalOutput = myTemplateTag`The user entered this: ${cleanedInput} in the prompt box.`;

                    promptSafeOutputTag.innerText = finalOutput;
                }
            }
        )

    }
)