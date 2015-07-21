!function() {
	var currLevel;
	var maxSpanNum = 8;
	var totalTime = 0;
	var remainTime = 0;
	var levelTotalTime = 0;
	var timeInterval;
	var checkMobile = function () {
   
		return navigator.userAgent.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i)!= null;
	     
  	};
  	var clickEvent = checkMobile() ? "touchstart" : "click";
  	//var LevelData = {"1":{num:2,time:10,aimWord:"哈",otherWord:"啊"},"2":{num:3,time:10,aimWord:"太",otherWord:"大"},"3":{num:4,time:10,aimWord:"下",otherWord:"卞"},"4":{num:4,time:10,aimWord:"日",otherWord:"目"},"5":{num:5,time:10,aimWord:"鸟",otherWord:"乌"},"6":{num:5,time:10,aimWord:"戌",otherWord:"戍"},"7":{num:6,time:10,aimWord:"西",otherWord:"酉"},"8":{num:6,time:10,aimWord:"律",otherWord:"津"},"9":{num:6,time:10,aimWord:"壿",otherWord:""},"10":{num:7,time:10,aimWord:"己",otherWord:"已"}};
  	var LevelData = {"1":{num:2,time:10,aimWord:"哈",otherWord:"啊"},"2":{num:3,time:10,aimWord:"太",otherWord:"大"}};
	var _g = {

		renderWordDiv : function() {
			var isLandscape = 90 == window.orientation || -90 == window.orientation;
            var width = isLandscape ? window.innerHeight : window.innerWidth;
            var height = isLandscape ? window.innerWidth : window.innerHeight;
            width = Math.min(width, 600);
            var $wordDiv = $("#g_word_div");
            $wordDiv.css("width", width);
            $wordDiv.css("height", width);
            
        },

		renderWords : function(num, aimWord, otherWord) {

			num = num < maxSpanNum ? num : maxSpanNum;
			var amount = num * num;

			var aimIdx = parseInt(Math.random() * amount, 10);
			var html = "";
			var aimClazz = "g_aim_word word_span word_span" + num;
			var otherClazz = "g_other_word word_span word_span" + num;
			for(var i = 0; i < amount; i++) {
				var word = otherWord;
				var clazz = otherClazz;
				if(i == aimIdx) {
					word = aimWord;
					clazz = aimClazz;
				}
				html += "<span class='" + clazz + "' data-idx='" + i + "'>" + word + "</span>";
			}
			var $wordDiv = $("#g_word_div");
			$wordDiv.html(html);
			$wordDiv.show();
			this.bindClick(aimIdx);
		},

		renderLevel : function() {
			var data = LevelData[currLevel];
			totalTime += levelTotalTime - remainTime;
			if(data) {
				this.renderWords(data.num, data.aimWord, data.otherWord);
				levelTotalTime = remainTime = data.time;
				$("#g_level_span").html(currLevel);
				$("#g_time_span").html(remainTime);
			} else {
				clearInterval(timeInterval);
				$("#g_main").hide();
				$.post("RankAction", {time:totalTime}, function(data) {
					$("#g_restart_title").html("恭喜您，成功通关。<br>用时：" + totalTime + "秒,<br> 击败全国" + data + "% 的玩家！");
					$("#g_restart_div").fadeIn(1000);
				},"json");
			}
		},

		renderGameOver : function() {
			clearInterval(timeInterval);
			$("#g_main").hide();
			$("#g_restart_title").html("很遗憾，时间到了。<br>当前关卡：" + currLevel);
			$("#g_restart_div").fadeIn(1000);
			
		},

		bindClick : function(aimIdx) {
			var t = this;
			$(".g_aim_word").bind(clickEvent, function() {
				currLevel++;
				t.renderLevel();
			});

			$(".g_other_word").bind(clickEvent, function() {
				
			});
		},

		pastTime : function(time) {
			if(!time) {
				time = 1;
			}
			remainTime -= time;
			if(remainTime <= 0) {
				 _g.renderGameOver();
				return;
			}
			
			$("#g_time_span").html(remainTime);
		},

		init : function() {
			var t = this;
			$("#g_start, #g_restart").bind(clickEvent, function() {
				$("#g_restart_div").hide();
				currLevel = 1
				totalTime = 0
				$("#g_menu").hide();
				$("#g_main").fadeIn(1000);
				t.renderWordDiv();
				t.renderLevel(currLevel);
				timeInterval = setInterval(t.pastTime, 1000);
			});
		
		}
	}

	window.Game = _g;

}();

$(function() {
	Game.init();
});