require(['jquery', 'quality','widget'], function ($, Quality){
    
    // 初始化数量插件
    Quality.init({
        minBtn: $('[data-quality="min"]')
        , addBtn: $('[data-quality="add"]')
        , countIpt: $('[data-quality="value"]')
        , callback: refresh_price
    });

    // 初始化选择
    $("input[name='payment_type']").eq(0).attr("checked", true);
    // 初始化属性选择
    setCombPrototypeInit(1);

    // 刷新价格
    refresh_price();
    $('#comb .tab').on('click',function() {
        $(this).addClass('tab-sel').siblings().removeClass('tab-sel');
    })
    $('.protoLayer .con label').click(function(event) {
        /* Act on the event */
        $(this).addClass('active').siblings().removeClass('active');
        if( $(this).find('img').length >0 ){
            var src = $(this).find('img').attr('src');
            $('.store-goods .i-img img').attr('src', src);
        }
    });

function refresh_price() {
    $.ajax({
        url: 'checkout.php?',
        type: 'post',
        data: $('input[name=combo_id]:checked,input[name=\'product_id\'], #act, input[name=\'num\']'),
        dataType: 'json',
        success: function(json) {
           if(json.ret)
           {
                $('combprice').html(json.price);
                $("#price").html(json.total);
              $("input[name='price']").val(json.total);
           }
           else{
               alert(json.msg)
           }
        },
        error: function(xhr, ajaxOptions, thrownError) {
        }
    });
}
    
var _region = $("#_region").val();
var is_single = $(".tab-sel input[name='combo_id']").attr('data-single');
if(is_single == 1){
    $('.number').hide();
}else{
    $('.number').show();
}
// mike：增加套餐切换
$(document).ready(function(){
    $("input[name='combo_id']").each(function(){
        $(this).click(function(){
            is_single = $(this).attr('data-single');
            if (is_single == 1) {
                $('.number').hide();
            }else{
                $('.number').show();
            }
            $('#mun').val(1);
            refresh_price();
            var index = $(this).attr('data-loopIndex');
            $('section[data-loopIndex]').hide();
            $('section[data-loopIndex]').eq(index-1).show();
            setCombPrototypeInit(index);
        });
    })

});

// 根据套餐初始化
function setCombPrototypeInit(sectionIndex){
    // 先要清除选中状态
    $('section').find('input').removeAttr("checked");
    $('section[data-loopindex]').eq(sectionIndex-1).find('li.protoLayer').each(function(){
        if($(this).find('label').length == 1){
            $(this).find('label').removeClass('active').eq(0).addClass('active').find('input').prop("checked", true);
        }
        if($(this).find('.active').length != 0){
            $(this).find('.active').find('input[type="radio"]').prop('checked',true);
        }
    });
}
    window.widget.repeatOrder.init();
    window.widget.smsvalid && window.widget.smsvalid.init();//短信验证
    function attrval(){
        var count = $('input[name="num"]').val();
        var combo_id = $('input[name="combo_id"]:checked').val() ? $('input[name="combo_id"]:checked').val() : $('input[name="combo_id"][checked]').val();
        var product_id = $('input[name="product_id"]').val();
        var sectionIndex = $('input[name="combo_id"]:checked').attr('data-loopIndex') ? $('input[name="combo_id"]:checked').attr('data-loopIndex') : $('input[name="combo_id"][checked]').attr('data-loopIndex');
        
        if(parseInt(combo_id) == 0){
            var attrs = [];
            $('section[data-loopIndex]').eq(sectionIndex-1).find('li.protoLayer').each(function(){
                var a = $(this).find('input[type="radio"]:checked').val();
                attrs.push(a);
            });
        }else{
            var attrs = [];
            $('section[data-loopindex]').eq(sectionIndex-1).find('[comboproduc]').each(function(index,element){
                attrs[index] = [];
                attrs[index].push(product_id);
                attrs[index].push(count);
                var a = [];
                $(this).find('li.protoLayer').each(function(i,e){
                    var that = this;
                    a.push($(that).find('input[type="radio"]:checked').val());
                });
                attrs[index].push(a);
            });
        }
        window.widget.repeatOrder.getproattr(product_id,attrs,combo_id);
    }
    $('button[type="submit"]').click(function(){
        attrval();
    })
});
function checkattrs(ev){
    var loop = $('input[name="combo_id"]:checked').attr('data-loopindex');
    var attr = $('section[data-loopIndex="'+ loop +'"] ').find('.protoLayer');
    if( attr.length > 0 ){
        var prototype = [];
        attr.each(function(){
            var dom = $(this).find('.active');
            var prototypeId = dom.find('input[type="radio"]:checked').val();
            if(typeof prototypeId != 'undefined'){
                prototype.push(prototypeId);
            }
        });
        if(prototype.length < attr.length){
            alert($('#order').attr('data-error'));
        }else{
            $('[data-cuckootag="confirm_order"]').trigger('click');
        }
    }else{
        $('[data-cuckootag="confirm_order"]').trigger('click');
    }
}