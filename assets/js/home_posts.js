

{
    //method to delete a post from dom
    function deletePost(element){
        element.click((e)=>{
            e.preventDefault()
            console.log('the target  is',e.target);
            $.ajax({
                type : 'get',
                url : element.prop('href'),
                success:function(data){
                    console.log(data);
                    $(`#post-${data.data.postId}`).remove()
                },
                error: function(err){
                    console.log('could not remove the element',err.responseText);
                }
            })
        })
        

        
       
        
        
    }

    function createPost(post){
        console.log('the data is ',post);
        $('.posts-list-container > ul').prepend(
            `<li id="post-${post._id}">
                
                    <a class="delete-post-button" id="delete-post-button-${post._id}"  href="/posts/delete/${post._id}" > Delete Post</a>
                
                <p>
                ${post.content}
                </p>
                <small><span>Author is :</span>${post.user.name}</small>
                
                
                
                    
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

    

    function submit(){
        let newPostForm =  $('#new-post-form')
        newPostForm.submit((e)=>{
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
                type : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success : (data)=>{
                    console.log(data.data.post);
                    createPost(data.data.post)
                },
                error : (err)=>{
                    console.log(err.responseText);
                }
            })
        })
    }

    submit()
    
    
}