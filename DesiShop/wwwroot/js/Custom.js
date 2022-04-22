
var datatable = "";
var datatable1 = "";

function Datatable_Net() {
    if ($.fn.dataTable?.ext)
    $.fn.dataTable.ext.errMode = 'none';

    datatable= $("#datatables").DataTable({


        order: [[2, 'desc']],
        dom:
            '<"d-flex justify-content-between align-items-center header-actions mx-1 row mt-75"' +
            '<"col-lg-12 col-xl-6" l>' +
            '<"col-lg-12 col-xl-6 pl-xl-75 pl-0"<"dt-action-buttons text-xl-right text-lg-left text-md-right text-left d-flex align-items-center justify-content-lg-end align-items-center flex-sm-nowrap flex-wrap mr-1"<"mr-1"f>B>>' +
            '>t' +
            '<"d-flex justify-content-between mx-2 row mb-1"' +
            '<"col-sm-12 col-md-6"i>' +
            '<"col-sm-12 col-md-6"p>' +
            '>',
        language: {
            sLengthMenu: 'Show _MENU_',
            search: 'Search',
            searchPlaceholder: 'Search..'
        },
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.modal({
                    header: function (row) {
                        var data = row.data();
                        return "";
                    }
                }),
                renderer: $.fn.dataTable.Responsive.renderer.tableAll({
                    tableClass: 'table'
                   
                })
            }
        },
       

        buttons: [
            {
                
                init: function (api, node, config) {
                    $(node).hide();
                }
            }
        ],

        language: {
            paginate: {
                // remove previous & next text from pagination
                previous: '&nbsp;',
                next: '&nbsp;'
            }
        }
    });
}

function Datatable_NetById(tableId) {
    if ($.fn.dataTable?.ext)
        $.fn.dataTable.ext.errMode = 'none';
    datatable1 =  $("#" + tableId).DataTable({


        order: [[2, 'desc']],
        dom:
            '<"d-flex justify-content-between align-items-center header-actions mx-1 row mt-75"' +
            '<"col-lg-12 col-xl-6" l>' +
            '<"col-lg-12 col-xl-6 pl-xl-75 pl-0"<"dt-action-buttons text-xl-right text-lg-left text-md-right text-left d-flex align-items-center justify-content-lg-end align-items-center flex-sm-nowrap flex-wrap mr-1"<"mr-1"f>B>>' +
            '>t' +
            '<"d-flex justify-content-between mx-2 row mb-1"' +
            '<"col-sm-12 col-md-6"i>' +
            '<"col-sm-12 col-md-6"p>' +
            '>',
        language: {
            sLengthMenu: 'Show _MENU_',
            search: 'Search',
            searchPlaceholder: 'Search..'
        },
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.modal({
                    header: function (row) {
                        var data = row.data();
                        return "";
                    }
                }),
                renderer: $.fn.dataTable.Responsive.renderer.tableAll({
                    tableClass: 'table'

                })
            }
        },


        buttons: [
            {

                init: function (api, node, config) {
                    $(node).hide();
                }
            }
        ],

        language: {
            paginate: {
                // remove previous & next text from pagination
                previous: '&nbsp;',
                next: '&nbsp;'
            }
        }
    });
}



$(document).ready(function () {
    $("#btnlogout").click(function () {

        Cookies.remove('AccessToken')
        window.location.reload();
    });
    
});
$('.dropdownchild') // Use selector $('body[data-open="hover"] .header-navbar .dropdown') for menu and navbar DD open on hover
    .on('click', function () {
        if (!$(this).parent.hasClass('show')) {
            $(this).parent.addClass('show');
        } else {

        }
    })
function ChangeDateTimeFormat(datetime) {

    var date = new Date(datetime);
    var time = new Date(datetime);
    date = date.toLocaleDateString();
    time = time.toLocaleTimeString();

    return date + " " + time;
}

function FileUpload(files,fileName=null)
{
        return new Promise(function (myResolve, myReject) {

            var formData = new FormData();
            var totalFiles = files.length;


            for (var a = 0; a < totalFiles; a++) {
                var file = files[a];
                if (fileName !== null) {
                    formData.append("files", file, fileName);
                }
                else {
                    formData.append("files", file);
                }
            }

            $.ajax({
                type: 'Post',
                url: '/api/Upload/FileUpload',
                data: formData,
                contentType: false,
                dataType: "json",
                processData: false,
                success: function (response) {
                    if (response != null) {
                        myResolve(response);

                    } else {
                        myReject("File Not Uploaded")
                    }
                }
            });
        })
    }


    function addActiveClass() {

        let element = $(".nav-item").children("[href='" + window.location.pathname + "']").parent();
        element.addClass("active");
        element.parent().parent().click();
}