window.getAllPost = function () {
  axios
    .get(`/api/v1/posts`)
    .then(function (response) {
      console.log(response.data);

      let postHtml = ``;

      response.data.map((eachPost) => {
        postHtml += `<div id="card-${eachPost._id}" class="card-post">
                <img src="./assets/sec 4 products img office.webp" class="d-block w-100"  alt="...">
                <h2>${eachPost.title}</h2>
                <p>${eachPost.text}</p>
                <h4>${eachPost.price}</h4>

                   <div class="star-rating">
                       <span class="star" data-value="1">&#9733;</span>
                       <span class="star" data-value="2">&#9733;</span>
                       <span class="star" data-value="3">&#9733;</span>
                       <span class="star" data-value="4">&#9733;</span>
                       <span class="star" data-value="5">&#9733;</span>
                   </div>



                </div>`;
      });
      document.querySelector("#posts").innerHTML = postHtml;
    })
    .catch(function (error) {
      console.log(error);

      // if(error.response.status === 401){
      //     window.location.href = '/login.html'
      // }
      document.querySelector("#posts").innerHTML = `error`;
    });
};

{
  /* <button onclick="deletePost('${eachPost._id} ')" >DELETE</button>
                <button onclick="editPost('${eachPost._id}', '${eachPost.title}', '${eachPost.text}')">EDIT</button> */
}