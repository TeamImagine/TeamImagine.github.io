var setBakground = function (src){
    if ($.trim(src).length > 0) {
        $('#homepage').css({
            'background': 'url(' + src + ')',
            'background-attachment': 'fixed',
            'background-position': 'center center',
            'background-size': 'cover'
        });
    }
};

$(function() {
    /***
     * 设置背景
     */
    (setBakground)(localStorage.getItem('background-img-src'));
    /***
     * 屏幕解锁 - start
     */
    setTimeout(function() {
        $('#mask').fadeOut(50);
    }, 1000);
    /***
     * 屏幕解锁 - end
     */
    /***
     * 桌面按钮 - start
     */
    // 计算桌面的矩阵的坐标，偏移量
    window.matrix_offset_x = 10;
    window.matrix_offset_y = 10;
    $('#matrix .item').each(function(i, o) {
        if (i > 0 && i % 9 === 0) { // 换列，重新计算偏移量
            window.matrix_offset_x += 80;
            window.matrix_offset_y = 10;
        }
        $(o).css({
            top: window.matrix_offset_y + 'px',
            left: window.matrix_offset_x + 'px'
        }).click(function(e) { // 绑定桌面图标点击事件
            var _this = $(e.target).closest('.item'),
                wid = o.id + '-window-container',
                tid = o.id + '-task-list-item',
                url = '/asserts/tpl/' + o.id + '/';
            $('#' + wid).window('open', 'center'); // 弹出层居中
            // 增加任务栏图标
            if ($('#' + tid).length === 0) {
                var iconHtml = '<a id="' + tid + '" class="task-item" href="javascript:;"></a>';
                $('#task-list').append($(iconHtml));
                $('#' + tid).click(function() {
                    if (!navigator.onLine) {
                        alert('网络已离线...');
                    }
                    var _win = $('#' + wid);
                    // 点击状态栏按钮触发不同的动作
                    if (_win.hasClass('maximized')) {
                        _win.window('open');
                    } else {
                        _win.window('minimize');
                    }
                });
            }
        });
        window.matrix_offset_y += 80; // 累加纵向的偏移量
    });
    /***
     * 桌面按钮 - end
     */
    setInterval(function() {
        $('#system-clock').text(moment().format('HH:mm'));
        if (!navigator.onLine) {
            console.log('网络已断开链接...');
        }
    }, 1000);
});