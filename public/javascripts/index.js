var isSuccs = false;

var obj = new class {
    a(params) {
        return `function run(){
            console.log("aa");
        }`;
    }
}

function optionComponemt(id, name) {
    return `<option value="${id}">${name}</option>`;
}
function loadQuanHuyen() {
    var id = $("#valueThanhPho").val();
    if (id != "") {
        $.get("/quanHuyen/" + id, function (data, status) {
            $("#valueQuanHuyen").html("");
            $("#valueQuanHuyen").append(`<option selected value="-1">Chọn</option>`);
            data.forEach(element => {
                $("#valueQuanHuyen").append(optionComponemt(element.id, element.name));
            });
        });
    } else {
        $("#valueQuanHuyen").html("");
        $("#valueQuanHuyen").append(`<option selected value="">Chọn</option>`);
    }

}

function loadPhuongXa() {
    var id = $("#valueQuanHuyen").val();
    if (id != "") {
        $.get("/phuongXa/" + id, function (data, status) {
            $("#valuePhuongXa").html("");
            $("#valuePhuongXa").append(`<option selected value="-1">Chọn</option>`);
            data.forEach(element => {
                $("#valuePhuongXa").append(optionComponemt(element.id, element.name));
            });
        });
    } else {
        $("#valuePhuongXa").html("");
        $("#valuePhuongXa").append(`<option selected value="">Chọn</option>`);
    }

}


function kiemTraCMND() {
    var CMND = $("#mySoCMND").val();
    if (CMND.length > 0) {
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