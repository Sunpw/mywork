function getQuestion(params) {
	var parm = params
	window.parm = parm;
}
function sendmgs(mgs) {
	var iframe = document.createElement('iframe');
	iframe.setAttribute('src', 'webview:#mgs#' + mgs);
	document.documentElement.appendChild(iframe);
	iframe.parentNode.removeChild(iframe);
	iframe = null;
}
window.getQuestion = getQuestion;
window.sendmgs = sendmgs;