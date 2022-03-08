$(function() {

    // 给时间补零函数
    function padZero(num) {
        if (num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    template.defaults.imports.timeFormate = function(timeStr) {
        var time = new Date(timeStr);
        var y = time.getFullYear();
        var m = padZero(time.getMonth() + 1);
        var d = padZero(time.getDate());

        var hh = padZero(time.getHours());
        var mm = padZero(time.getMinutes());
        var ss = padZero(time.getSeconds());

        return y + '-' + m + '-' + d + '   ' + hh + ':' + mm + ':' + ss;
    }

    function getNewsList() {
        $.get('http://www.liulongbin.top:3006/api/news', function(res) {

            if (res.status !== 200) return alert('获取数据失败！');

            for (var i = 0; i < res.data.length; i++) {
                res.data[i].tags = res.data[i].tags.split(',');
            }
            var news = template('news-container', res);

            console.log(news);
            $('#news-list').html(news);
        })
    }

    getNewsList();
})