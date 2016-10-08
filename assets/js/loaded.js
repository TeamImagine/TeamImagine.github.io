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
            collapsible: false
        });
        $('#' + conf.id).click(() => {
            $('#' + conf.id + '-window').window('open')
        });
    };

    $.get('/icons.json', (icons) => {
        icons.forEach((o, i) => {
            renderWindow(o, i);
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

