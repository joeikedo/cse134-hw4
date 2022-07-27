function mailFunction(event){
    event.preventDefault();

    const subjectLineInput = document.getElementById('subjectLine');
    const emailMessageInput = document.getElementById('message');

    document.location.href = `mailto:joeikedo@gmail.com?subject=${subjectLineInput.value}&body=${emailMessageInput.value}`;
}

document.addEventListener('DOMContentLoaded', () =>
    {
        const emailSubmitButton = document.getElementById('emailSubmitButton');
        emailSubmitButton.addEventListener('click', mailFunction);
    }
)