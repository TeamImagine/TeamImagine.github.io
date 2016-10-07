$('#bg-list li').click(function(e) {
    var src = $(e.target).attr('src');
    messager.confirm('操作提示……', '把这张图片设为壁纸？', function(r) {
        if (r) {
        	localStorage.setItem('background-img-src', src);
        	setBakground(src);
        }
    });
});