function getFields(input, field) {
    var output = [];
    for (var i = 0; i < input.length; ++i)
        output.push(input[i][field]);
    return output;
}
$(document).ready(function () {

    $.get("/api/User/NewUsers", function (response) {

        if ($.fn.DataTable.isDataTable(datatable)) {
            datatable.clear().draw();
            datatable.destroy();
        }
        $.each(response, function (Index, value) {
            $("#userList").append("<tr><td> " + value.name + " </td><td> " + value.email + " </td><td> " + value.roleName + " </td><td> " + ChangeDateTimeFormat(value.createdDateTime) + " </td></tr>");


        });
        Datatable_Net();
    });
    $.get("/api/Categories/GetCategoryLogs", function (res) {
       let barChartConfig = {
            chart: {
               height: 300,
               width: 500,
                type: 'bar',
                parentHeightOffset: 0,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: '30%',
                    endingShape: 'rounded'
                }
            },
            grid: {
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                padding: {
                    top: -15,
                    bottom: -10
                }
            },
            colors: window.colors.solid.info,
            dataLabels: {
                enabled: false
            },
            series: [
                {
                    data: getFields(res, "count")
                }
            ],
            xaxis: {
                categories: getFields(res, "title")
            },
            yaxis: {
                opposite: true
            }
        };

        var chart = new ApexCharts(document.querySelector("#chart"), barChartConfig);
        chart.render();
    })

});