
$(document).ready(function () {
    var table = "";
    var updateCategory = "";
    var CategoryId = "";

    var updateSubCategory = "";
    var SubCategoryId = "";
    GetAllCategories();

    function GetAllCategories() {
        $.get("/api/Categories/GetCategories", function (response) {

            if ($.fn.DataTable.isDataTable(datatable1)) {
                datatable1.clear().draw();
                datatable1.destroy();
            }

            $.each(response.data, function (Index, value) {

                var CategoryList = '<div class="d-flex align-items-center col-actions">' +
                    '<a class="mr-1 EditCategory" href="javascript:void(0);" id="EditCategory' + value.categoryId + '" data-toggle="tooltip" data-placement="top" title="Edit Category">' +
                    feather.icons['edit'].toSvg({ class: 'font-medium-2' }) +
                    '</a>' +
                    '<a class="mr-1 DeleteCategory" href="javascript:void(0);" id="DeleteCategory' + value.categoryId + '" data-toggle="tooltip" data-placement="top" title="Delete Category">' +
                    feather.icons['trash-2'].toSvg({ class: 'font-medium-2' }) +
                    '</a>'
                '</div>';
                if (value.parentName == null) {
                    value.parentName = "No Parent Category";
                }
                $("#categoryList").append("<tr><td>" + value.title + "</td><td id='parentcategory" + value.parentCategory + "'>" + value.parentName + "</td><td>" + CategoryList + "</td></tr>");


            });
            Datatable_NetById('tblCategoryList');

            $("#parent-category").html('');

            $("#parent-category").append(" <option disabled selected value='0'>Select Parent Category</option><option value='0'>No Parent Category</option>");
            $("#update-parent-category").html('');

            $("#update-parent-category").append(" <option disabled value='0'>Select Parent Category</option>");

            $.each(response.data, function (index, value) {

                $("#update-parent-category").append(" <option value='" + value.categoryId + "'>" + value.title + "</option>");

                $("#parent-category").append(" <option value='" + value.categoryId + "'>" + value.title + "</option>");
            });

        });

    }



    $(document).on('click', '.DeleteCategory', function () {
        var id = $(this).attr('id');
        id = id.replace("DeleteCategory", "");

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {

                $.ajax({
                    type: "DELETE",
                    url: "/api/Categories/DeleteCategory/" + id,
                    contentType: 'application/json',
                    success: function (response) {


                        if (response.message === "Category Deleted Successfully") {

                            toastr['success'](response.message, 'Success!', {
                                closeButton: true,
                                tapToDismiss: false
                            });
                            $("#DeleteCategory" + response.data.id).closest('tr').remove();

                        }
                        else {

                            toastr['error'](response.message, 'Error!', {
                                closeButton: true,
                                tapToDismiss: false
                            });
                        }
                    },

                });

            }
        });

    });


    $(document).on('click', '.EditCategory', function () {

        CategoryId = $(this).attr('id');
        CategoryId = SubCategoryId.replace("EditCategory", "");
        updateCategory = $(this).closest('tr');

        var Categoryname = $(updateCategory).find('td').eq(0).html();
        var ParentCategoryId = $(updateCategory).find('td').eq(1).attr('id');
        ParentCategoryId = ParentCategoryId.replace("parentcategory", "");
        $('#updateCategoryName').val(Categoryname);
        $('#update-parent-category option').prop('selected', false);
        $('#update-parent-category option[value=' + ParentCategoryId + ']').prop('selected', true);
        $('#categoryupdate').modal('show')

    });


    $('#btnSubUpdateCategory').click(function () {
        var SubCategoryname = $("#updateSubCategoryName").val();
        var ParentCategoryId = $("#update-parent-category option:selected").val();
        var jsonObject = { "subCategoryId": SubCategoryId, "subCategoryName": SubCategoryname, "parentCategoryId": ParentCategoryId };
        $.ajax({
            type: "POST",
            url: "/v1/ProductApi/UpdateSubProductCategories",
            data: JSON.stringify(jsonObject),
            contentType: 'application/json',
            success: function (response) {
                if (response.message == "SubCategory Updated Successfully") {

                    $(updateSubCategory).find('td').eq(0).html("&nbsp;  &nbsp;  &nbsp;"+SubCategoryname);
                    $(updateSubCategory).find('td').eq(1).html($("#update-parent-category option:selected").text());
                   

                    toastr['success']('SubCategory Updated Successfully', 'Success!', {
                        closeButton: true,
                        tapToDismiss: false
                    });


                } else {

                    toastr['error'](response.message, 'Error!', {
                        closeButton: true,
                        tapToDismiss: false
                    });

                }

            },
        });
        $('#Subcategoryupdate').modal('hide');

    });



    $('#btnUpdateCategory').click(function () {
        var Categoryname = $("#updateCategoryName").val();
        var jsonObject = { "categoryId": CategoryId, "categoryTitle": Categoryname };
        $.ajax({
            type: "POST",
            url: "/v1/ProductApi/UpdateProductCategories",
            data: JSON.stringify(jsonObject),
            contentType: 'application/json',
            success: function (response) {
                if (response.message == "Category Updated Successfully") {

                    $(updateCategory).find('td').eq(0).html(Categoryname);


                    toastr['success']('Category Updated Successfully', 'Success!', {
                        closeButton: true,
                        tapToDismiss: false
                    });


                } else {

                    toastr['error'](response.message, 'Error!', {
                        closeButton: true,
                        tapToDismiss: false
                    });

                }

            },
        });
        $('#categoryupdate').modal('hide');

    });



    $('#btnsubmit').click(function () {
        var Categoryname = $("#bcategoryName").val();
        var ParentCategoryName = $("#parent-category option:selected").text();
        var ParentCategoryId = $("#parent-category option:selected").val();
        var InsertedbyId = Cookies.get("str1");
        if (Categoryname.length == 0) {

            toastr['warning']('Please Fill the Form', 'Warning!', {
                closeButton: true,
                tapToDismiss: false
            });

        }
        else {
            if (ParentCategoryName == "Select Parent Category" || ParentCategoryName == "No Parent Category") {
                ParentCategoryId = null;
            }

                var jsonObject = { "title": Categoryname, "ParentCategory": ParentCategoryId };
                $.ajax({
                    type: "POST",
                    url: "/api/Categories/AddCategory",
                    data: JSON.stringify(jsonObject),
                    contentType: 'application/json',
                    success: function (response) {
                        if (response.message == "Category Inserted Successfully") {


                            toastr['success']('Category Created Successfully', 'Success!', {
                                closeButton: true,
                                tapToDismiss: false
                            });


                        } else {

                            toastr['error'](response.message, 'Error!', {
                                closeButton: true,
                                tapToDismiss: false
                            });

                        }
                        $("#bcategoryName").val("");
                        GetAllCategories();
                    },
                });
           
        }
    });
});