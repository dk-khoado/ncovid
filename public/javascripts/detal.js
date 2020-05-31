var isSuccs = true;

function kiemTraCMND(old) {
    var CMND = $("#mySoCMND").val();
    if (CMND.length >0 && old != CMND) {
        $.get("/kiemTraCMND/" + CMND, (data, status) => {
            console.log(data);
            if (data.result > 0) {
                isSuccs = false;
                $("#error").text("CMND đã tồn tại trong hệ thống");
                return;
            }
            $("#error").text("");
            isSuccs = true;
        });
    }

}