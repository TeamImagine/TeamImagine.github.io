var initDatagrid = function() {
    $('#homework-dg').datagrid({
        url: '/homework.json',
        method: 'GET',
        rownumbers: true,
        nowrap: false,
        striped: true,
        pagination: true,
        resizable: true,
        pagePosition: 'top',
        fit: true,
        fitColumns: true,
        pageSize: 15,
        pageList: [15],
        singleSelect: true,
        loadMsg: '数据加载中...',
        columns: [
            [{
                field: 'text',
                title: '题干',
                width: 230
            }, {
                field: 'status',
                title: '状态',
                width: 20,
                align: 'center',
                formatter: function(val) {
                    return '<i class="' + (val == 1 ? 'green' : 'red') + '-text">' + (val == 1 ? '√' : '-') + '</i>';
                }
            }, {
                field: 'id',
                title: ' ',
                width: 60,
                align: 'center',
                formatter: function(val, row, idx) {
                    return '<button type="button" class="do-answer" data-id="' + val + '">我要答题</button>';
                }
            }]
        ],
        onClickRow: function(index, row) {
            $('#homework-desc').html(row.tips);
        },
        onLoadSuccess: function(){
            $('.do-answer').click(function(){
                window.open('homework/answer?id=' + this.getAttribute('data-id'));
            });
        }
    });
};
setTimeout(initDatagrid, 200);