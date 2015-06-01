!function() {
	var currLevel = 1;
	var maxSpanNum = 8;
	var checkMobile = function () {
   
		return navigator.userAgent.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i)!= null;
	     
  	};
  	var clickEvent = checkMobile() ? "touchstart" : "click";
  	var LevelData = {
  		"1" : {
  			num : 2,
			aimWord : "哈",
			otherWord : "啊"
  		},
  		"2" : {
  			num : 3,
			aimWord : "太",
			otherWord : "大"
  		},
  		"3" : {
  			num : 4,
			aimWord : "太",
			otherWord : "大"
  		},
  		"4" : {
  			num : 4,
			aimWord : "太",
			otherWord : "大"
  		},
  		"5" : {
  			num : 5,
			aimWord : "太",
			otherWord : "大"
  		},
  		"6" : {
  			num : 5,
			aimWord : "太",
			otherWord : "大"
  		},
  		"7" : {
  			num : 6,
			aimWord : "太",
			otherWord : "大"
  		},
  		"8" : {
  			num : 6,
			aimWord : "太",
			otherWord : "大"
  		},
  		"9" : {
  			num : 6,
			aimWord : "太",
			otherWord : "大"
  		},
  		"10" : {
  			num : 7,
			aimWord : "太",
			otherWord : "大"
  		},
  		"11" : {
  			num : 7,
			aimWord : "太",
			otherWord : "大"
  		},
  		"12" : {
  			num : 7,
			aimWord : "太",
			otherWord : "大"
  		},
  		"13" : {
  			num : 8,
			aimWord : "太",
			otherWord : "大"
  		},
  		"14" : {
  			num : 8,
			aimWord : "太",
			otherWord : "大"
  		},
  		"15" : {
  			num : 8,
			aimWord : "太",
			otherWord : "大"
  		},
  		"16" : {
  			num : 8,
			aimWord : "太",
			otherWord : "大"
  		}
  	};
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
			if(data) {
				this.renderWords(data.num, data.aimWord, data.otherWord);
			} else {
				//通关
				alert("通关");
			}
		},

		bindClick : function(aimIdx) {
			var t = this;
			$(".g_aim_word").bind(clickEvent, function() {
				currLevel++;
				t.renderLevel();
			});

			$(".g_other_word").bind(clickEvent, function() {
				alert("no");
			});
		},

		init : function() {
			var t = this;
			$("#g_start").bind(clickEvent, function() {
				$("#g_menu").hide();
				$("#g_main").fadeIn(1000);
				t.renderWordDiv();
				t.renderLevel(currLevel);
				
			});
		}
	}

	window.Game = _g;

}();

$(function() {
	Game.init();
});