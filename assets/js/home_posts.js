{
  //method to delete a post from dom
  function deletePost(element) {
    element.click((e) => {
      e.preventDefault()
      console.log('the target  is', e.target)
      $.ajax({
        type: 'get',
        url: element.prop('href'),
        success: function (data) {
          console.log(data)
          $(`#post-${data.data.postId}`).remove()
          new Noty({
            text: 'post removed',
            type: 'success',
            theme: 'relax',
            layout: 'topRight',
            timeout: 1500,
          }).show()
        },
        error: function (err) {
          console.log('could not remove the element', err.responseText)
        },
      })
    })
  }

  //method to add a post to dom
  function createPost(post) {
    console.log('the data is ', post)
    $('.posts-list-container > ul').prepend(
      `<li id="post-${post._id}">         
                <p>
                ${post.content}
                <a class="delete-post-button" id="delete-post-button-${post._id}"  href="/posts/delete/${post._id}" ><i class="fas fa-trash-alt"></i></a>
                </p>
                <small><span>Author :</span>${post.user.name}</small>  
                    <div class="commment-container">
                        <form action="/comments/create" method="POST">
                            <input type="text" name="comment" placeholder="comment here" required>
                            <input type="hidden" name="post" value=${post._id}>
                            <input type="submit"  >
                        </form>
                    </div>
                    <div class="post-comments-list">
                    </div>   
            </li>`
    )
    deletePost($(`#delete-post-button-${post._id}`))
  }

  //create a post in the backend
  function submit() {
    let newPostForm = $('#new-post-form')
    newPostForm.submit((e) => {
      e.preventDefault()
      //console.log(newPostForm.serialize());

      //one way of sending a post request
      // $.post( "/posts/create",newPostForm.serialize())
      // .done(function( data ) {
      //     alert( "Data Loaded: " + data );
      // })
      // .fail((e)=>{
      //    console.log(e);
      // })

      //another way of sending a post request
      $.ajax({
        type: 'post',
        url: '/posts/create',
        data: newPostForm.serialize(),
        success: (data) => {
          console.log(data.data.post)
          createPost(data.data.post)
          new Noty({
            text: 'post added',
            type: 'success',
            theme: 'relax',
            layout: 'topRight',
            timeout: 1500,
          }).show()
          newPostForm.val('')
        },
        error: (err) => {
          console.log(err.responseText)
        },
      })
    })
  }

  submit()

  //calling the deletePost method on all the posts to add the ajax way of deleting
  //using arrow function in the callback was causing the problem
  $('.delete-post-button').each(function () {
    deletePost($(this))
  })

  //displaying the comments in the page
  function displayComment(comment) {
    $(`#comments-${comment.post}`).prepend(
      `<p id="comment-${comment._id}">
            ${comment.comment} by : ${comment.user.name}
                <span><a href="/comments/delete/${comment._id}" class="delete-comment"><i class="fas fa-trash-alt"></i></a></span> 
        </p>`
    )
  }
  //adds the ajax way of deleting on the target comment
  function deleteComments(target) {
    target.click((e) => {
      e.preventDefault()
      $.ajax({
        type: 'get',
        url: target.attr('href'),
        success: (data) => {
          $(`#comment-${data.data.comment._id}`).remove()
          console.log('successfully removed comment using ajax')
          new Noty({
            text: 'comment deleted',
            type: 'success',
            theme: 'relax',
            layout: 'topRight',
            timeout: 1500,
          }).show()
        },
      })
    })
  }

  //adding comments in the database
  function addComments() {
    $('.commment-container form').each(function () {
      $(this).submit((e) => {
        e.preventDefault()
        $.ajax({
          url: '/comments/create',
          type: 'post',
          data: $(this).serialize(),
          success: (data) => {
            console.log('the addComment data received is', data)
            displayComment(data.data.comment)
            new Noty({
              text: 'comment added',
              type: 'success',
              theme: 'relax',
              layout: 'topRight',
              timeout: 1500,
            }).show()
            deleteComments(
              $(`a[href='/comments/delete/${data.data.comment._id}']`)
            )
            $('commment-container > input[type="text"]').val('')
          },
          error: (err) => {
            console.log(err)
          },
        })
      })
    })
  }

  //calling this function adds the ajax way of adding comments to the posts
  addComments()

  //calling delete method on the comments
  $('.delete-comment').each(function () {
    deleteComments($(this))
  })
}
