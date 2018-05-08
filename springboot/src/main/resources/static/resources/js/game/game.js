$(document).ready(function () {
    //document.getElementById('bgAudio').volume=0.4;
    document.addEventListener("WeixinJSBridgeReady", function () { 
        document.getElementById('bgAudio').play(); 
        document.getElementById('bgAudio').setAttribute('loop', 'loop')
    }, false);
    let userData = null;
    let schoolGif = ['../resources/imgs/game/gif/eat.gif','../resources/imgs/game/gif/sleep.gif','../resources/imgs/game/gif/comic.gif','../resources/imgs/game/gif/yoyo.gif']
    let homeGif = ['../resources/imgs/game/gif/balloon.gif','../resources/imgs/game/gif/homework.gif','../resources/imgs/game/gif/butterfly.gif']
    let schoolGifIndex = parseInt(Math.random()*4)
    let homeGifIndex = parseInt(Math.random()*3)
    //登录
    function login(){
        $.ajax({
            type: 'post',
            url: DOMIN.MAIN + '/game/login',
            async: false,
            cache: false,
            data: {
                token: getCookie('token')
            },
            dataType: 'json',
            success: function (result) {
                if (result.success) {
                    userData = result.data;
                    if(userData.updateTime){//第一次进来需要删除缓存
                    	window.localStorage.removeItem('taskTime');
                    }
                    //判断工作是否完成
                    if (userData.tasks.length > 0) {
                        //$('.wrap').Class('bg-school');
                        $('.wrap').removeClass('bg-home');
                        var liCon='';
                        for (let i = 0; i < userData.tasks.length; i++) {
                             liCon += `
                                    <p><span class="num">${i + 1}</span>
                                    <span class="task-detail">${userData.tasks[i]}</span></p>`;
                        };
                        $('.todaytask').html(liCon);
                        $('#gif').attr('src',schoolGif[schoolGifIndex]);
                        $('.task-list').show();
                        setTimeout(function(){
                            $('#wrap').removeClass('school-gif');
                            $('.wrap').removeClass('bg-home');
                            $('#wrap').addClass('bg-school');
                            $('#gif').hide();
                            $('#footer').show();
                            $('.noDonetask-modal').fadeIn();
                            $(backgroundMusic).attr('src', musicPath.modal);
                        },4000);
                        $('.mask').show();    
                    }else{
                        $('#gif').attr('src',homeGif[homeGifIndex]);
                        $('.wrap').addClass('bg-home');
                        $('.task-time').show();
                        setTimeout(function(){  
                            $('#gif').hide();
                            $('#panada').show();
                            $('#footer').show();
                            if(window.localStorage.getItem('taskTime') == null ||
                                typeof(window.localStorage.getItem('taskTime')) == 'undefined'){
                                window.localStorage.setItem('taskTime',userData.time);
                                downTime();
                            }	
                        },4000);
                    }
                    if(userData.updateTime){
                        getProps();
                        getMedals();
                    }else{
                        renderShopProps();
                        rendermedals();
                    }
                    //用户资料
                    $('.avatar').eq(0).attr('src', userData.headerPic);
                    $('.name').eq(0).text(userData.realName);
                    $('.rank span').eq(1).text(userData.coin);
                    $('.rank span').eq(0).text(userData.level);
                    $('.my-gold').html(userData.coin);
                }else {
                    showToast(result.message);
                }
            }
        });   
    }
    login();
    downTime();
    // getUserInfo()
    function getUserInfo() {
        $.ajax({
            type: 'post',
            url: DOMIN.MAIN + '/game/login',
            async: false,
            cache: false,
            data: {
                token: getCookie('token')
            },
            dataType: 'json',
            success: function (result) {
                if (result.success) {
                    userData = result.data;
                    $('.avatar').eq(0).attr('src', userData.headerPic);
                    $('.name').eq(0).text(userData.realName);
                    $('.rank span').eq(1).text(userData.coin);
                    $('.rank span').eq(0).text(userData.level);
                    $('.my-gold').html(userData.coin);
                } else {
                    console.log(result);
                }
            }
        });
    }
    //游戏结束关闭弹窗
    $('.know3').click(function(){
        $('.game-over-modal').fadeOut();
        $(backgroundMusic).attr('src', musicPath.button);
    })
    //倒计时
    function downTime(){
        var taskTime = window.localStorage.getItem('taskTime');
        if(taskTime!=null){
            if(taskTime>=1){
                window.localStorage.setItem('taskTime',--taskTime);
                setTimeout(downTime,1000);
                $('.mask').hide();
            }
            if(taskTime==15){
                $(backgroundMusic).attr('src', musicPath.countDown);
            };
            if(taskTime<=0){
                $(backgroundMusic).attr('src', musicPath.countDownEnd);
                setTimeout(function(){
                    if(userData.tasks.length>0){
                        $('.noDonetask-modal').fadeIn();
                        $(backgroundMusic).attr('src', musicPath.modal);
                    }else{ 
                        $('.game-over-modal').fadeIn();
                        $(backgroundMusic).attr('src', musicPath.modal);
                        $('.mask').show(); 
                    } 
                },4000)        
            } 
        }else{
            taskTime = 0;
        };
        var MM=Math.floor(taskTime/60);
        var SS=Math.floor(taskTime-MM*60);
        var mm=MM<10? '0'+MM:MM;
        var ss=SS<10? '0'+SS:SS; 
        $('.MM').html(mm);
        $('.SS').html(ss);
    }
    //商店所有道具 先从缓存中去读
    var shopProps, learnUsers='',lifeUsers='',tickets='';
    $('.shop').click(function(){
        renderShopProps();
    });
    //排序
    function compare(property){
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    }
    function renderShopProps(){
        var shopPropsArr=[];
        if(!window.localStorage.getItem('shopProps')){
            getProps();
        }
        shopProps=JSON.parse(window.localStorage.getItem('shopProps'));
        for( x in shopProps){
            shopPropsArr.push(shopProps[x]);
        };
        var shopPropsSoft=shopPropsArr.sort(compare('price'));
        var learnUsers='',lifeUsers='',tickets='';
        $.each(shopPropsSoft,function(key,value){
            if(value.propType=='2'){
                learnUsers+=`
                <li id="${value.id}">
                <span class="price">${value.price}</span>
                <img src="../resources/imgs/game/prop/${value.id}.png" alt="">
                </li>`
            }else if(value.propType=='0'){
                lifeUsers+=`
                <li id="${value.id}">
                <span class="price">${value.price}</span>
                <img src="../resources/imgs/game/prop/${value.id}.png" alt="">
                </li>`
            }else{
                tickets+=`
                <li id="${value.id}">
                <span class="price">${value.price}</span>
                <img src="../resources/imgs/game/prop/${value.id}.png" alt="">
                </li>`
            }
        });
        $('.shop-tab-content .learn-con').html(learnUsers);
        $('.shop-tab-content .life-con').html(lifeUsers);
        $('.shop-tab-content .ticket-con').html(tickets);
    }
    //获取道具
    function getProps(){
        $.ajax({
            type: 'get',
            url: DOMIN.MAIN + '/game/props',
            async: false,
            cache: false,
            data: {
                token: getCookie('token')
            },
            dataType: 'json',
            success: function (result) {
                if (result.success) {
                    window.localStorage.setItem('shopProps',JSON.stringify(result.data));
                } else {
                    showToast('获取token失败！');
                }
            }
        });
    }
    //点击商店切换二级菜单
    $('.shop-tab-title span').eq(0).addClass('active0');
    $('.shop-tab-title span').click(function(e){
        $(this).attr('data-status','on');
        $(this).siblings().attr('data-status','off');
        $(this).parent().find('span').each(function(index,obj){
            if($(obj).attr('data-status')=='on'){
                $(obj).addClass('active'+index)
            }else{
               $ (obj).removeClass('active'+index)
            }
        });
        var imgIndex=$(this).index();
        $('.shop-tab-content > li').eq(imgIndex).show().siblings().hide();
    })
    //点击二级菜单道具列表
    var propsId;
    $('.shop-tab-con').on('click','li',function(){
        if(userData.tasks.length>0){
            $('.noDonetask-modal').fadeIn();
            $(backgroundMusic).attr('src', musicPath.modal);
        }else{
            propsId=$(this).attr('id');
            var propObj=shopProps[propsId];
            $('.prop-img img').attr('src','../resources/imgs/game/prop/'+propObj.id+'.png');
            $('.prop-text').html(propObj.remark);
            $(backgroundMusic).attr('src', musicPath.button);
            $('.buyprop-modal').fadeIn();
        }  
    });
    //点击购买道具
    $('.buy-prop .confirm').click(function(){
        $.ajax({
            type: 'post',
            url: DOMIN.MAIN + '/game/buyProp',
            async: true,
            cache: false,
            data: {
                token: getCookie('token'),
                propId:propsId,
                num:1
            },
            dataType: 'json',
            success: function (result) {
                if(result.success){
                    //login();
                    getUserInfo();
                    $(backgroundMusic).attr('src', musicPath.button);
                    $('.buyprop-modal').fadeOut();
                    showToast('购买成功!已经发到你的仓库里了');
                }else{
                    $('.buyprop-modal').fadeOut();
                    showToast(result.message); 
                }
            }
        })
    })
    //点击取消弹框消失
    $('.buy-prop .cancel').click(function(){
        $('.buyprop-modal').fadeOut();
    })
    //查看当前用户背包道具
    var userPackage=null;
    function getPackage(){
        $.ajax({
            type: 'get',
            url: DOMIN.MAIN + '/game/myPackage',
            async: true,
            cache: false,
            data: {
                token: getCookie('token')
            },
            dataType: 'json',
            success: function (result) {
                if(result.success){
                    $('.learn-prop .detail').html('');
                    $('.life-prop .detail').html('');
                    $('.ticket-prop .detail').html('');
                    $('.learn-prop .detail').html('<div style="margin-right:.667rem" id="2" class="add"></div><div id="2" class="add"></div>');
                    $('.life-prop .detail').html('<div style="margin-right:.667rem" id="0" class="add"></div><div id="0" class="add"></div>');
                    $('.ticket-prop .detail').html('<div style="margin-right:.667rem" id="1" class="add"></div><div id="1" class="add"></div>');
                    if(result.data.userPackage==null || result.data.userPackage==''){
                        //return;
                    }else{
                        userPackage=JSON.parse(result.data.userPackage); 
                        $.each(userPackage,function(key,value){
                            for(let x in shopProps){
                                if(x==key){
                                    if(shopProps[x].propType=='2'){
                                       var learnImg=  `<div style="position:relative;" id="${shopProps[x].id}">
                                        <img class="delete-prop" src="../resources/imgs/game/close2.png" alt="" style="position:absolute;top:-.24rem;right:-.22rem;width:.5rem;height:.5rem;">
                                       <img src="../resources/imgs/game/prop/${shopProps[x].id}.png" alt="">
                                       </div>`;
                                        $('.learn-prop .detail').prepend(learnImg);
                                        $('.learn-prop .detail div').eq(2).remove();
                                    }else if(shopProps[x].propType=='0'){
                                        var lifeImg=  `<div style="position:relative;" id="${shopProps[x].id}">
                                        <img class="delete-prop" src="../resources/imgs/game/close2.png" alt="" style="position:absolute;top:-.24rem;right:-.22rem;width:.5rem;height:.5rem;">
                                        <img src="../resources/imgs/game/prop/${shopProps[x].id}.png" alt=""></div>`;
                                        $('.life-prop .detail').prepend(lifeImg);
                                        $('.life-prop .detail div').eq(2).remove();
                                    }else{
                                        var ticketImg=  `<div style="position:relative;" id="${shopProps[x].id}">
                                        <img class="delete-prop" src="../resources/imgs/game/close2.png" alt="" style="position:absolute;top:-.24rem;right:-.22rem;width:.5rem;height:.5rem;">
                                        <img src="../resources/imgs/game/prop/${shopProps[x].id}.png" alt=""></div>`;
                                        $('.ticket-prop .detail').prepend(ticketImg);
                                        $('.ticket-prop .detail div').eq(2).remove();
                                    }
                                }
                            }
                        })
                    }
                }else{
                    showToast(result.message);
                }      
            }
        })
    }
    //更改背包的道具
    $('.backpack-con').on('click','.delete-prop',function(){
        var propId=$(this).parent().attr('id');
        $.ajax({
            type: 'post',
            url: DOMIN.MAIN + '/game/useProp',
            async: true,
            cache: false,
            data: {
                token: getCookie('token'),
                propId:propId,
                isDelete:true,
            },
            dataType: 'json',
            success: function (result) {
                //console.log(shopProps)
                if(result.success){
                    for(let x in shopProps){
                        if(propId==shopProps[x].id){
                           var propType=shopProps[x].propType;
                        }
                    }
                    $('#'+propId).parent().append(`<div style="margin-right:.667rem" id="${propType}" class="add"></div>`)
                    $('#'+propId).remove();
                }else{
                    showToast(result.message)
                }
            }
        })
    })
    //getPackage();
    //增加道具
    var storeStatus=false;
    var selectProps=null;
    $('.detail').delegate('div.add','click',function(){
        selectProps=$(this).attr('id');
        storeStatus=true;
        getStore();
        $('.tab-title span').eq(0).removeClass('active0');
        $('.tab-title span').eq(1).addClass('active1');
        $('.tab-content > li').eq(1).show().siblings().hide();
    })
    //获取仓库
    var userStore=null;var storeProps='';var noProps=[];
    function getStore(){
        $('.store-con').html('');
        noProps=false;
        $.ajax({
            type: 'get',
            url: DOMIN.MAIN + '/game/myPackage',
            async: true,
            cache: false,
            data: {
                token: getCookie('token')
            },
            dataType: 'json',
            success: function (result) {
                if (result.success) {
                    noProps=[];
                    //console.log(result.data);
                    if(result.data.userStore!='' && result.data.userStore!='{}' && result.data.userStore!=null){
                        $('#noProps').hide();
                        userStore=JSON.parse(result.data.userStore);
                        $.each(userStore,function(key,value){
                            for(let x in shopProps){
                                storeProps='';
                                if(selectProps!=null){ 
                                    if(x==key){
                                        //console.log(shopProps[x])
                                        if(selectProps==shopProps[x].propType){
                                            noProps.push('1');
                                            storeProps=`
                                            <li id="${shopProps[x].id}">
                                                <img src="../resources/imgs/game/prop/${shopProps[x].id}.png" alt="" class="prop">
                                                <div class="price">${value}</div>
                                            </li>`; 
                                        }else{
                                            noProps.push('0')
                                        }
                                    } 
                                }else{
                                    if(x==key){
                                        storeProps=`
                                        <li id="${shopProps[x].id}">
                                            <img src="../resources/imgs/game/prop/${shopProps[x].id}.png" alt="" class="prop">
                                            <div class="price">${value}</div>
                                        </li>`;
                                    }  
                                };
                                $('.store-con').append(storeProps)
                            }
                        });
                        if($.inArray("0", noProps)==-1 && noProps.length>0){
                            showToast('仓库暂无对应道具，请往商店购买')
                        }
                    }else{
                        $('#noProps').show();
                    }
                }else{
                    showToast(result.message)
                } 
            }
        });
    }
    //点击仓库道具
    var storeId=null;
    $('.store-con').delegate('li','click',function(){
        if(storeStatus){
            storeId=$(this).attr('id');
            var storePropObj=shopProps[storeId];
            $(this).addClass('checked').siblings().removeClass('checked');
            $('.select').show();
        }   
    })
    //选取往背包增加道具
    $('.select').click(function(){
        $.ajax({
            type: 'post',
            url: DOMIN.MAIN + '/game/useProp',
            async: true,
            cache: false,
            data: {
                propId: storeId,
                token: getCookie('token')
            },
            dataType: 'json',
            success: function (result) {
                if(result.success){
                    getPackage();
                    $('.tab-title span').eq(1).removeClass('active1');
                    $('.tab-title span').eq(0).addClass('active0');
                    $('.tab-content > li').eq(0).show().siblings().hide();
                }else{
                    showToast(result.message);
                }
            }
        })
    })
    //去游学
    $('.go-tour').click(function(){
        if( userData.tasks.length>0){
            $('.noDonetask-modal').fadeIn();
            $(backgroundMusic).attr('src', musicPath.modal);
        }else if(localStorage.getItem('taskTime')<=0){
            $('.game-over-modal').fadeIn();
            $(backgroundMusic).attr('src', musicPath.modal);
        }else{
            $.ajax({
                type: 'get',
                url: DOMIN.MAIN + '/game/study',
                async: true,
                cache: false,
                data: {
                    token: getCookie('token')
                },
                dataType: 'json',
                success: function (result) {
                    if(result.success){
                        $('.backpack-store-modal').fadeOut();
                        $(backgroundMusic).attr('src', musicPath.button);
                        getUserInfo();
                    }else{
                        showToast(result.message);
                    };
                }
            });
        } 
    });

    //按钮
    //主页底部主按钮
    $('#tour').click(function () {
        if(userData.tasks.length>0){
            $('.noDonetask-modal').fadeIn();
            $(backgroundMusic).attr('src', musicPath.modal);
        }else{
            getTourSchool();
            getTourPics();
            //$('.tour-pics').css({'boxSizing':'border-box'})
            $('.tour-me-modal').eq(0).fadeIn();
            $(backgroundMusic).attr('src', musicPath.modal);
        }
    })
    $('#challenge').click(function () {
        if(userData.tasks.length>0){
            $('.noDonetask-modal').fadeIn();
            $(backgroundMusic).attr('src', musicPath.modal);
        }else{
            getQuestion();
            getChallengeRes();
            $('.challenge-test-modal').eq(0).fadeIn();
            $(backgroundMusic).attr('src', musicPath.modal);
        };

    })
    $('#hornor').click(function () { 
        rendermedals();
        $(backgroundMusic).attr('src', musicPath.modal);
        $('.honor-rank-modal').eq(0).fadeIn();
    })
    //任务列表
    $('.know').eq(0).click(function () {
        $(backgroundMusic).attr('src', musicPath.button);
        $('.todaytask-modal').eq(0).fadeOut();
    })

    // *************************************背包*****************************************
    $('#backpack').click(function () {
        if(userData.school!=0){
            $('.mask').show();
            $('.go-tour').hide();
        }else{
            $('.go-tour').show(); 
        }
        getPackage();
        $('.backpack-store-modal').eq(0).fadeIn();
        $(backgroundMusic).attr('src', musicPath.modal);
    });
    $('#closeShop').click(function(){
        $('.backpack-store-modal').eq(0).fadeOut()
    });
    //点击背包标签栏
    $('.tab-title span').eq(0).addClass('active0');
    $('.tab-title span').click(function(e){
        $('.select').hide();
        //$('.tab-title span').eq(1).removeClass('active1');
        $(this).attr('data-status','on');
        $(this).siblings().attr('data-status','off');
        $(this).parent().find('span').each(function(index,obj){
            $(obj).removeClass('active'+index)
            storeStatus=false;
            selectProps=null;            
            if($(obj).attr('data-status')=='on'){
                $(obj).addClass('active'+index)
            }else{
                $ (obj).removeClass('active'+index)
            }
        });
        var imgIndex=$(this).index();
        $('.tab-content > li').eq(imgIndex).show().siblings().hide();
    });
    $('.backpack').click(function(){
        $('.select').hide();
        getPackage();
    });
    $('.store').click(function(){
        getStore();   
    });
    //点击任务列表查看任务
    $('.task-list').click(function(){
        $('.todaytask-modal').fadeIn();
        $(backgroundMusic).attr('src', musicPath.modal);
    });
    //今日任务弹窗消失
    $('.know').click(function(){
        $('.todaytask-modal').fadeOut();
    })
    //未完成任务
    $('.know2').click(function(){
        $('.noDonetask-modal').fadeOut();
    });
    $('.view-task').click(function(){
        $('.noDonetask-modal').fadeOut();
        $('.todaytask-modal').fadeIn();
        $(backgroundMusic).attr('src', musicPath.modal);
    });

    //////获取勋章接口
    var medals;
    function getMedals(){
        $.ajax({
            type: 'get',
            url: DOMIN.MAIN + '/game/medals',
            async: false,
            cache: false,
            data: {
                token: getCookie('token')
            },
            dataType: 'json',
            success: function (result) {
                if(result.success){
                    medals=result.data;
                    window.localStorage.setItem('medals',JSON.stringify(result.data));
                    //console.log(result.data);
                }else{
                    showToast(result.message);
                }
            },
        })
    }
    function rendermedals(){
        if(!window.localStorage.getItem('medals')){
            getMedals();
        }
        medals  = JSON.parse(window.localStorage.getItem('medals'));
        var medalArr=userData.medals.split(',');
        //console.log(medalArr);
        $.each(medals,function(key,value){
            for(let i=1; i<medalArr.length; i++){
                if(key==medalArr[i]){
                    //console.log(medals[key]);
                    $('.medal-wrapper').find('img').eq(i-1).attr({
                        'src':'../resources/imgs/game/medal/'+medals[key].id+'-active.png',
                        'id':medals[key].id
                    }); 
                };
            };
        });
        var swiper1 = new Swiper('.swiper-container',{
            pagination: '.swiper-pagination',
            observer:true,
            observerParents:true,
            onSlideChangeEnd: function(swiper){ 
                swiper.update();  
            }
        });
    }
    //getmedals();
    //点击勋章显示弹窗
    $(".medal-wrapper img").click(function(){
        var imgId=$(this).attr('id');
        if(imgId){
            $('.medal-text').html(medals[imgId].remark);
            $('.medal-name1').html(medals[imgId].name);
            $('.medal-img img').attr('src','../resources/imgs/game/medal/'+medals[imgId].id+'-active.png');
            $(backgroundMusic).attr('src', musicPath.button);
            $('.congratulation-modal').fadeIn();
        }   
    })
    $('.congratulation-modal .confirm').click(function(){
        $('.congratulation-modal').fadeOut();
    })
    //荣誉排行关闭
    $('.close-honor').click(function(){
        $('.honor-rank-modal').fadeOut();
    });

    //获取点击勋章获得勋章
    $('.medal-tab').click(function(){
        rendermedals();
        $(this).attr('src','../resources/imgs/game/medal-active.png');
        $('.rank-tab').attr('src','../resources/imgs/game/rank.png');
        $('.rank-con').hide();
        $('.medal-wrap').show();
    })
    //获取排行榜
    var pageNo=1,pageSize=6,hasMore=true,rankindex=0;var rankList='';
    function getrankList(){
        $.ajax({
            type: 'get',
            url: DOMIN.MAIN + '/game/rankList',
            async: true,
            cache: false,
            data: {
                token: getCookie('token'),
                pageNo:pageNo,
                pageSize:pageSize
            },
            dataType: 'json',
            success: function (result) {
                if(result.success){
                    $('.rank-list').html('');
                    if(result.pageInfo.pageCount==result.pageInfo.pageIndex){
                        hasMore=false;
                    }else{
                        pageNo=pageNo+1;
                    }
                    for( var i=0;i<result.list.length;i++){
                        var schoolGone=result.list[i].schoolGone.split(',').length-1;
                        var medals=result.list[i].medals.split(',').length-1;
                        rankindex++;
                        if(rankindex==1){
                            rankList=`
                            <li id="${result.list[i].userId}">
                                <img src="../resources/imgs/game/1st.png" alt="" >
                                <span class="rank-name1">${result.list[i].realName}</span>
                                <span class="rank-study-tour">${schoolGone}</span>
                                <span class="rank-num">${result.list[i].level}</span>
                                <span class="rank-money">${result.list[i].coin}</span>
                                <span class="rank-medal">${medals}</span>
                                <span></span>
                            </li>`;
                        }else if(rankindex==2){
                            rankList=`
                            <li id="${result.list[i].userId}">
                                <img src="../resources/imgs/game/2nd.png" alt="" >
                                <span class="rank-name1">${result.list[i].realName}</span>
                                <span class="rank-study-tour">${schoolGone}</span>
                                <span class="rank-num">${result.list[i].level}</span>
                                <span class="rank-money">${result.list[i].coin}</span>
                                <span class="rank-medal">${medals}</span>
                                <span></span>
                            </li>`;
                        }else if(rankindex==3){
                            rankList=`
                            <li id="${result.list[i].userId}">
                                <img src="../resources/imgs/game/3rd.png" alt="" >
                                <span class="rank-name1">${result.list[i].realName}</span>
                                <span class="rank-study-tour">${schoolGone}</span>
                                <span class="rank-num">${result.list[i].level}</span>
                                <span class="rank-money">${result.list[i].coin}</span>
                                <span class="rank-medal">${medals}</span>
                                <span></span>
                            </li>`;
                        }else{
                            rankList=`
                            <li id="${result.list[i].userId}">
                                <span class="rank-index">${rankindex}</span>
                                <span class="rank-name1">${result.list[i].realName}</span>
                                <span class="rank-study-tour">${schoolGone}</span>
                                <span class="rank-num">${result.list[i].level}</span>
                                <span class="rank-money">${result.list[i].coin}</span>
                                <span class="rank-medal">${medals}</span>
                                <span></span>
                            </li>`;
                        }
                        $('.rank-list').append(rankList);
                    }
                    $('.loadMore').show();
                    //$('.rank-list').html(rankList);
                }else{
                    showToast(result.message);
                }
            },
        })
    };
    //点击排行榜
    $('.rank-tab').click(function(){
        $(this).attr('src','../resources/imgs/game/rank-active.png');
        $('.medal-tab').attr('src','../resources/imgs/game/medal.png');
        $('.rank-list').html('');
        pageNo=1;hasMore=true;rankindex=0;
        $('.loadMore').hide();
        getrankList();
        $('.rank-con').show();
        $('.medal-wrap').hide();
    });
    var userId;
    $('.rank-list').on('click','li',function(){
        userId=$(this).attr('id');
        //$('.honor-rank-modal').fadeOut();
        otherMedal();
        otherTour();
        $('.honor-other-modal').fadeIn();
    })
    $('.closeOther').click(function(){
        $('.honor-other-modal').fadeOut();
        getUserInfo();
    })
    //点击更多
    $('.loadMore').click(function(){
        if(hasMore){
            getrankList();
        }else{
            showToast('已是最后一页');            
        }
    })
    //查看他人勋章
    var otherTourPics,otherMedal;
    function otherMedal(){
        $('.other-medal-wrapper img').each(function(i){
            if($(this).attr('src').indexOf('-active')!=-1){
                var defaultSrc=$(this).attr('src').replace('-active','')
                $(this).attr('src',defaultSrc);
                $(this).removeAttr('id');
            }
        })
        $.ajax({
            type: 'get',
            url: DOMIN.MAIN + '/game/otherInfo',
            async: true,
            cache: false,
            data: {
                userId:userId
            },
            dataType: 'json',
            success: function (result) {
                if(result.success){
                    var othermedals=result.data.medals;
                    var medalArr=othermedals.split(',');
                    $.each(medals,function(key,value){
                        for(let i=1; i<medalArr.length; i++){
                            if(key==medalArr[i]){
                                console.log(medals[key]);
                                $('.other-medal-wrapper').find('img').eq(i-1).attr({
                                    'src':'../resources/imgs/game/medal/'+medals[key].id+'-active.png',
                                    'id':medals[key].id
                                }); 
                            };
                        };
                    });
                    var swiper4 = new Swiper('.swiper-container4',{
                        pagination: '.swiper-pagination4',
                        observer:true,
                        observerParents:true,
                        onSlideChangeEnd: function(swiper){ 
                            swiper.update();  
                        }
                    });
                    $('.avatar').eq(0).attr('src', result.data.headerPic);
                    $('.name').eq(0).text(result.data.realName);
                    $('.rank span').eq(1).text(result.data.coin);
                    $('.rank span').eq(0).text(result.data.level);
                    //$('.my-gold').html(result.data.coin);
                }
            }
        }) 
    };
    //查看他人勋章弹窗
    $(".other-medal-wrapper img").click(function(){
        var otherMedalimgId=$(this).attr('id');
        if(otherMedalimgId){
            $('.medal-text').html(medals[otherMedalimgId].remark);
            $('.medal-name1').html(medals[otherMedalimgId].name);
            $('.medal-img img').attr('src','../resources/imgs/game/medal/'+medals[otherMedalimgId].id+'-active.png');
            $(backgroundMusic).attr('src', musicPath.button);
            $('.congratulation-modal').fadeIn();
        }   
    })
    //查看他人游学
    var otherTourList;
    function otherTour(){
        $.ajax({
            type: 'get',
            url: DOMIN.MAIN + '/game/otherPics',
            async: true,
            cache: false,
            data: {
                userId:userId,
            },
            dataType: 'json',
            success: function (result) {
                if(result.success){
                    otherTourList=result.list;
                    if(otherTourList.length==0){
                        //showToast('暂无游学图片')
                        $('.swiper-pagination3').hide(); 
                        $('.other-tour-pics-wrap').html('');   
                    }else{
                        let amount = Math.ceil(result.list.length / 6);
                        var count = 0, htmls = '';
                        for (let j = 0; j < amount; j++) {
                            htmls += '<ul class="other-tour-pics swiper-slide">';
                            for (let i = 0; i < 6; i++) {
                                if (count >= result.list.length) {
                                    break;
                                }
                                let deleteId = result.list[count].id
                                let picId = result.list[count].pic
                                let li = `
                                        <li class="tour-pic-bg">
                                            <img src="../resources/imgs/game/school/${picId}.png" alt="" data-picid=${picId} data-deleteid=${deleteId}>
                                        </li>
                                        `
                                htmls += li;
                                count++
                            }
                            htmls += '</ul>';
                            $('.other-tour-pics-wrap').html(htmls);
                        }
                        $('.swiper-pagination3').show();
                        var swiper3 = new Swiper('.swiper-container3',{
                            pagination: '.swiper-pagination3',
                            observer:true,
                            observerParents:true,
                            onSlideChangeEnd: function(swiper){ 
                                swiper.update();  
                            }
                        });
                    }   
                }else{
                    showToast(result.message);
                }
            }
        }) 
    }
    $('.otherMedal-tab').click(function(){
        $(this).attr('src','../resources/imgs/game/medal-active.png');
        $('.otherTour-tab').attr('src','../resources/imgs/game/tour.png');
        $('.otherTour-con').hide();
        $('.otherMedal-con').show();
        //otherMedal();
    });
    $('.other-tour-pics-wrap').on('click', 'img', function (e) {
        let sharePicId = $(e.target).attr('data-picid');
        currentShareImg = `${DOMIN.MAIN}/resources/imgs/game/school-code/${sharePicId}.png`;
        $(backgroundMusic).attr('src', musicPath.modal);
        $('.other-tour-share-modal>div').css('backgroundImage', `url(../resources/imgs/game/school-share/${sharePicId}.png)`);
        $('.other-tour-share-modal').fadeIn();
    })
    $('.close-other-tour').click(function(){
        $('.other-tour-share-modal').fadeOut();
    })
    //点击切换游学
    $('.otherTour-tab').click(function(){
        if(otherTourList.length==0){
            showToast('暂无游学图片')
        }
        $(this).attr('src','../resources/imgs/game/tour-active.png');
        $('.otherMedal-tab').attr('src','../resources/imgs/game/medal.png');
        $('.otherTour-con').show();
        $('.otherMedal-con').hide();
    })


    $('.closeMusic').click(function(){
        $(backgroundMusic).attr('src', musicPath.button);
    })

    var musicStatus=true;
    $('.music-stop').click(function(){
        if(musicStatus){
            $('.music-stop').attr('src','../resources/imgs/game/music-start.png');
            musicStatus=false;
            document.getElementById('bgAudio').pause();
        }else{
            $('.music-stop').attr('src','../resources/imgs/game/music-stop.png');
            musicStatus=true;
            document.getElementById('bgAudio').play();
        }   
    })

    $('.mask').click(function(){
        if(userData.tasks.length>0){ 
            $('.noDonetask-modal').fadeIn();
        }else if(localStorage.getItem('taskTime')<=0){
            $('.game-over-modal').fadeIn();
        }else if(userData.school!=0){
            showToast('现在正在游学，请第二天再来');
        }
        $(backgroundMusic).attr('src', musicPath.modal);
    })

        let questionData = null;
        let questionOption = [];
        //题目数据
        let questionId = ''
        let answer = ''
        //getChallengeRes();
        //挑战结果数据
        // getQuestion();
        function getQuestion() {
            $.ajax({
                type: 'post',
                url: DOMIN.MAIN + '/game/randomQuestion',
                async: true,
                cache: false,
                data: {
                    token: getCookie('token')
                },
                dataType: 'json',
                success: function (result) {
                    if (result.success) {
                        questionData = result.list[0]
                        refreshQuestion()
                    } else {
                        //到达交卷页                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                        if (result.message.indexOf('答题超过上限') != -1 && questionData) {
                            $('.question').empty();
                            $('.challenge-test-modal').hide()
                            $('.challenge-submit-modal').fadeIn()
                        } else {
                            //到达结果页
                            showToast(result.message)
                            $('.challenge-test-modal').hide()
                            $('.challenge-res-modal').fadeIn()
                            getChallengeRes();
                        }
                    }
                }
            })
        }
        //获取结果
        function getAnswer() {
            if ($(".next-question").is(":hidden")) {
                $(".next-question").fadeIn()
            }
            $.ajax({
                type: 'post',
                url: DOMIN.MAIN + '/game/answerQuestion',
                async: true,
                cache: false,
                data: {
                    token: getCookie('token'),
                    questionId: questionData.id,
                    answer: answer
                },
                dataType: 'json',
                success: function (result) {
                    if (result.success) {
                        //提交后数据
                        let answerData = result.data
                        $('#test-gold').text(answerData.todayCoin)
                        $('.ask-true span').text(answerData.rightCount)
                        $('.ask-false span').text(answerData.wrongCount)
                        $('.question-nth').text(`${answerData.todayCount + 1}.`)
                        //清除上题数据
                        $('.question-option').empty();
                        $('.gold-animate-wrap').hide()
                        questionId = ''
                        answer = ''
                        getQuestion();
                    }
                }
            })
        }
        function getChallengeRes() {
            $.ajax({
                type: 'post',
                url: DOMIN.MAIN + '/game/userInfo',
                async: true,
                cache: false,
                data: {
                    token: getCookie('token')
                },
                dataType: 'json',
                success: function (result) {
                    if (result.success) {
                        if ($('#test-gold').text() == 0) {
                            // 用户关闭页面重新渲染
                            $('#test-gold').text(result.data.todayCoin)
                            $('.ask-true span').text(result.data.rightCount)
                            $('.ask-false span').text(result.data.wrongCount)
                            $('.question-nth').text(`${result.data.todayCount + 1}.`)
                        }
                        //填充数据
                        $('.res-true').text(result.data.rightCount)
                        $('.res-false').text(result.data.wrongCount)
                        $('.res-gold').text(result.data.todayCoin)
                    } else {
                    }
                }
            })
        }
        function transLetter(num) {
            switch (num) {
                case 0:
                    num = 'A'
                    return num;
                case 1:
                    num = 'B'
                    return num;
                case 2:
                    num = 'C'
                    return num;
                case 3:
                    num = 'D'
                    return num;
            }
        }
        function refreshQuestion() {
            questionOption.splice(0, questionOption.length)
            $('.question-content').text(questionData.question)
            for (key in questionData) {
                if (questionData[key] && /option/.test(key)) {
                    questionOption.push(questionData[key])
                }
            }
            for (let i = 0; i < questionOption.length; i++) {
                let letter = transLetter(i)
                if (questionData.qType == -1) {
                    //拼音题
                    let spellQuestion = []
                    spellQuestion = questionOption[i].split(',')
                    //汉字
                    spellQuestion[0] = spellQuestion[0].split('').join('&nbsp;&nbsp;&nbsp;&nbsp;')
                    // 拼音
                    spellQuestion[1] = spellQuestion[1].split('-').join('&nbsp;')
                    let li = `
                            <li>
                                <span class="question-select" data-letter=${letter}></span>
                                <span class="${letter}-color">${letter}</span>
                                <span style="position:relative;flex:5;margin-top:.15rem;">&nbsp;&nbsp;${spellQuestion[0]}<span style="position:absolute;top:-.4rem;display:flex;">${spellQuestion[1]}</span></span>
                            </li>
                        `
                    $('.question-option').append(li)
                } else {
                    //非拼音题
                    let li = `
                            <li>
                                <span class="question-select" data-letter=${letter}></span>
                                <span class="${letter}-color">${letter}</span>
                                <span>${questionOption[i]}</span>
                            </li>
                        `
                    $('.question-option').append(li)
                }

            }
        }
        //提示答案
        function showAnswer() {
            let optionArr = $('.question-select')
            let trueAnswer = questionData.answer
            let falseAnswer = answer
            for (let j = 0; j < optionArr.length; j++) {
                optionArr.eq(j).replaceWith(`<img src="" alt="" style="width:.5rem;height:.5rem;margin-right:.093rem;display:block;" class=${transLetter(j)}-option></img>`)
            }
            $(`.${trueAnswer}-option`).attr('src', "../resources/imgs/game/true.png")
            $(`.${falseAnswer}-option`).attr('src', "../resources/imgs/game/false.png")
            $(`.${falseAnswer}-option`).next().next().css({
                'color': '#F6595F'
            })
        }
        //点击选项
        $('.question-option').click(function (e) {
            if ($(e.target).hasClass('question-select')) {
                let selectArr = $('.question-select')
                for (let i = 0; i < selectArr.length; i++) {
                    $(selectArr[i]).removeClass('option-checked')
                }
                $(e.target).addClass('option-checked')
                answer = $(e.target).attr('data-letter')
            }
            console.log(questionData)
        })

        // 点击还没多次判断
        //点击下一题
        $('.next-question').click(function () {
            if (answer == '') {
                showToast('请进行作答')
                return
            }
            //提示回答错误
            if (answer != questionData.answer) {
                $('.next-question').hide()
                //播放错误提示音
                $(backgroundMusic).attr('src', musicPath.wrong);
                goToFirst()
                showAnswer()
                setTimeout(function () {
                    audioPause()
                    getAnswer()
                }, 4000)
                // 提示回答正确
            } else {
                $('.next-question').hide()
                //金币弹窗 + 正确音效
                $('.gold-animate-wrap').show()
                $('.gold-animate-wrap span').text(questionData.coin)
                $(backgroundMusic).attr('src', musicPath.right)
                goToFirst()
                setTimeout(function () {
                    audioPause()
                }, 700)
                setTimeout(function () {
                    $('.gold-animate-wrap').fadeOut()
                    getAnswer()
                }, 1200)
            }
        })
        //点击交卷
        $('.submit-question').click(function () {
            $('.challenge-test-modal').hide()
            $('.challenge-submit-modal').hide()
            $('.challenge-res-modal').fadeIn()
            getChallengeRes();
        })
        $('#test-close').click(function () {
            $('.question-option').empty();
            $('.challenge-test-modal').fadeOut();
            getUserInfo();
        })
        //关闭结果页
        $('.challenge-res-modal .confirm').click(function () {
            $('.challenge-res-modal').fadeOut()
        })



        let currentShareImg = "";
        let saveImg = "";
        let deleteId = 0;
        getJsParam();
        //游学
        let schoolAll = [
            {
                id: 1,
                name: '美国',
                x: 51,
                y: 25,
            },
            {
                id: 2,
                name: '英国',
                x: 44,
                y: 45,
            },
            {
                id: 3,
                name: '日本',
                x: 52,
                y: 81,
            },
            {
                id: 4,
                name: '加拿大',
                x: 47,
                y: 26,
            },
            {
                id: 5,
                name: '瑞士',
                x: 48,
                y: 51,
            },
            {
                id: 6,
                name: '德国',
                x: 45,
                y: 51,
            },
            {
                id: 7,
                name: '法国',
                x: 47,
                y: 48,
            },
            {
                id: 8,
                name: '中国',
                x: 51,
                y: 73,
            },
            {
                id: 9,
                name: '秘鲁',
                x: 70,
                y: 28,
            },
            {
                id: 10,
                name: '墨西哥',
                x: 58,
                y: 19,
            },
            {
                id: 11,
                name: '白俄罗斯',
                x: 44,
                y: 53,
            },
            {
                id: 12,
                name: '澳大利亚',
                x: 50,
                y: 49,
            },
            {
                id: 13,
                name: '俄罗斯',
                x: 44,
                y: 57,
            },
            {
                id: 14,
                name: '埃及',
                x: 55,
                y: 53,
            },
            {
                id: 15,
                name: '南非',
                x: 78,
                y: 50,
            },
            {
                id: 16,
                name: '巴西',
                x: 71,
                y: 32,
            },
            {
                id: 17,
                name: '中国',
                x: 56,
                y: 76,
            },
            {
                id: 18,
                name: '卡塔尔',
                x: 56,
                y: 58,
            },
            {
                id: 19,
                name: '肯尼亚',
                x: 67,
                y: 54,
            },
            {
                id: 20,
                name: '印尼',
                x: 67,
                y: 77,
            },
            {
                id: 21,
                name: '中国',
                x: 58,
                y: 76,
            },
            {
                id: 22,
                name: '中国',
                x: 57,
                y: 73,
            },
            {
                id: 23,
                name: '中国',
                x: 56,
                y: 72,
            },
            {
                id: 24,
                name: '中国',
                x: 78,
                y: 50,
            },
            {
                id: 25,
                name: '中国',
                x: 57,
                y: 74,
            },
            {
                id: 26,
                name: '中国',
                x: 50,
                y: 75,
            },
            {
                id: 27,
                name: '中国',
                x: 52,
                y: 77,
            },
            {
                id: 28,
                name: '朝鲜',
                x: 51,
                y: 78,
            }
        ]
        
        //请求游学图片
        //getTourPics();
        function getTourPics() {
            $.ajax({
                type: 'post',
                url: DOMIN.MAIN + '/game/pics',
                async: true,
                cache: false,
                data: {
                    token: getCookie('token')
                },
                dataType: 'json',
                success: function (result) { 
                    if (result.success) {
                        if(result.list.length==0){
                             $('.swiper-pagination2').hide();
                             $('.tour-pics-wrap').html('');  
                        }else{
                            //console.log(result.list);
                            let amount = Math.ceil(result.list.length / 6);
                            var count = 0, htmls = '';
                            for (let j = 0; j < amount; j++) {
                                htmls += '<ul class="tour-pics swiper-slide" style="box-sizing:border-box">';
                                for (let i = 0; i < 6; i++) {
                                    if (count >= result.list.length) {
                                        break;
                                    }
                                    let deleteId = result.list[count].id
                                    let picId = result.list[count].pic
                                    let li = `
                                            <li class=" tour-pic-bg">
                                                <img src="../resources/imgs/game/school/${picId}.png" alt="" data-picid=${picId} data-deleteid=${deleteId}>
                                            </li>
                                            `
                                    htmls += li;
                                    count++;
                                }
                                htmls += '</ul>';
                                $('.tour-pics-wrap').html(htmls);    
                            }
                            $('.swiper-pagination2').show();   
                        }  
                        var swiper2 = new Swiper('.swiper-container2',{
                            pagination: '.swiper-pagination2',
                            observer:true,
                            observerParents:true,
                            onSlideChangeEnd: function(swiper){ 
                                swiper.update();  
                            }
                        });  
                    }else {
                        showToast(result.message)
                    }
                }
            });
        }
        //删除游学
        function deletePic(deleteId) {
            $.ajax({
                type: 'post',
                url: DOMIN.MAIN + '/game/deletePic',
                async: true,
                cache: false,
                data: {
                    token: getCookie('token'),
                    picId: deleteId
                },
                dataType: 'json',
                success: function (result) {
                    if (result.success) {
                        console.log(result);
                        showToast('删除成功');
                        getTourPics();
                    } else {
                        showToast(result.message)
                    }
                }
            });
        }
        //获取学校坐标
        function getTourSchool() {
            let schoolGone = userData.schoolGone.split(',')
            schoolGone.splice(0, 1)
            for (let i = 0; i < schoolGone.length; i++) {
                for (let j = 0; j < schoolAll.length; j++) {
                    if (schoolGone[i] == schoolAll[j].id) {
                        let img = `<img src="../resources/imgs/game/cap.png" alt="" class="cap" style="top:${schoolAll[j].x}%;left:${schoolAll[j].y}%">`;
                        $('.map').append(img)
                        break;
                    }
                }
            }
        }
        //分享弹窗
        $('.tour-pics-wrap').on('click', 'img', function (e) {
            let sharePicId = $(e.target).attr('data-picid');
            deleteId = $(e.target).attr('data-deleteid');
            currentShareImg = `${DOMIN.MAIN}/resources/imgs/game/school-code/${sharePicId}.png`;
            saveImg = `${DOMIN.MAIN}/resources/imgs/game/school/${sharePicId}.png`;
            $(backgroundMusic).attr('src', musicPath.modal);
            $('.tour-share-modal').fadeIn();
            $('.tour-share-modal>div').css('backgroundImage', `url(../resources/imgs/game/school-share/${sharePicId}.png)`)
        })
        //分享
        $('.share-school').click(function () {
            wx.previewImage({
                current: currentShareImg, // 当前显示图片的http链接
                urls: [currentShareImg] // 需要预览的图片http链接列表
            });
        })
        //关闭分享弹窗
        $('.tour-share-modal .small-close').click(function () {
            $('.tour-share-modal').fadeOut()
        })
        //删除
        $('.tour-share-modal .small-delete').click(function () {
            if(userData.tasks.length>0){
                $('.noDonetask-modal').fadeIn();
                $(backgroundMusic).attr('src', musicPath.modal);
            }else{
                deletePic(deleteId);
                $('.tour-share-modal').fadeOut();
                $(backgroundMusic).attr('src', musicPath.button);
            } 
        })
        //保存
        $('.tour-share-modal .small-save').click(function () {
            if(userData.tasks.length>0){
                $('.noDonetask-modal').fadeIn();
                $(backgroundMusic).attr('src', musicPath.modal);
            }else{
                wx.previewImage({
                    current: saveImg, // 当前显示图片的http链接
                    urls: [saveImg] // 需要预览的图片http链接列表
                });
            }   
        })
        //关闭游学
        $('.tour-me-modal .close').click(function () {
            $('.tour-me-modal').fadeOut();
        });
        function getJsParam() {
            $.ajax({
                type: 'post',
                url: DOMIN.MAIN + '/jsApi',
                async: true,
                cache: false,
                data: {
                    url: location.href
                },
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: data.data.appId, // 必填，公众号的唯一标识
                            timestamp: data.data.timestamp, // 必填，生成签名的时间戳
                            nonceStr: data.data.noncestr, // 必填，生成签名的随机串
                            signature: data.data.signature,// 必填，签名，见附录1
                            jsApiList: ['scanQRCode', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems', 'previewImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                    } else {
                        showToast(data.message)
                    }
                }
            });
        }       
})