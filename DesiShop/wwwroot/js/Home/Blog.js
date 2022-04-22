$.get("/api/Blog/GetBlogs", function (res) {
    $.each(res, function (ind, val) {
        console.log
       (val)
        $("#blogList").append(` <div class="col-md-4"> <div class="blog__type-grid"> <div class="blog__img"><a href="/post/${val.blogId}"><img src="${val.picture}" alt=""></a></div><div class="blog__content"> <a href="/post/${val.blogId}"><h3 class="blog__title m-t-25">${val.blogTitle}</h3></a> <div class="blog__archive m-t-20"> </div><div class="para m-tb-20"> <p class="para__text">${val.blogDescription}</p></div><a class="btn btn--radius btn--small btn--black btn--black-hover-green" href="/post/${val.blogId}">Read More</a> </div></div></div>`);
    })
})