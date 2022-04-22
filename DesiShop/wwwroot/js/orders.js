$.get("/api/Order/OrderList", function (res) {
        $.each(res.data, function (ind, val) {
            console.log(val)
            let Status = "";
            switch (val.orderStatus) {
                case 0:
                    Status = "Pending";
                    break;
                case 1:
                    Status = "Approved";
                    break;
                case 2:
                    status = "Deliverd";
                    break;
            }
            $("#orderList").append(`<tr><td>#${val.orderId}</td><td>${val.name}</td><td>${ChangeDateTimeFormat(val.insertedDateTime)}</td><td>${Status}</td><td>${val.address}</td></tr>`);
        })
    Datatable_Net();
})