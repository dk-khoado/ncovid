function itemListQuanHuyen(content = "", id = -1) {
    return `<div  class="list-group-item" style="cursor: pointer;"
    onclick="loadPhuongXa(${id})">${content}</div>`
}

function itemListPhuongXa(content = "", id = -1) {
    return `<div  class="list-group-item" style="cursor: pointer;"
    onclick="">${content}</div>`
}


function itemListThanhPho(content = "", id = -1) {
    return `<div  class="list-group-item" style="cursor: pointer;"
    onclick="loadQuanHuyen(${id})">${content}</div>`
}

function loadQuanHuyen(id) {
    $("#quanHuyen").html(itemListQuanHuyen("đang load"));
    resetPhuongXa();
    $.get("/quanHuyen/" + id, function (data, status) {

        $("#btnAddQuanHuyen").prop('disabled', false);

        $("#btnModalAddQuanHuyen").unbind("click");
        $("#btnModalAddQuanHuyen").on("click", () => {
            themQuanHuyen(id);
        });

        if (data.length < 1) {
            $("#quanHuyen").html(itemListQuanHuyen("không có quận huyện nào :("));
            return;
        }
        $("#quanHuyen").html("");
        data.forEach(element => {
            $("#quanHuyen").append(itemListQuanHuyen(element.name, element.id));
        });


    });
}

function loadPhuongXa(id) {
    if (id < 0) {
        return;
    }
    $("#phuongXa").html(itemListPhuongXa("đang load"));
    $.get("/phuongXa/" + id, function (data, status) {
        $("#btnAddPhuongXa").prop('disabled', false);

        $("#btnModalAddPhuongXa").unbind("click");
        $("#btnModalAddPhuongXa").on("click", () => {
            themPhuongXa(id);
        });

        if (data.length < 1) {
            $("#phuongXa").html(itemListPhuongXa("không có dữ liệu nào :("));
            return;
        }
        $("#phuongXa").html("");
        data.forEach(element => {
            $("#phuongXa").append(itemListPhuongXa(element.name));
        });
    });
}


function themThanhPho() {
    var name = $("#fieldAddThanhPho").val();
    if (name.length > 0) {
        $.post("/newCity",
            {
                name: name,
            },
            function (data, status) {
                $("#modalThanhPho").modal('hide');

                $.get("/thanhPho", function (data, status) {
                    if (data.length < 1) {
                        $("#thanhPho").html(itemListThanhPho("không có dữ liệu nào :("));
                        resetPhuongXa()
                        return;
                    }
                    $("#thanhPho").html("");
                    data.forEach(element => {
                        $("#thanhPho").append(itemListThanhPho(element.name, element.id));
                    });
                });

            });
    }

}


function themQuanHuyen(idThanhPho) {
    var name = $("#fieldAddQuanHuyen").val();
    if (name.length > 0) {
        $.post("/quanHuyen",
            {
                id: idThanhPho,
                name: name,
            },
            function (data, status) {
                $("#modalQuanHuyen").modal('hide');
                loadQuanHuyen(idThanhPho);
            });
    }

}


function themPhuongXa(idQuanHuyen) {
    var name = $("#fieldAddPhuongXa").val();
    if (name.length > 0) {
        $.post("/phuongXa",
            {
                id: idQuanHuyen,
                name: name,
            },
            function (data, status) {
                $("#modalPhuongXa").modal('hide');
                loadPhuongXa(idQuanHuyen);
            });
    }

}


function resetPhuongXa() {
    $("#phuongXa").html(itemListPhuongXa("vui lòng chọn quận huyện"));
    $("#btnAddPhuongXa").prop('disabled', true);
}