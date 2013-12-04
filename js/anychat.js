function LRfloater0() {
	document.getElementById('LRfloater0').innerHTML = LR_FloatDiv;
	document.getElementById('LRfloater0').style.display = "block";

}
function LR_showInviteDiv(h1, h2) {
	if (!LR_showinvite) return;
	if (h1 == null && h2 == null) return;
	if (h1 == '1' && h2 == '1' && LR_chated_no_invite && LR_getCookie('LR_lastchat') == '1') {
		return
	}
	if (typeof(LiveAutoInvite0) != 'undefined' && h1 == '1') h1 = LiveAutoInvite0;
	if (h2 == '1') h2 = LR_GetAutoInvite2();
	if (h1.indexOf('%IP%') != -1) {
		var ipfrom = unescape(LR_ip1);
		if (ipfrom.length < 3 || (LR_ip1 == null && LR_ip2 == null)) {
			h1 = ''
		} else {
			h1 = h1.replace('%IP%', ipfrom)
		}
	}
	LR_m_f(LR_m_d);
	if ((typeof(LR_invite_m) != 'undefined') && LR_invite_m) LR_m_d = LR_m_e();
	LR_Floaters[1].pms['html'] = LR_UserInviteDiv.replace('{c0}', LR_invite_color0).replace('{c1}', LR_invite_color1).replace('{c2}', LR_invite_color2).replace('{c3}', LR_invite_color3).replace('{aimg}', LR_CheckUserUrl(LR_accept_img)).replace('{fimg}', LR_CheckUserUrl(LR_refuse_img)).replace('{pimg}', LR_CheckUserUrl(LR_ivite_img)).replace('{h1}', h1).replace('{h2}', h2).replace(/\{0\}/g, 'LR_HideInvite();openZoosUrl();').replace(/\{1\}/g, 'LR_HideInvite();LR_RefuseChat();');
	LR_Floaters[1].showdiv(0);
	LR_Floaters[1].imageTimer(true);
	if (LR_invite_hide_float && LR_showfloat) LR_Floaters[0].hidden();
	LR_SetCookie('lastshowinvite', new Date().getTime(), 720);
	// 此处为新增--------------------------------------
	document.getElementById('swtshit').style.display="none";
	document.getElementById('LRfloater1').style.cssText = "position: fixed; left:50%; margin-left:-200px; bottom:30px; z-index:1000000; width:424px; overflow:visible; text-align:center; _position:absolute; _top: expression(documentElement.scrollTop + documentElement.clientHeight-this.offsetHeight-120);"
}
setTimeout('LRfloater0()', 500);

function LR_HideInvite() {
	LR_m_f(LR_m_d);
	LR_Floaters[1].hidden();
	// 右侧商务通flash出现----------------------------此处为新增的
    document.getElementById('swtshit').style.display="block";
	if (LR_invite_hide_float && LR_showfloat) LR_Floaters[0].showdiv(0);
	if (LR_istate == 1) {
		LR_istate = 0
	}
}
(function(a, b, c) {
	function e(a) {
		return a
	}
	function f(a) {
		return decodeURIComponent(a.replace(d, " "))
	}
	var d = /\+/g,
		g = a.cookie = function(d, h, i) {
			if (h !== c) {
				if (i = a.extend({}, g.defaults, i), null === h && (i.expires = -1), "number" == typeof i.expires) {
					var j = i.expires,
						k = i.expires = new Date;
					k.setDate(k.getDate() + j)
				}
				return h = g.json ? JSON.stringify(h) : h + "", b.cookie = [encodeURIComponent(d), "=", g.raw ? h : encodeURIComponent(h), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("")
			}
			for (var l = g.raw ? e : f, m = b.cookie.split("; "), n = 0, o = m.length; o > n; n++) {
				var p = m[n].split("=");
				if (l(p.shift()) === d) {
					var q = l(p.join("="));
					return g.json ? JSON.parse(q) : q
				}
			}
			return null
		};
	g.defaults = {}, a.removeCookie = function(b, c) {
		return null !== a.cookie(b) ? (a.cookie(b, null, c), !0) : !1
	}
})(jQuery, document);

$(function() {
	var ref = '';
	if (document.referrer.length > 0) {
		ref = document.referrer;
		if (ref.indexOf(window.location.host) == -1) {
			$.cookie('source_url', window.location.href, {
				expires: 7
			});
		}
	}
})