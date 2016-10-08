/**
 * 生成桌面图标的窗口的载体，练习使用前端模板引擎，实际上使用 PHP 会方便
 **/
$(() => {

    // 弹窗相关
    var windowWidth = $(document).width(),
        windowHeight = $(document).height();
    if (windowHeight > windowWidth) { // 避免出现显示器的宽度小于高度的情况，好在我是双屏，遇到了这个问题
        windowHeight = windowWidth * 0.8;
    }
    windowHeight = windowHeight * 0.7;

    var renderWindow = (conf) => {
        console.log(conf);
        $('#dd').window({
            title: conf.title,
            width: windowHeight,
            height: windowHeight / 0.618,
            closed: true,
            cache: true,
            href: conf.href,
            modal: true
        });
    };

    $.get('/icons.json', (icons) => {
        icons.forEach((o, i) => {
            renderWindow(o, i);
        });
    })

    /*$.get('/assets/tpl/framework/win_framework.html', (html) => {
        var ft = {
            notice: '注意'
        },
        addWindowTemplate = function(id, innerText, type, text){
            $('#window-queen').append(nunjucks.renderString(html, {
                itemId: id, // 图表相关
                itemName: innerText,
                windowWidth: window.windowHeight / 0.618, // 动态的窗口宽度，也人云亦云一把，使用黄金分隔（0.618）
                windowHeight: window.windowHeight, // 动态的窗口高度，更具浏览器窗口的宽度计算窗口的宽度，因为在纵轴方向的溢出被隐藏
                footerType: type, // 窗口的 footer 的类型
                footerName: ft[type], // 窗口 footer 文本中加粗的部分
                footerText: text // 窗口 footer 文本中布加粗的部分
            }));
        };
        $('#matrix .item').each(function(i, o) {
            var type = o.getAttribute('data-footer-type'),
                text = o.getAttribute('data-footer-text');
            addWindowTemplate(o.id, o.innerText, type, text);
        });
        addWindowTemplate('background', '切换桌面背景');
    })*/



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
});

var itemWindowOpenPb = function() {
    $('#' + this.id).window('window').addClass('item-window-animated zoomInUp');
};
var itemWindowOpenCb = function() {
    $('#' + this.id).removeClass('maximized');
    // $('#' + this.id).window('window').removeClass('animated bounceIn');
};
var itemWindowMinsizeCb = function() {
    $('#' + this.id).addClass('maximized');
};
var itemWindowCloseCb = function() {
    $('#' + this.getAttribute('data-item-id') + '-task-list-item').remove();
}

var messager = {
    slide: function(title, text) {
        return $.messager.show({
            title: title,
            msg: text,
            showType: 'slide',
            style: {
                bottom: 40,
                top: '',
                left: '',
                right: 5
            }
        });
    },
    confirm: function(title, message, cb) {
        return $.messager.confirm(title, message, cb);
    }
};

