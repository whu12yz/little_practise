$(function () {
    $('button').button();
    $('#jump').mouseout()
    $('#jump').click(function (event) {
        (event||window.event).cancelBubble =true;
        (event||window.event).stopPropagation();
        $('#move').off('click');
        $('#move').off('mouseup mousedown');
        $(document).mouseup(function (event) {
            var event = event||window.event;
            $('#imgs').animate({
                left : event.pageX,
                top:event.pageY,
            }, '2000', 'easeInOutCubic', function () {
                $('#imgs img').attr('src', 'static_img.png');
            });
            $('#imgs img').attr('src', 'move_img.png');

        });
    });
    $('.progress div').animate({'width':'100%'}, 6000);
    $('#move').click(function (e) {
        (e||window.event).cancelBubble = true;
        (e||window.event).stopPropagation();
        $('#jump').off('click');
        $(document).off('mouseup');
        var position = [{
            x : $('#imgs').css('left'),
            y : $('#imgs').css('top')
        }];
        $(document).mousedown(function () {
            $(document).mousemove(function (event) {
                var event = event||window.event;
                position.push({x:event.pageX, y:event.pageY});
            });
        });
        $(document).mouseup(function () {
            $(document).off('mousemove');
            $('#imgs img').attr('src', 'move_img.png');
            var timer = setInterval(function () {
                if(position.length == 0){
                    clearInterval(timer);
                    $('#imgs img').attr('src', 'static_img.png');
                    return;
                }
                $('#imgs').css('top', position[0].y);
                $('#imgs').css('left', position[0].x);
                position.shift();
            }, 20);
        })
    });
    // $('#macbook img').hover(function () {
    //     $('#macbook img').eq($(this).index()).css({'width':'128px', 'height':'128px'});
    // }, function () {
    //     $('#macbook img').eq($(this).index()).css({'width':'64px', 'height':'64px'});
    // })
    //实现苹果任务栏效果
    $(document).mousemove(function (event) {
        var event = event||window.event;
        var img = $('#macbook img');88

        for(var i = 0; i <=7; i ++){
            var a = $('#macbook img').eq(i).offset().left+parseInt($('#macbook img').eq(i).css('width'))/2-event.clientX;
            var b = $('#macbook img').eq(i).offset().top+parseInt($('#macbook img').eq(i).css('height'))/2-event.clientY;
            var multifly = 1 - Math.sqrt(a*a+b*b)/300;
            if(multifly < 0.5){
                multifly = 0.5;
            }
            $('#macbook img').eq(i).css({'width':128 * multifly, 'height': 128 * multifly});
        }

    });
    // var a = 100,
    //     callback=$.Callbacks();
    // function con(ee) {
    //     alert(ee);
    // }
    // $('#macbook img').eq(0).on('click', function box() {
    //     alert(12)
    // } );
    // $('#macbook img').eq(1).on('click',function () {
    //     box();
    // })
    // callback.add(box);
    // callback.fire(a);
    // con(12)
    // $.ajax({
    //     type : 'GET',
    //     url : 'information.json',
    //     dataType: 'json',
    //     success : function (data) {
    //         $.each(data, function (i, item) {
    //             var content = item.name+','+ item.email +',' + item.gender + ',' + item.hobby[0] + ',' + item.hobby[1] + '</br>';
    //             $('#json').after(content);
    //         })
    //
    //     },
    //     complete:function (xhr, status) {
    //         alert(xhr.responseText+':'+status);
    //     }
    // });
    // $(document).ajaxStart(function () {
    //     $('.loading').show();
    // }).ajaxStop(function () {
    //     $('.loading').hide();
    // });

    $('.progress div').animate({'width':'100%'}, 6000);


});
