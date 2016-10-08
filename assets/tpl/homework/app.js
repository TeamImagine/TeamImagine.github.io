var initDatagrid = function() {
    $('#homework-dg').datagrid({
        url: '/assets/json/homework.json',
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
                // window.open('homework/answer?id=' + this.getAttribute('data-id'));
                $.post('https://api.github.com/TeamImagine/TeamImagine.github.io/issues', {
                  "title": "Found a bug",
                  "body": "I'm having a problem with this.",
                  "assignee": "octocat",
                  "assignees": [
                    {
                      "login": "octocat",
                      "id": 1,
                      "avatar_url": "https://github.com/images/error/octocat_happy.gif",
                      "gravatar_id": "",
                      "url": "https://api.github.com/users/octocat",
                      "html_url": "https://github.com/octocat",
                      "followers_url": "https://api.github.com/users/octocat/followers",
                      "following_url": "https://api.github.com/users/octocat/following{/other_user}",
                      "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
                      "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
                      "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
                      "organizations_url": "https://api.github.com/users/octocat/orgs",
                      "repos_url": "https://api.github.com/users/octocat/repos",
                      "events_url": "https://api.github.com/users/octocat/events{/privacy}",
                      "received_events_url": "https://api.github.com/users/octocat/received_events",
                      "type": "User",
                      "site_admin": false
                    }
                  ],
                  "milestone": 1,
                  "labels": [
                    "bug"
                  ]
                }, (data) => {
                    console.log(data)
                });
            });
        }
    });
};
setTimeout(initDatagrid, 200);