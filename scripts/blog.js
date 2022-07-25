//The array that stores the Post info. Only for testing, will replace with local storage.
window.postInfoArray = [];

//Add Post
let addPostDialog;
let addPostInput;
function addPostFunction(event){
    postInput.value = '';
    addPostDialog.showModal();
}



document.addEventListener('DOMContentLoaded', () =>
{
    //Get the post list, so you can add to it.
    const postListTag = document.getElementById('postList');

    //Add Post
    addPostInput = document.getElementById('postInput');
    const addPostButton = document.getElementById('addPostButton');
    addPostButton.addEventListener('click', addPostFunction);

    addPostDialog = document.getElementById('addPostDialog');
    addPostDialog.addEventListener('close', () =>
        {
            if(addPostDialog.returnValue == 'cancel'){
                //TODO delete this console.log after!!!!!!
                console.log(postInfoArray);
            }
            else if(addPostDialog.returnValue == 'ok'){
                //Add the new post to local storage so it can be retrieved on subsequent page loads.
                postInfoArray.push(postInput.value);

                //Add the actual post info to the markup of the page
                const idNumber = postInfoArray.length - 1;
                const newPost = `<li class="postListItem" id=${idNumber}>#${idNumber}: ${postInput.value} <button onclick="deletePost('${idNumber}')">Delete</button></li>`
                postListTag.innerHTML = postListTag.innerHTML + newPost;
            }
        }
    )

})
