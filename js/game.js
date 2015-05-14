!function() {

	var maxSpanNum = 6;
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
			for(var i = 0; i < amount; i++) {
				var word = otherWord;
				if(i == aimIdx) {
					word = aimWord;
				}
				html += "<span class='word_span word_span" + num + "' data-idx='" + i + "'>"+word+"</span>";
			}
			var $wordDiv = $("#g_word_div");
			$wordDiv.html(html);
			$wordDiv.show();
		},

		renderLevel : function(level) {
			var data = LevelData[level];
			this.renderWords(data.num, data.aimWord, data.otherWord);
		},

		init : function() {
			var t = this;
			$("#g_start").bind(clickEvent, function() {
				$("#g_menu").hide();
				$("#g_main").fadeIn(1000);
				t.renderWordDiv();
				t.renderLevel(1);
				
			});
		}
	}

	window.Game = _g;

}();

$(function() {
	Game.init();
});