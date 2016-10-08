$(() => {

    (function (src){
        if ($.trim(src).length > 0) {
            $('#homepage').css({
                'background': 'url(' + src + ')',
                'background-attachment': 'fixed',
                'background-position': 'center center',
                'background-size': 'cover'
            });
        }
    })(localStorage.getItem('background-img-src'));

    setTimeout(function() {
        $('#mask').fadeOut(50);
    }, 2500);

    // 弹窗相关
    var windowWidth = $(document).width(),
        windowHeight = $(document).height(),
        matrixOffsetX = 10, matrixOffsetY = 10;
    if (windowHeight > windowWidth) { // 避免出现显示器的宽度小于高度的情况，好在我是双屏，遇到了这个问题
        windowHeight = windowWidth * 0.8;
    }
    windowHeight = windowHeight * 0.7;

    var renderWindow = (conf) => {
        var ele = $('<li>');
        $('#window-queen').append(ele);
        ele.window({
            id: conf.id + '-window',
            title: conf.name,
            width: windowHeight / 0.618,
            height: windowHeight,
            closed: true,
            cache: true,
            href: '/assets/tpl/' + conf.id + '/index.html',
            modal: false,
            collapsible: false,
            onOpen: function(){
                ele.removeClass('maximized');
            },
            onMinimize: function(){
                $('#' + this.id).addClass('maximized');
            },
            onBeforeClose: function(){
                $('#' + conf.id + '-task-list-item').remove();
            }
        });
        
    };

    $.get('/icons.json', (icons) => {
        icons.forEach((icon, i) => {
            renderWindow(icon);
            $('#' + icon.id).click(() => {
                $('#' + icon.id + '-window').window('open')
            });
            // 桌面图标换列，重新计算偏移量
            if (i > 0 && i % 9 === 0) { 
                matrixOffsetX += 80;
                matrixOffsetY = 10;
            }
            $('#' + icon.id).css({
                top: matrixOffsetX + 'px',
                left: matrixOffsetY + 'px'
            }).click(function(e) { // 绑定桌面图标点击事件
                var _this = $(e.target).closest('.item'),
                    wid = icon.id + '-window',
                    win = $('#' + wid),
                    tid = icon.id + '-task-list-item',
                    url = '/asserts/tpl/' + icon.id + '/';
                $('#' + wid).window('open', 'center'); // 弹出层居中
                // 增加任务栏图标
                if ($('#' + tid).length === 0) {
                    var iconHtml = '<a id="' + tid + '" class="task-item" href="javascript:;"></a>';
                    $('#task-list').append($(iconHtml));
                    $('#' + tid).click(function() {
                        if (!navigator.onLine) {
                            alert('网络已离线...');
                        }
                        // 点击状态栏按钮触发不同的动作
                        if (wid.hasClass('maximized')) {
                            wid.window('open');
                        } else {
                            wid.window('minimize');
                        }
                    });
                }
            });
            matrixOffsetX += 80; // 累加纵向的偏移量
        });
    });


    /***
     * 桌面图标特效
     */
    $('.item').hover(function(){
        var _this = $(this),
            clazz = 'item-window-animated pulse';
        _this.addClass(clazz);
        setTimeout(function(){
            _this.removeClass(clazz);
        }, 1000);
    });

    /**
     * 桌面右键菜单
     */
    $('body').bind('contextmenu',function(e){
        e.preventDefault();
        if('homepage' === e.target.id){
            $('#mm').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        }
        return false;
    });

    $('#background-menu-item').click(function(){
        $('#background-window-container').window('open');
    });
    setInterval(function() {
        $('#system-clock').text(moment().format('HH:mm'));
        if (!navigator.onLine) {
            console.log('网络已断开链接...');
        }
    }, 1000);
});
