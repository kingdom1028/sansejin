//获取URL参数
function getQueryStringRegExp(name)
{    
  var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
  if (reg.test(location.href))
    return unescape(RegExp.$2.replace(/\+/g, " "));
  return "non";
}

//获取cookie信息
function _uGC(l,n,s) {
  if (!l||l==""||!n||n==""||!s||s=="") return "-";
  var i,i2,i3,c="-";
  i=l.indexOf(n);
  i3=n.indexOf("=")+1;
  if(i>-1) {
    i2=l.indexOf(s,i);if(i2<0) {i2=l.length}
    c=l.substring((i+i3),i2);
  }
  return c;
}

//获取GA的来源信息，构造新的参数给piwik使用
function SetPiwikSource() {

  var z       = _uGC(document.cookie,"utmz=",";");
  var g_source  = _uGC(z,"utmcsr=","|");
  var g_campaign  = _uGC(z,"utmccn=","|");  
  var g_term    = _uGC(z,"utmctr=","|");
  var g_content   = _uGC(z,"utmcct=","|");  
  var g_medium  = _uGC(z,"utmcmd=","|");
  var piwik_st  = "pk_campaign="+g_source+"-"+g_campaign+"-"+g_term+"&pk_kwd="+g_content+"-"+g_medium;
  
  if (g_term=="-") return "";
  return piwik_st;
}

//****开始：GA监测代码(跨域监测)****//
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-33502372-1'], 
['_setSessionCookieTimeout', 10800000],
['_addOrganic', 'soso', 'w'],
['_addOrganic', 'youdao', 'q'],
['_addOrganic', 'sogou', 'query'],
['_addOrganic', 'baidu', 'word'],
['_addOrganic','gougou','search']);
_gaq.push(['_setDomainName', 'none']);
_gaq.push(['_setAllowLinker', true]);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
//****结束：GA监测代码(跨域监测)****//

//****开始:piwik监测代码****//
var _paq = _paq || [];
var NewAtt;
var NewURL;
var GetSource   = getQueryStringRegExp('utm_source');
var GetCampaign   = getQueryStringRegExp('utm_campaign');
var GetTerm     = getQueryStringRegExp('utm_term');
var GetContent  = getQueryStringRegExp('utm_content');
var GetMedium   = getQueryStringRegExp('utm_medium');
var NewURL    = document.URL;
var _smt_VisitorId;

if (NewURL.indexOf('utm_source=') != -1)  //当前URL中包含utm_source时，改写URL参数传给piwik，一定要有utm_source这个参数
{
  NewURL    = NewURL.replace("&utm_medium="   + GetMedium, '');
  NewURL    = NewURL.replace("&utm_campaign=" + GetCampaign, '');
  NewURL    = NewURL.replace("&utm_term="     + GetTerm, '');
  NewURL    = NewURL.replace("&utm_content="  + GetContent, '');

  NewURL    = NewURL.replace("utm_medium="   + GetMedium  + "&", '');
  NewURL    = NewURL.replace("utm_campaign=" + GetCampaign  + "&", '');
  NewURL    = NewURL.replace("utm_term="     + GetTerm    + "&", '');
  NewURL    = NewURL.replace("utm_content="  + GetContent   + "&", '');

  NewAtt    = "pk_campaign="+GetSource+"-"+GetCampaign+"-"+GetTerm+"&pk_kwd="+GetContent+"-"+GetMedium;
  NewURL    = NewURL.replace("utm_source="+GetSource, NewAtt);
}

_paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
_paq.push(["setCustomUrl", NewURL]);
_paq.push(["trackPageView"]);
_paq.push([ function(){ _smt_VisitorId = this.getVisitorId();}]);

(function() {
  var u=(("https:" == document.location.protocol) ? "https" : "http") + "://st.pcpp.cn/";
  _paq.push(["setTrackerUrl", u+"piwik.php"]);
  _paq.push(["setSiteId", "1"]);
  var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";
  g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
})();
//****结束:piwik监测代码****//


//点击电话回拨的时候触发
function freecall_submit()
{
  var res = Ajax.call('/new_freecall.php','', null, 'POST', 'TEXT',false);
  $("body").prepend(res);
  _gaq.push(['_trackPageview', 'Virtual/zixun/freecall']);
  _paq.push(["trackPageView","Virtual/zixun/freecall"]);
}

//调用商务通的时候触发
function submit_ads_SMT() {
    try {
        xml = XmlRequest();
        var Url = "/adstats.php?step=adstats&advisory_type=SMT&Rnd=" + Math.random();
        xml.open("GET", Url, false);
        xml.send(null);
    } catch(e) {}
  
  //谷歌的点击监测(注意谷歌的是_gaq，piwik的是_paq)
  _gaq.push(["_trackPageview", "Virtual/zixun/" + LR_websiteid]);
  
  //piwik的点击监测
  _paq.push(["setCustomUrl", "Virtual/SMT/" + LR_websiteid]);
    _paq.push(["setCustomVariable", 1, "swt_cid", LR_cid, "visit"]);
  _paq.push(["setCustomVariable", 2, "GA_st", SetPiwikSource(), "visit"]); 
    _paq.push(["trackPageView","Virtual/SMT/" + LR_websiteid]);
}

function bd(url, be) {
  var bf = new Image(1, 1);
  bf.onload = function() {};
  bf.src = url + (url.indexOf("?") < 0 ? "?": "&") + be;
}

function _AjaxCall(url,be)
{
  try {
    var bg = window.XMLHttpRequest ? new window.XMLHttpRequest() : window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : null;
    bg.open("POST", url, true);
    bg.onreadystatechange = function() {
      if (this.readyState === 4 && this.status !== 200) {
        bd(url,be)
      }
    };
    bg.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    bg.send(be)
  } catch (ex) {
    bd(url,be)
  }
}
//自定义商务通中调用的内部函数
function openZoosUrl_UserDefine() {
  try {
    var url, poststr, info; 
    info = '&vid=' + _smt_VisitorId + '&cid=' + LR_cid + '&smt_id=' + LR_websiteid;
    url = 'http://st.pcpp.cn/smtpro/smtpro.php';
    poststr = 'm=Index&a=SaveData2' + info;
    if (typeof(_AjaxCall) == 'function') {
         _AjaxCall(url, poststr);
    }
     return false;
  } catch (ex) {
    return false;
  }
}

