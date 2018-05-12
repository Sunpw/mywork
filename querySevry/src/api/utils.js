let utils = (function () {
	 /**
     * 动态计算rem
     */
    function initRem() {
		let iw = 750;
		let w = window.innerWidth;
		let irate = 625 / (iw / w);
		if(irate > 345) {
			irate = 345;
		}
		let str = 'html{font-size:' + irate + '%' + '}';
		let h_style = document.createElement("style");
		h_style.setAttribute("type", "text/css");
		h_style.innerHTML = str;
		document.getElementsByTagName('head')[0].appendChild(h_style);
    }
   return {
    	initRem:initRem
   }
})();
utils.initRem();