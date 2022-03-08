$(function() {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中，作用：输入新的内容使滚动条，滚动到最底部。
    resetui()

    $('#btnSend').on('click', function() {
        // 获取输入内容
        var text = $('#ipt').val().trim();
        // 若输入内容为空，则清空输入框并返回
        if (text.length <= 0) {
            return $('#ipt').val('');
        }
        // 若输入框不为空，则将输入的内容插入消息列表中，并清空输入框
        $('#talk_list').append('<li class="right_word"> <img src = "img/person02.png" / > <span> ' + text + ' </span> </li>');
        resetui();
        $('#ipt').val('');
        getMsg(text);
        resetui();
    })

    // 获取消息函数
    function getMsg(userText) {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: userText,
            },
            success: function(res) {
                if (res.message === 'success') {
                    // 获取服务器返回的消息
                    var msg = res.data.info.text;

                    $('#talk_list').append('<li class="left_word"> <img src = "img/person01.png"/> <span> ' + msg + ' </span> </li> ');
                    resetui();

                    // 语音播放消息
                    getVoice(msg);
                }
            }
        })
    }

    // 转换语音播放
    function getVoice(msg) {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: msg,
            },
            success: function(res) {
                if (res.status === 200) {
                    $('#voice').attr('src', res.voiceUrl);
                }
            }
        })
    }

    // 回车发送消息
    $('#ipt').on('keyup', function(event) {
        if (event.keyCode === 13) {
            $('#btnSend').click();
        }
    })
})