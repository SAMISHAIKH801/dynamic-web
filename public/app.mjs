window.createPost = function () {

    let postTitle = document.querySelector("#postTitle").value;
    let postText = document.querySelector("#postText").value;
    let postPrice = document.querySelector("#postPrice").value;

    axios
    .post(`/api/v1/post`, {
         title: postTitle,
         text: postText,
         price: postPrice
    })
        .then(function (response) {
            console.log(response.data);
            document.querySelector("#result").innerHTML =
                response.data;

                getAllPost()
        })
        .catch(function (error) {
            console.log(error.response.data);
            document.querySelector("#result").innerHTML =
                "post not created";
        });
};

 window.getAllPost = function () {

   
    axios
    .get(`/api/v1/posts`, )
        .then(function (response) {
            console.log(response.data);

            let postHtml = ``

            response.data.map((eachPost) =>{
                postHtml += `<div id="card-${eachPost._id}" class="card-post">
                <h2>${eachPost.title}</h2>
                <p>${eachPost.text}</p>
                <h4>${eachPost.price}</h4>

                <button onclick="deletePost('${eachPost._id} ')" >DELETE</button>
                <button onclick="editPost('${eachPost._id}', '${eachPost.title}', '${eachPost.text}')">EDIT</button>
                </div>`

                
            })
            document.querySelector("#posts").innerHTML = postHtml
        })
        .catch(function (error) {
            console.log(error);
            
            
            // if(error.response.status === 401){
            //     window.location.href = '/login.html'
            // }
            document.querySelector("#posts").innerHTML = `error`
               
        });
};


window.deletePost = function (postId) {

    console.log('delete', postId);
   
    axios
    .delete(`/api/v1/post/${postId}`, )
        .then(function (response) {
            console.log(response.data);

            getAllPost()

           
        })
        .catch(function (error) {
            console.log(error.response.data);
            
            document.querySelector("#posts").innerHTML = `error`
               
        });
};

window.editPost =  (postId, title, text) => {

    console.log('edit', postId);

    document.querySelector(`#card-${postId}`).innerHTML = 
    `<form  onsubmit="savePost('${postId}') " >
       Title:  <input type="text" value='${title}' id="title-${postId}" /> 
        <br />
        Text:   <input type="text" value='${text}' id="text-${postId}" />
        <br />
       <button>Save</button>
    </form>`

   
    
};

window.savePost = (postId) =>{
     const updatedTitle = document.querySelector(`#title-${postId}`).value
     const updatedText = document.querySelector(`#text-${postId}`).value

     axios
    .put(`/api/v1/post/${postId}`, {
        title: updatedTitle,
        text: updatedText
    } )
        .then(function (response) {
            console.log(response.data);

            
           getAllPost()
            

           
        })
        .catch(function (error) {
            console.log(error.response.data);
            
            document.querySelector("#result").innerHTML = `error`
               
        });
}