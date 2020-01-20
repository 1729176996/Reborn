var vm,loading;
$(function(){
    FastClick.attach(document.body);
	vm = new Vue({
	    el: "#main",
	    data:{
			list:[]
	    },
	    mounted:function(){
			this.init();
			if(getBrowser()!='电脑端'){
				// H5 plus事件处理
				function plusReady(){
					// 检查当前版本，与从后台获取的版本作比较，以此判断是否更新     
					plus.runtime.getProperty(plus.runtime.appid,function(inf){
						// 当前版本
						var wgtVersion = inf.version;
						$.ajax({
							url:'https://1729176996.github.io/RebornVersion/version.json',
							type:'get',
							dataType: 'json',
							success:function(data){
								console.log(data);
								// 如果有新版本，则提示需要更新
								if( data.version > wgtVersion ){
									var updatedContent = '';
									if(data.updatedContent&&data.updatedContent.length>0){
										updatedContent += '<p class="updatedContent">更新内容:</p><p class="updatedContent">';
										for(key in data.updatedContent){
											updatedContent += '<p class="updatedContent2">'+(key*1+1)+'.'+data.updatedContent[key]+'</p>';
										}
										updatedContent += '</p>';
									}else{
										updatedContent += '检查更新';
									}
									mui.confirm(updatedContent,'发现新版本，是否更新',['确定','取消'],function(e){
										if(e.index==0){
											downloadWgt(); // 下载wgt方法
										}else{
											return;
										}
									},'div');
								}else{
									return;
								}
							},
							error:function(xhr, errorType, error,msg){
								mui.alert(msg,'提示','确定',null,'div');
							}
						})
					});
				}
				if(window.plus){
					plusReady();
				}else{
					document.addEventListener('plusready',plusReady,false);
				}
			}else{
				$.ajax({
					url:'https://1729176996.github.io/RebornVersion/version.json',
					type:'get',
					dataType: 'json',
					success:function(data){
						console.log(data);
						var updatedContent = '';
						if(data.updatedContent&&data.updatedContent.length>0){
							updatedContent += '<p class="updatedContent">更新内容:</p><p class="updatedContent">';
							for(key in data.updatedContent){
								updatedContent += '<p class="updatedContent2">'+(key*1+1)+'.'+data.updatedContent[key]+'</p>';
							}
							updatedContent += '</p>';
						}else{
							updatedContent += '检查更新';
						}
						mui.confirm(updatedContent,'发现新版本，是否更新',['确定','取消'],function(e){
							if(e.index==0){
								downloadWgt(); // 下载wgt方法
							}else{
								return;
							}
						},'div');
					},
					error:function(xhr, errorType, error,msg){
						mui.alert(msg,'提示','确定',null,'div');
					}
				})
			}
	    },
	    methods:{
			init:function(){
				var _this = this;
				_this.list = [
					{
						name:'小说',func:function(){
							//window.localStorage.setItem('type','all');
							//window.location.href = 'novel.html';
						}
					}
				];
				_this.$nextTick(function(){
					mui('#scrollWrapper').scroll({
						indicators:false,
						deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
					}).scrollTo(0,0,0);
				})
			},
			toTop:function(){
				mui('#scrollWrapper').scroll({
					indicators:false,
					deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
				}).scrollTo(0,0,100);
			},
			selectItem:function(item){
				if(item&&item.func){
					item.func();
				}
			}
	    }
	});
});
