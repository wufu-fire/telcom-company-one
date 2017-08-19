$(function() {
    // 设置分页
    function page(total) {
        $("#pagination1").pagination({
            currentPage: 1,
            totalPage: total,
            callback: function(current) {
                // 后去分页数据，current为当前页数，比如第2页。将current传递到后台，返回指定页数对应的数据。
                $.get("/test2.json?page=" + current, function(res) {
                    // 返回数据状态值为200
                    if (res.code === 200) {
                        var data = res.msg;
                        var html = "";
                        // 将数据拼接到表格中
                        for (var i = 0; i < data.length; i++) {
                            html += '<tr>' +
                                '<td>' + data[i].number + '</td>' +
                                '<td>' + data[i].name + '</td>' +
                                '<td>' + data[i].type + '</td>' +
                                '<td>' + data[i].date + '</td>' +
                                '<td>' + data[i].status + '</td>' +
                                '<td>' +
                                '<button type="button" class="btn btn-default" data-toggle="modal" data-target="#read">查看</button>' +
                                '<button type="button" class="btn btn-default">删除</button>' +
                                '</td>' +
                                '</tr>';
                        }
                        //将拼装好的字符串放到容器中。
                        $('#table-content').html(html);
                    } else {
                        //返回状态值为其他，报错提醒
                        alert("返回错误")
                    }
                });
            }
        });
    }

    //获取首页数据
    $.get("/test1.json", function(res) {
        // 返回数据状态值为200
        if (res.code === 200) {
            var data = res.msg;
            var html = "";
            // 将数据拼接到表格中
            for (var i = 0; i < data.length; i++) {
                html += '<tr>' +
                    '<td>' + data[i].number + '</td>' +
                    '<td>' + data[i].name + '</td>' +
                    '<td>' + data[i].type + '</td>' +
                    '<td>' + data[i].date + '</td>' +
                    '<td>' + data[i].status + '</td>' +
                    '<td>' +
                    '<button type="button" class="btn btn-default" data-toggle="modal" data-target="#read">查看</button>' +
                    '<button type="button" class="btn btn-default">删除</button>' +
                    '</td>' +
                    '</tr>';
            }
            $('#table-content').html(html);
            // 设置分页数据
            page(data.total)
        } else {
            //返回状态值为其他，报错提醒
            alert("返回错误")
        }
    });
})