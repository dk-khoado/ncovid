$(document).ready(function () {
    $.get('/users/cachly', (data, status) => {
        $('#usersCachLy').DataTable({
            "destroy": true,
            data: data,
            columns: [
                { data: 'ho_ten' },
                { data: 'CMND' },
                { data: 'so_ngay' },
                {
                    "render": function (data, type, row, meta) {
                        return '<a class="btn btn-default"><em class="fa fa-pencil"></em></a> <a class="btn btn-danger"><em class="fa fa-trash"></em></a>';
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
                        return '<a class="btn btn-default"><em class="fa fa-pencil"></em></a> <a class="btn btn-danger"><em class="fa fa-trash"></em></a>';
                    }
                }
            ]
        });
    });

});

function themNguoiCachLy(id, soNgay) {
    $.post('/users/cachly', { id: id, soNgay: soNgay }, (data) => {
        $('#modalConfirm').modal("hide");
        $('#modalMessage').modal({ backdrop: 'static' });
        if (data.status) {            
            $("#result").html(`<b>Tên đăng nhập:</b> ${data.data[0].username} <br/> <b>mật khẩu:</b> ${data.data[0].PASSWORD}`);
            $.get('/users/cachly', (data, status) => {
                $('#usersCachLy').DataTable({
                    "destroy": true,
                    data: data,
                    columns: [
                        { data: 'ho_ten' },
                        { data: 'CMND' },
                        { data: 'so_ngay' },
                        {
                            "render": function (data, type, row, meta) {
                                return '<a class="btn btn-default"><em class="fa fa-pencil"></em></a> <a class="btn btn-danger"><em class="fa fa-trash"></em></a>';
                            }
                        }
                    ]
                });
            });
        } else {
            $("#result").text("hệ thống tạm thời bị lỗi");
        }
    })
}

function showDialog() {

    $.get('/users/khaibao', (data, status) => {
        $('#users_model').DataTable({
            "destroy": true,
            data: data,
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
