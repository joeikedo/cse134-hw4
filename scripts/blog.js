//Used to pass current post id being deleted/edited
window.currentPostId = ''; 

//The array that stores the Post info. Only for testing, will replace with local storage.
let postInfoArray = [];
function setupLocalStorage(){
    //Check first if the key is in local storage. If not we need to create it for first time.
    if (localStorage.getItem('blogPostArrayKey') === null) {
        //Need to prepopulate list if first time. 
        let templateArray = [];
        const templateItem1 = {parentId: '422cf175-8c97-4d8d-8d3e-bdf8620670e3', summary: 'Today I went to the park. It was fun.', date: '2022-07-25', title: 'Fun Day'};
        const templateItem2 = {parentId: 'dd2e1b0b-349d-4577-a8c0-b7d262844379', summary: 'Today was ok. I did not do very much.', date: '2022-07-26', title: 'Ok Day'};
        const templateItem3 = {parentId: 'd97c3fa5-6c9a-4296-9380-5dc09d9c6d21', summary: 'Today was interesting. I saw a musical event.', date: '2022-07-27', title: 'Interesting Day'};
        templateArray.push(templateItem1);
        templateArray.push(templateItem2);
        templateArray.push(templateItem3);
        localStorage.setItem('blogPostArrayKey', JSON.stringify(templateArray));
    }

    postInfoArray = JSON.parse(localStorage.getItem('blogPostArrayKey'));

}

//Get the post list, so you can add to it.
let postListTag =  document.getElementById('postList');
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
    //Pull items from local storage.
    setupLocalStorage();
    //Display local stored items.
    injectListItems();


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
                localStorage.setItem('blogPostArrayKey', JSON.stringify(postInfoArray));

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
                localStorage.setItem('blogPostArrayKey', JSON.stringify(postInfoArray));

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

                localStorage.setItem('blogPostArrayKey', JSON.stringify(postInfoArray));
                
                injectListItems();
                window.currentPostId = '';
            }
        }
    )

})
