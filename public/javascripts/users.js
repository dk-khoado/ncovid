var dataCachly = [];
$(document).ready(function () {

    loadCachLy();

});

function loadCachLy() {
    $.get('/users/cachly', (data, status) => {
        dataCachly = data;
        $('#usersCachLy').DataTable({
            "destroy": true,
            data: data,
            columns: [
                { data: 'ho_ten' },
                { data: 'CMND' },
                {
                    "render": function (data, type, row, meta) {
                        var date = new Date(row.ngay_bat_dau);
                        return `${date.toLocaleDateString()}`;
                    }
                },
                { data: 'so_ngay' },
                {
                    "render": function (data, type, row, meta) {
                        var date = new Date(row.ngay_bat_dau);
                        date.setDate(date.getDate() + row.so_ngay);
                        return `${date.toLocaleDateString()}`;
                    }
                },
                {
                    "render": function (data, type, row, meta) {
                        var dateEnd = new Date(row.ngay_bat_dau);
                        dateEnd.setDate(dateEnd.getDate() + row.so_ngay)

                        if (dateEnd < new Date()) {
                            return "Đã hoàn thành cách ly"
                        }
                        return `Đanh cách ly`;
                    }
                },
                {
                    "render": function (data, type, row, meta) {
                        return `<a href="/cachly/checking/${row.id}" class="btn btn-default"><em class="fa fa-eye"></em></a>`;
                    }
                }
            ]
        });
    });
    
    $.get('/users/khaibao', (data, status) => {
        $('#users').DataTable({
            "destroy": true,
            data: data,
            columns: [
                { data: 'ho_ten' },
                { data: 'CMND' },
                { data: 'dia_chi' },
                {
                    "render": function (data, type, row, meta) {
                        var result= "";
                        if (row.sot != "không") {
                            result +="sốt ,";
                        }
                        if (row.ho != "không") {
                            result +="ho ,";
                        }
                        if (row.kho_tho != "không") {
                            result +="khó thở,";
                        }
                        if (row.dau_hong != "không") {
                            result +="đau họng ,";
                        }
                        if (row.buon_non != "không") {
                            result +="buồn nôn ,";
                        }
                        if (row.tieu_chay != "không") {
                            result +="tiêu chảy";
                        }
                        
                        if (result.length > 0) {
                            return result;
                        }
                        return "không có biểu hiện";
                    }
                },
                {
                    "render": function (data, type, row, meta) {
                        return `<a class="btn btn-default" href="/user/edit/${row.id}"><em class="fa fa-pencil"></em></a>`;
                    }
                }
            ]
        });
    });
}

function themNguoiCachLy(id, soNgay) {
    $.post('/users/cachly', { id: id, soNgay: soNgay }, (data) => {
        $('#modalConfirm').modal("hide");
        $('#modalMessage').modal({ backdrop: 'static' });
        if (data.status) {
            $("#result").html(`<b>Tên đăng nhập:</b> ${data.data[0].username} <br/> <b>mật khẩu:</b> ${data.data[0].PASSWORD}`);
            loadCachLy();
        } else {
            $("#result").text("hệ thống tạm thời bị lỗi");
        }
    })
}

function showDialog() {

    $.get('/users/khaibao', (data, status) => {
        var khaibaoData = [];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];            
            var id = dataCachly.findIndex(v => v.id == element.id);
            console.log(id);
            if (id == -1) {
                khaibaoData.push(element);
            }
        }
        $('#users_model').DataTable({
            "destroy": true,
            data: khaibaoData,
            columns: [
                { data: 'ho_ten' },
                { data: 'CMND' },
                {
                    "render": function (data, type, row, meta) {
                        return `<a class="btn btn-success" onclick="selectUserCachLy(${row.id}, '${row.ho_ten}')">Thêm</a>`;
                    }
                }
            ]
        });

        $('#modalThemCachLy').modal({ backdrop: 'static', keyboard: false })
    });
}

function selectUserCachLy(id, hoten) {
    $('#modalThemCachLy').modal("hide")
    $('#modalConfirm').modal({ backdrop: 'static', keyboard: false })
    $("#hoten").text(hoten);
    $("#btnThemNguoiCachLy").unbind("click");

    $("#btnThemNguoiCachLy").click(() => {
        themNguoiCachLy(id, $("#soNgay").val());
    });
}
