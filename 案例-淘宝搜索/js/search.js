$(function() {
    // 创建全局缓存对象
    var casheObj = {};
    $("#iptSearch").on("keyup", function() {
        // 防抖策略，清除延时器
        clearTimeout(timer);

        if ($(this).val().trim().length <= 0) {
            // 搜索关键字为空时，隐藏搜索建议列表
            return $("#suggest-list").empty().hide();
        }

        // 若缓存对象中有该数据，则不需要发请求，直接从缓存中渲染结构
        if (casheObj[$(this).val().trim()]) {
            return renderSuggestList(casheObj[$(this).val().trim()]);
        }

        // 搜索关键字不为空时，调用搜索列表函数
        // getSuggestList($(this).val().trim());
        debounceSearch($(this).val().trim());
    })


    // 获取搜索列表的函数
    function getSuggestList(keywords) {
        $.ajax({
            url: "https://suggest.taobao.com/sug?q=" + keywords,
            dataType: "jsonp",
            success: function(res) {
                renderSuggestList(res);
            }
        })
    }

    // 渲染 UI 结构
    function renderSuggestList(res) {
        if (res.result.length <= 0) {
            // 表示服务器没有返回数据
            return $("#suggest-list").empty().hide();
        }
        // 有数据返回时，渲染 UI 结构
        var htmlStr = template("tpl-suggestList", res)
        $("#suggest-list").html(htmlStr).show();

        // 获取到用户输入的内容，当键
        var k = $("#iptSearch").val().trim();
        // 将数据当作值，进行缓存
        casheObj[k] = res;
    }

    // 防抖策略
    // 定义延时器的id
    var timer = null;
    // 定义防抖函数
    function debounceSearch(keywords) {
        timer = setTimeout(function() {
            getSuggestList(keywords);
        }, 300)
    }
})