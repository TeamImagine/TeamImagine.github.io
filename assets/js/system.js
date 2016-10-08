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
    var taskbar = $('#task-list'),
        windowWidth = $(document).width(),
        windowHeight = $(document).height(),
        matrixOffsetX = 10, matrixOffsetY = 10;
    if (windowHeight > windowWidth) { // 避免出现显示器竖放导致宽度小于高度的情况
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

    $.get('/assets/json/icons.json', (icons) => {
        icons.forEach((icon, i) => {
            renderWindow(icon);
            var win = $('#' + icon.id + '-window'),
                tid = icon.id + '-task-list-item';
            $('#' + icon.id).css({
                top: matrixOffsetX + 'px',
                left: matrixOffsetY + 'px'
            }).click(() => {
                $('#' + icon.id + '-window').window('open', 'center');
                if($('#' + tid).length > 0){
                    return;
                }
                var taskicon = $('<a id="' + tid + '" class="task-item" href="javascript:;"></a>');
                taskbar.append(taskicon);
                if (!navigator.onLine) {
                    alert('网络已离线...');
                }
                // 点击状态栏按钮触发不同的动作
                taskicon.click(function(){
                    if (win.hasClass('maximized')) {
                        win.window('open');
                    } else {
                        win.window('minimize');
                    }
                })
            });
            // 桌面图标换列，重新计算偏移量
            if (i > 0 && i % 9 === 0) { 
                matrixOffsetX += 80;
                matrixOffsetY = 10;
            }
            $('#' + icon.id).css({
                top: matrixOffsetX + 'px',
                left: matrixOffsetY + 'px'
            });
            matrixOffsetX += 80; // 累加纵向的偏移量
        });
    });

    /***
     * 桌面图标特效
     */
    $('.item').hover(function(){
        var self = $(this),
            clazz = 'item-window-animated pulse';
        self.addClass(clazz);
        setTimeout(function(){
            self.removeClass(clazz);
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
