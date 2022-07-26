//Used to pass current post id being deleted/edited
window.currentPostId = ''; 
//The array that stores the Post info. Only for testing, will replace with local storage.
let postInfoArray = [];

let postListTag;
function injectListItems(){
    let postAggregate = '';
    for(let i = 0; i < postInfoArray.length; i++){
        postAggregate = postAggregate + `<li id="${postInfoArray[i].parentId}">${postInfoArray[i].title} - (${postInfoArray[i].date}): ${postInfoArray[i].summary} <button data-parent-id-edit="${postInfoArray[i].parentId}" data-parent-summary="${postInfoArray[i].summary}" data-parent-title="${postInfoArray[i].title}" data-parent-date="${postInfoArray[i].date}" onclick="editPost(this.getAttribute('data-parent-id-edit'), this.getAttribute('data-parent-summary'), this.getAttribute('data-parent-title'), this.getAttribute('data-parent-date'))">Edit</button><button data-parent-id="${postInfoArray[i].parentId}" onclick="deletePost(this.getAttribute('data-parent-id'))">Delete</button></li>`
    }
    postListTag.innerHTML = postAggregate;
} 


//Add Post
let addPostDialog;
let addTitleInput;
let addPostInput;
let addDateInput;
function addPostFunction(event){
    addPostInput.value = '';
    addDateInput.value = '';
    addTitleInput.value = '';
    addPostDialog.showModal();
}



document.addEventListener('DOMContentLoaded', () =>
{
    //Get the post list, so you can add to it.
    postListTag = document.getElementById('postList');

    //Add Post
    addPostInput = document.getElementById('postInput');
    addDateInput = document.getElementById('addDate');
    addTitleInput = document.getElementById('addTitle');
    const addPostButton = document.getElementById('addPostButton');
    addPostButton.addEventListener('click', addPostFunction);

    addPostDialog = document.getElementById('addPostDialog');
    addPostDialog.addEventListener('close', () =>
        {
            if(addPostDialog.returnValue == 'cancel'){
                //TODO delete this console.log after!!!!!!
                console.log(postInfoArray); //Just for testing!!!!!
            }
            else if(addPostDialog.returnValue == 'ok'){
                //Add the new post to local storage so it can be retrieved on subsequent page loads.
                const postId = crypto.randomUUID();
                const newPost = {parentId: postId, summary: addPostInput.value, date: addDateInput.value, title: addTitleInput.value}
                postInfoArray.push(newPost);

                //Add the actual post info to the markup of the page
                injectListItems();
            }
        }
    )

    const deletePostDialog = document.getElementById('deletePostDialog');
    deletePostDialog.addEventListener('close', ()=> 
        {
            if(deletePostDialog.returnValue == 'ok'){
                const filteredArray = postInfoArray.filter(function(e) { return e.parentId !== window.currentPostId });
                postInfoArray = filteredArray;
                injectListItems();
                window.currentPostId = '';
            }
        }
    )

    const editPostDialog = document.getElementById('editPostDialog');
    editPostDialog.addEventListener('close', ()=>  
        {
            if(editPostDialog.returnValue == 'ok'){
                const editInputValue = document.getElementById('editPostInput').value;
                const editTitleValue = document.getElementById('editTitle').value;
                const editDateValue = document.getElementById('editDate').value;

                const indexOfObject = postInfoArray.findIndex((obj => obj.parentId == window.currentPostId));
                
                postInfoArray[indexOfObject].summary = editInputValue;
                postInfoArray[indexOfObject].title = editTitleValue;
                postInfoArray[indexOfObject].date = editDateValue;
                
                injectListItems();
                window.currentPostId = '';
            }
        }
    )

})
