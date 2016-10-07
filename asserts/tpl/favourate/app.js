$('#favourate-dg').treegrid({
    url: '/favourate.json',
    idField: 'id',
    treeField: 'name',
    rownumbers: true,
    fit: true,
    fitColumns: true,
    columns: [
        [{
            field: 'name',
            title: '主题',
            width: 160
        }, {
            field: 'id',
            title: '',
            width: 30,
            align: 'center',
            formatter: function(val, row, index) {
                return isNaN(val) ? '' : '<button type="button" class="favourate-post" data-url="' + row.url + '">查看全文</button>';
            }
        }]
    ],
    onLoadSuccess: function() {
        $('.favourate-post').click(function() {
            window.open(this.getAttribute('data-url'));
        });
    }
});