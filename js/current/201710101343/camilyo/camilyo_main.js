function onWindowResize(){fixLayoutOnWindowResize()}function GetUrlParameters(n){n=n.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var i="[\\?&]"+n+"=([^&#]*)",r=new RegExp(i),t=r.exec(window.location.href);return t==null?"":t[1]}function jumpTo(n){n.indexOf("#")!=0&&(n="#"+n);var t=$(n);isElementInViewport(t)||t.scrollView(800)}function isElementInViewport(n){n instanceof jQuery&&(n=n[0]);var t=n.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)}function initTransitions(){$("#msgwebcontainer").find("[page][page!="+transitions.currPageOrd+"][page!="+transitions.pages[transitions.currPageOrd].masterOrd+"]").waitForImages(function(){$(this).hide().css("z-index","")});$("body").append('<div class="transition_modal"><img src="/static-images/mobeepreview/msgloading.gif"><\/div>');$(".transition_modal").hide();var n={pageOrd:transitions.currPageOrd,href:transitions.pages[transitions.currPageOrd].title};history.replaceState&&history.replaceState(n,transitions.pages[transitions.currPageOrd].friendlyTitle,window.location.href);window.addEventListener("popstate",function(n){n.state&&doTransition(n.state.pageOrd,null,n.state.href)})}function doTransition(n,t,i){var o,f,h,s,c,l;if(isTransitioning)return!1;isTransitioning=!0;var u=transitions.pages[transitions.currPageOrd],r=transitions.pages[n],e=window.location.href;return(checkForBlogInnerUrl(u,e),o=setIsInsideBlogTransition(t,e),!checkIfSamePage(n,t))?!1:($("body").find('[class*="wp_outer"]').removeClass("background-image-change"),isInnerBlogPage&&(t==null?r=updateNewConf(u,r,e,t):u=updateNewConf(u,r,e,t)),isBlogTransition&&(r=getNewConfForBlogPage(r,t)),$("#MiddleExternal").length>0&&u.masterOrd!=r.masterOrd)?(isTransitioning=!1,$(t).attr("href")||window.open(r.title,"_self"),!0):(handleFirstPage(u),f=masterPageChangeHandaling(u,r),h=$("#page"+u.pageOrd),handleBrowserUrlAndPageName(r,t,o),$.pageslide&&$.pageslide.close(),t||(t=$('a[onclick*="doTransition('+r.pageOrd+',"]')[0]),handleMenuSelected(u,r,f,t),s=getUrlForAjax(t,o,r,i),$("#page"+r.pageOrd).length>0)?(makeTransition(h,$("#page"+r.pageOrd),f,r.masterOrd,u.masterOrd,function(){var n=$(t).attr("href");typeof msgExpand=="function"&&msgExpand();initStickyPanels();scrollToElem(n);isTransitioning=!1}),transitions.currPageOrd=isBlogTransition?blogNewOrd:n,$.get(removeBad(s)+"?dontRender=true"),!1):(window.premptivePages&&window.premptivePages[r.pageOrd]?doExtualTransition(premptivePages[r.pageOrd],u,r,t,f):(c=f?{isFullTransition:!0}:{isTransition:!0},$(".transition_modal").show(),l={type:"GET",url:s,data:c,contentType:"application/json; charset=utf-8",dataType:"json",async:!0,success:function(n){doExtualTransition(n,u,r,t,f)},error:function(){isTransitioning=!1}},jQuery.ajax(l)),transitions.currPageOrd=isBlogTransition?blogNewOrd:n,!1)}function addOrUpdateStyleTagForTransitions(n,t,i,r,u,f){for(var e,c,l,o,h=!1,s=0;s<n.Css.length;s++){if(e=$(n.Css[s]),$("head").find('[id^="camilyo_palettes"]').length>0){if(e.attr("id").indexOf("camilyo_mp")==0)if(u){c=$("head").find('[id^="camilyo_mp"]');$("head").append(e);setTimeout(function(){c.remove()},4500);continue}else continue;if(e.attr("id")=="camilyo_palettes")continue;if(e.attr("id").indexOf("camilyo_page")==0){l=e.attr("href");h=!0;$.get(l,function(){e.prependTo($("head"));setTimeout(function(){addScriptsAndMakeTransition(n,t,i,r,u,f);$(".transition_modal").hide()},20)});continue}}o=e.html();o=o.replace("<![CDATA[","").replace("]\]>","");o=o.replace("mg://",sShowImageUrl);u&&(o=o.replace(/.msgwebcontainer/g,"#masterpage_"+r.masterOrd));o=o.replace("ig://",sShowIconUrl);e.html(o);e.prependTo($("head"))}h||(addScriptsAndMakeTransition(n,t,i,r,u,f),$(".transition_modal").hide())}function makeTransition(n,t,i,r,u,f){switch(transitions.type){case"Fade":i||r!=u?doTransitionFull(n,t,r,u,"fade",f):doFadeTransition(n,t,r,f);break;case"Push":i||r!=u?doTransitionFull(n,t,r,u,"push",f):doPushTransition(n,t,r,f)}}function scrollToElem(n){var r,i,t,u;n&&(r=n.indexOf("#")+1,r>0?(i=n.substring(r,n.length),t=$('[name = "'+i+'"]'),t.length==0&&(t=$("#"+i)),t.length>0&&(u="#"+i,doSmoothScroll(t,camilyo.inPageTime,u))):setTimeout(function(){window.scrollTo(0,0)},1))}function setIsInsideBlogTransition(n,t){isBlogTransition=$(n)&&$(n).attr("name")&&$(n).attr("href")&&($(n).attr("name").indexOf("article_")>-1||$(n).attr("name").indexOf("blog")>-1)&&($(n).attr("href").indexOf("/articles/")>-1||$(n).attr("href").indexOf("?articleId="))>-1;var i="";return isBlogTransition&&(i=$(n).attr("href").indexOf("articleId=")>-1?t+$(n).attr("href"):"//"+window.location.host+"/"+$(n).attr("href")),i}function updateNewConf(n,t,i,r){var f="",u;return i.indexOf("?month")>-1&&(f="month"),i.indexOf("?tagname")>-1&&(f="tagname"),(i.indexOf("?articlesId")>-1||i.indexOf("/articles/")>-1)&&(f="article"),u=(r?t.pageOrd:n.pageOrd)+"_"+f,transitions.pages[u]||(transitions.pages[u]={pageOrd:u,masterOrd:r?t.masterOrd:n.masterOrd,friendlyTitle:r?t.friendlyTitle:n.friendlyTitle,title:r?t.title:n.title}),transitions.pages[u]}function removeBad(n){var t=n.indexOf("#");return t>0?n.substring(0,t-1):n}function doExtualTransition(n,t,i,r,u){var f,h,e,o,s,c;u?(h=$(n.Html).filter("#msgwebcontainer").html(),f="#msp"+t.masterOrd+"_Content",$(f).append('<div id = "page'+i.pageOrd+'" class="full" style="display:none">'+h+"<\/div>")):(f="#msp"+i.masterOrd+"_Content",e=$(n.Html).find(f).length>0?$(n.Html).find(f):$(n.Html).filter(f),e.length==0&&(e=$(n.Html).find("#Content").length>0?$(n.Html).find("#Content"):$(n.Html).filter("#Content"),f="#Content"),o=e.find(f+"Top"),o.length>0&&$(f+"Top").html(o.html()),s=e.find(f+"Bottom"),s.length>0&&$(f+"Bottom").html(s.html()),e.find(f+"Top").remove(),e.find(f+"Bottom").remove(),c=e.html(),$(f).append('<div id = "page'+i.pageOrd+'" style="display:none">'+c+"<\/div>"));addOrUpdateStyleTagForTransitions(n,f,t,i,u,r)}function rebindMenuEvents(n){$(n).find(".mlhmenu").mouseenter(function(){$(this).parents(".wp_first_col").not('[class*="MainColumns"]').css("overflow","visible")}).mouseleave(function(){$(this).parents(".wp_first_col").not('[class*="MainColumns"]').css("overflow","hidden")})}function addScriptsAndMakeTransition(n,t,i,r,u,f){if(resultOfPageJs=n.JsCode,addScriptTags(n.JsCode,!1),window.WOW)var e=(new WOW).init();$(t).waitForImages(function(){makeTransition($("#page"+i.pageOrd),$("#page"+r.pageOrd),u,r.masterOrd,i.masterOrd,function(){var t,u,e;addScriptTags(n.JsCode,!0)&&addRestOfScripts(n.JsCode);window.FB&&FB.XFBML.parse();t=window["transitions_current_page_seo_title_"+r.pageOrd.split("_")[0]];u=window.transitions.pages[r.pageOrd.split("_")[0]].seoTitle;u.indexOf("[[blog:")==0&&t&&(window.transitions.pages[r.pageOrd].friendlyTitleCurrent=t,$(document).prop("title",t));t&&(t=t.replace(/&amp;/g,"&"));$(document).prop("title",t);typeof backgroundGalleryTransitions=="function"&&backgroundGalleryTransitions(!0);holderMode||$("#page"+i.pageOrd).remove();e=$(f).attr("href");setTimeout(function(){scrollToElem(e)},50);typeof InitShop=="function"&&InitShop();typeof msgExpand=="function"&&msgExpand();initStickyPanels();isTransitioning=!1})})}function doPushTransition(n,t,i,r){var u="#msp"+i+"_Content";$(u).length==0&&(u="#Content");$("body").css("overflow-x","hidden");var f=getNextPageContentHeight(t),e=n.height(),h=f>e?f:e;$(u).css("height",h);t.stop(!0,!0);n.stop(!0,!0);var o=$(u).width(),s=$(window).width(),c=n.offset().left;n.css({position:"absolute",left:0,width:o});t.css({position:"absolute",left:s,width:o}).show();n.animate({left:0-s},1e3,function(){n.hide();n.css({position:"",left:"",top:"",width:""});holderMode||n.remove()});t.animate({left:0},1e3,function(){t.css({position:"",left:"",top:"",width:""});$(u).css({height:"","overflow-x":""});r&&r()})}function doFadeTransition(n,t,i,r){var f="#msp"+i,e=getNextPageContentHeight(t)-n.height(),u=$(f+"_FooterExternal");u.length==0&&(u=$("#FooterExternal"));u.length>0&&u.css("position")!="fixed"&&(u.css("position","relative"),u.animate({top:e},750,function(){u.css("top","");u.css("position","")}));t.stop(!0,!0);n.stop(!0,!0).fadeOut(750,function(){t.fadeIn(750,r)})}function doTransitionFull(n,t,i,r,u,f){var h="#msp"+r+"_Content",s="#msp"+i+"_Content",e,o;$("body").css("overflow-x","hidden");$("#masterpage_"+i).length>0?(e=$("#masterpage_"+r),o=$("#masterpage_"+i),o.show(),t.show(),typeof msgExpand=="function"&&msgExpand(),o.hide(),u=="fade"?e.stop(!0,!0).fadeOut(750,function(){n.hide();e.find(t).length>0&&($(s).append(t),e.find("#page"+t.attr("id")).remove());o.fadeIn(750,f)}):doPushAnimation(o,e,n,t,f)):(t.show(),typeof msgExpand=="function"&&msgExpand(),t.hide(),u=="fade"?$("#msgwebcontainer").stop(!0,!0).fadeOut(750,function(){n.hide();newMasterBoxPrepare(n,t,i,r,h,s,"fade");$("#msgwebcontainer").fadeIn(750,f)}):(newMasterBoxPrepare(n,t,i,r,h,s,"push"),e=$("#masterpage_"+r),o=$("#masterpage_"+i),doPushAnimation(o,e,n,t,f)))}function doPushAnimation(n,t,i,r,u){var f=$(window).width();n.parent().css("height","100%");n.css({position:"absolute",top:0,left:f,width:f}).show();t.css({position:"absolute",top:0,left:0,width:f});r.show();t.animate({left:0-f},1e3,function(){i.hide();t.hide();t.css({position:"",left:"",top:"",width:""})});n.animate({left:0},1e3,function(){n.css({position:"",left:"",top:"",width:""});n.parent().css("height","");u&&u()})}function newMasterBoxPrepare(n,t,i,r,u,f,e){var o,h=!1,s;$("#masterpage_"+r).length>0?o=$("#masterpage_"+r):(o=$("#msgwebcontainer").children().wrapAll("<div id='masterpage_"+r+"'><\/div>").parent(),$("#msgwebcontainer").children().remove(),h=!0);s=t.children().wrapAll("<div id='masterpage_"+i+"'><\/div>").parent();$("#msgwebcontainer").append(s);$("#msgwebcontainer").append(o);h&&rebindMenuEvents("#masterpage_"+r);e=="fade"?(o.hide(),$(u).children().filter('[class*="page"]').hide()):s.hide();$(f).wrapInner("<div id='"+t.attr("id")+"'><\/div>");o.find(u+" #"+t.attr("id")).remove();rebindMenuEvents("#masterpage_"+i)}function getNextPageContentHeight(n){n.css({"z-index":-1e4}).show();var t=n.height();return typeof msgExpand=="function"&&msgExpand(),n.hide().css({"z-index":0}),t}function addCode(){addRestOfScripts(resultOfPageJs)}function addRestOfScripts(n){var i="",u,f,r,t;if(n.Classes)for(u in n.Classes)f=$("head #"+u),f.length==0&&(i+=n.Classes[u]);for(n.Vars&&(n.Vars=n.Vars.replace("this.wow = new WOW().init()",""),n.Vars=n.Vars.replace(/\\/g,""),i+=n.Vars),n.InitCode&&(i+=n.InitCode),n.External.msgjsext_swapHandler&&typeof swapOnLoad=="function"&&swapOnLoad(),n.External.msgjsext_tabsHandler&&typeof tabshandlerOnLoad=="function"&&tabshandlerOnLoad(),r=$(".msgwebcontainer textarea"),t=0;t<r.length;t++)$(r[t]).attr("defaultvalue")||$(r[t]).val("");eval.call(window,i)}function addScriptTags(n,t){var u,i,f,r;if(n.External){u=!1;for(i in n.External)if(f=$("head #"+i),f.length==0){if(r=document.createElement("script"),r.type="text/javascript",$("head").find("#"+i).length>0)continue;if(i=="msgjsext_lightbox"&&$("#lightbox").length>0)continue;if((i=="msgjsext_googleMapJS"||i=="msgjsext_atlasctMapJS")&&!t)continue;if(i=="msgjsext_lightboxscript"&&$("#lightbox").length>0)continue;if(i=="msgjsext_googleMapJS"||i=="msgjsext_atlasctMapJS"){if(i=="msgjsext_atlasctMapJS")r.src=n.External[i];else{if($("#msgjsext_googleMapJS").length>0)continue;r.src=n.External[i]+"&callback=addCode"}u=!0}else r.src=n.External[i];if(t&&i!="msgjsext_googleMapJS"&&i!="msgjsext_atlasctMapJS")continue;i=="msgjsext_interact"&&$("head").append('<link href="'+r.src.replace("interact.js","interact.css")+'" type="text/css" rel="stylesheet">');$("head").append(r)}if(u)return!1}return!0}function checkForBlogInnerUrl(n,t){isInnerBlogPage=$("#page"+n.pageOrd).length==0?t.indexOf("?month=")>-1||t.indexOf("?articleId=")>-1||t.indexOf("?tagname=")>-1||t.indexOf("/articles/")>-1?!0:!1:!1}function checkIfSamePage(n,t){if(n!=transitions.currPageOrd||isBlogTransition||isInnerBlogPage)return isTransitioning=!0,!0;var i=$(t).attr("href");return $.pageslide&&$.pageslide.close(),scrollToElem(i),isTransitioning=!1,!1}function getNewConfForBlogPage(n,t){return blogNewOrd=n.pageOrd+"_"+$(t).attr("name").replace("article_",""),transitions.pages[blogNewOrd]||(transitions.pages[blogNewOrd]={pageOrd:blogNewOrd,masterOrd:n.masterOrd,friendlyTitle:n.friendlyTitle,title:n.title}),transitions.pages[blogNewOrd]}function handleFirstPage(n){var t="#msp"+n.masterOrd+"_Content";$("#page"+n.pageOrd).length==0&&($(t).length==0&&(t="#Content"),$(t).wrapInner('<div id = "page'+n.pageOrd+'">'));($(t).find(t+"Top").length>0||$(t).find(t+"Bottom").length>0)&&$(t).prepend($(t+"Top")).prepend($(t+"Bottom"))}function masterPageChangeHandaling(n,t){var r=!1,u,i;return n.masterOrd==t.masterOrd||isBlogTransition||(ms_cssFiles["mp_"+n.masterOrd]=$('[id="camilyo_mp_'+n.masterOrd+'"]').attr("href"),$("#masterpage_"+t.masterOrd).length==0?r=!0:$("head").find('[id^="camilyo_palettes"]').length>0&&(u=$('[id="camilyo_mp_'+n.masterOrd+'"]'),i=document.createElement("link"),i.href=ms_cssFiles["mp_"+t.masterOrd],i.id="camilyo_mp_"+t.masterOrd,i.rel="stylesheet",i.type="text/css",$("head").append(i),setTimeout(function(){u.remove()},4500))),r}function handleMenuSelected(n,t,i,r){var o="",f=$('a[onclick*="doTransition('+t.pageOrd+',"][class*="menucomp"]'),h,e,u,s;if(n.masterOrd==t.masterOrd||i){for($(r).attr("class")&&$(r).attr("class").indexOf("item")>-1?(o=$(r).attr("class").replace("item","selected"),$(r).addClass(o)):f.length>0&&(o=f.attr("class").replace("item","selected")),e=$('a[onclick*="doTransition('+n.pageOrd+',"][class*="menucomp"]'),u=0;u<e.length;u++)$(e[u]).attr("class").indexOf("subitem")>-1?(s=$(e[u]).attr("class").split(" ")[0].replace("subitem","selected"),$(e[u]).removeClass($(e[u]).attr("class").split(" ")[0].replace("subitem","subselected"))):s=$(e[u]).attr("class").split(" ")[0].replace("item","selected"),$(e[u]).removeClass(s);for(u=0;u<f.length;u++)s=$(f[u]).attr("class").indexOf("subitem")>-1?$(f[u]).attr("class").split(" ")[0].replace("subitem","selected"):$(f[u]).attr("class").split(" ")[0].replace("item","selected"),$(f[u]).addClass(s);$(r).parents(".accord").length!=0&&($(r).parents("nav").children("ul").find('ul[class*="submenu"]').hide(),$(r).parent().children("ul").show(),$(r).attr("class").indexOf("_subitem")>-1&&$(r).parents("ul").show())}else h=$("#masterpage_"+t.masterOrd).find('a[onclick*="doTransition('+t.pageOrd+',"][class*="menucomp"]'),h.length>0&&(o=h.attr("class").replace("item","selected")),$('a[onclick*="doTransition"][class*="menucomp"]').removeClass(o),$(f.addClass(o));f.addClass(o)}function handleBrowserUrlAndPageName(n,t,i){var f={pageOrd:n.pageOrd,href:n.title},u,r;t&&(u=$(t).attr("href")?$(t).attr("href"):"/"+n.title,u.indexOf("javascript")>-1&&(u=n.title),history.pushState(f,n.friendlyTitle,u.indexOf("http")>-1?u:isBlogTransition?i:"//"+window.location.host+u));r=n.friendlyTitle;window.transitions.pages[n.pageOrd.split("_")[0]]&&(r=window.transitions.pages[n.pageOrd.split("_")[0]].seoTitle,r.indexOf("[[blog:")==0&&(r=window.transitions.pages[n.pageOrd].friendlyTitleCurrent));r&&(r=r.replace(/&amp;/g,"&"));$(document).prop("title",r);window._gaq&&_gaq.push(["_trackPageview"])}function getUrlForAjax(n,t,i,r){var u;return n?u=isBlogTransition?t:$(n).attr("href")&&$(n).attr("href").indexOf("javascript")==-1?$(n).attr("href").indexOf("http")>-1?$(n).attr("href"):"//"+window.location.host+$(n).attr("href"):"//"+window.location.host+"/"+i.title:(r.indexOf("/")!=0&&(r="/"+r),u="//"+window.location.host+r),u}function initResponsive(){var t,n,i,r;if(respBPs.length!=0){if(setTimeout(function(){$("div[id^=columns]").css("min-height","")},1e3),t=$(window).width(),t>respBPs[0]){respState=0;nextLowBP=respBPs[0];return}if(t<respBPs[respBPs.length-1]){respState=respBPs.length;nextHighBP=respBPs[respBPs.length-1];return}for(n=0;n<respBPs.length-1;n++)i=respBPs[n],r=respBPs[n+1],t<i&&t>=r&&(respState=n+1,nextHighBP=i,nextLowBP=r)}}function responsiveBP(n){$("[respstate="+respState+"]").hide();$("[respstate="+n+"]").show();respState=n;nextHighBP=respState==0?null:respBPs[respState-1];nextLowBP=respState==respBPs.length?null:respBPs[respState]}function ma_log(n){window.console.debug?window.console.debug(n):window.console.log&&window.console.log(n)}function initLayout(){var n=$("body"),t=$("#msgwebcontainer"),i=n.attr("direction");i=="rtl"&&(t.css("direction","rtl"),n.css("direction","ltr"));switch(camilyo.bgStyle){case"Vertiacl":case"Centered":$("body.msgbody").css({"box-sizing":"border-box","-webkit-box-sizing":"border-box","-moz-box-sizing":"border-box","-ms-box-sizing":"border-box","-o-box-sizing":"border-box"});$("#msgwebcontainer").css("height","100%");$("body").css("height","100%");break;case"Wide":$("html").css("height","100%");$("body.msgbody").css("height","100%");camilyo.stickyPanels.indexOf("Footer")!=-1&&$("html").css("height","")}fixLayoutOnWindowResize()}function fixFooterHeight(){var n=$("#FooterExternal");n.length==0&&(n=$(".FooterExternal_wp_outer").filter(":visible"));n.css("height","");var t=n.outerHeight(),i=n.position().top+t,r=$("body.msgbody").outerHeight();i<r&&(t=t+r-i,n.css("height",t))}function fixLayoutOnWindowResize(){switch(camilyo.bgStyle){case"Vertical":case"Centered":var n=$("body.msgbody");$("html").get(0).scrollHeight>$("html").get(0).clientHeight?n.css("height",""):n.css("height","100%");break;case"Wide":$("html").css("height","100%");camilyo.stickyPanels.indexOf("Footer")!=-1&&$("html").css("height","")}}function initStickyPanels(n){var l=1e5,f=$('[id="'+(camilyo.bgStyle=="Centered"?"Center":"Content")+'"]'),u,c,h,t,i,r,e,o,s;for(f.length==0&&camilyo.bgStyle!="Centered"&&(f=$('[id$="MainContent"]').filter(":visible")),u=$('[id$="Content"]').filter(":visible"),u.length==0&&(u=$('[id$="MainContent"]').filter(":visible")),c=camilyo.bgStyle!="Wide"?"Middle":"MiddleExternal",h=$('[id$="'+c+'"]').filter(":visible"),panels={},r=[],$.each(camilyo.stickyPanels,function(e,o){if(i=$('[id$="'+o+'"]').filter(":visible"),i.length==0&&(i=$("#Master"+o)),n&&camilyo.bgStyle=="Wide"&&o!="Right"&&o!="Left"&&(i.css("height",""),i.css("position",""),i.css("width",""),o=="HeaderExternal"&&window.outerWidth>$(window).width()&&$(window).height()+$(".HeaderExternal_wp_outer").outerHeight()-$("#msgwebcontainer").outerHeight()>=0&&$("body").css("overflow","hidden"),o=="FooterExternal"&&window.outerWidth>$(window).width()&&$(window).height()+$(".FooterExternal_wp_outer").outerHeight()+$(".HeaderExternal_wp_outer").outerHeight()-$("#msgwebcontainer").outerHeight()>=0&&$("body").css("overflow","hidden")),i.length!=0){t={width:i.outerWidth(),height:camilyo.bgStyle!="Vertical"||o!="Left"&&o!="Right"?i.outerHeight():"",position:"fixed","z-index":l};$("body").css("overflow","");switch(o){case"Header":case"HeaderExternal":t.top=0;(camilyo.platform=="MOBILE"||camilyo.platform=="TABLET")&&(t.left=0);r.push({$el:h,style:"margin-top",value:t.height});break;case"Footer":case"FooterExternal":t.bottom=0;(camilyo.platform=="MOBILE"||camilyo.platform=="TABLET")&&(t.left=0);r.push({$el:h,style:"margin-bottom",value:t.height});break;case"Left":camilyo.bgStyle!="Vertical"?(t.left=i.offset().left,t.width=i.outerWidth(),r.push({$el:f,style:"margin-left",value:t.width})):(t.left=0,t.top=0,t["overflow-y"]="auto");break;case"Right":if(camilyo.bgStyle!="Vertical"){t.left=i.offset().left;t.width=i.outerWidth();r.push({$el:f,style:"margin-right",value:t.width});break}else t.right=0,t.top=0,t["overflow-y"]="auto";break;case"ContentTop":t.top=$('[id$="HeaderExternal"]').filter(":visible").length==1?$('[id$="HeaderExternal"]').filter(":visible").outerHeight():0;r.push({$el:u,style:"padding-top",value:t.height});break;case"ContentBottom":t.bottom=$('[id$="FooterExternal"]').filter(":visible").length==1?$('[id$="FooterExternal"]').filter(":visible").outerHeight():0;r.push({$el:u,style:"padding-bottom",value:t.height})}panels[o]=t}}),fixContentBottom(),e=0;e<r.length;e++)o=r[e],o.$el.css(o.style,o.value);for(s in panels)t=panels[s],i=$('[id$="'+s+'"]').filter(":visible"),i.length==0&&(i=$("#Master"+s)),i.css(t);bPrintStickyPanelsLog&&printStickyPanels()}function fixContentBottom(){var t=$('[id$="Content"]').filter(":visible"),n;t.length==0&&(t=$('[id$="MainContent"]').filter(":visible"));n=$('[id$="ContentBottom"]').filter(":visible");n.length==0&&(n=$('[id$="MasterContentBottom"]').filter(":visible"));n.length==1&&n.css("position")!="relative"&&camilyo.stickyPanels.indexOf("ContentBottom")==-1&&setTimeout(function(){t.css({"padding-bottom":n.outerHeight()})},0)}function clearStickPanels(){var n,t,i;for(n in panels){t=$('[id$="'+n+'"]').filter(":visible");t.length==0&&(t=$("#Master"+n));for(i in panels[n])t.css(i,"")}}function printStickyPanels(){var n=$("[name=log]"),t,u,i,f,r;n.length==0&&(n=$('<div name="log" style="position:fixed;bottom:0;width:100%;height:50%;overflow:auto;direction:ltr;background-color:white;color:black;text-align:left;"><\/div>'),n.appendTo("body"));t="";u="";for(i in panels){t+=i+": ";for(f in panels[i])t+=f+":"+panels[i][f]+";";t+="<br><\/br>";r=$("#Master"+i);u+="width:"+r.outerWidth()+";height:"+r.outerHeight()+";top:"+r.offset().top+";left:"+r.position().left;u+="<br><\/br>"}n.append("Calculated Pos:<br><\/br>");n.append(t);n.append("<br><\/br>Dom Pos:<br><\/br>");n.append(u)}var $mainContent,transitions,respBPs,respState,nextLowBP,nextHighBP,panels,supportsOrientationChange,orientationEvent,bPrintStickyPanelsLog;(function(n){n.waitForImages={hasImageProperties:["backgroundImage","listStyleImage","borderImage","borderCornerImage"]};n.expr[":"].uncached=function(t){return n(t).is('img[src!=""]')&&!t.complete};n.fn.waitForImages=function(t,i,r){if(t=t||n.noop,i=i||null,r=!!r,!n.isFunction(t))throw new TypeError("An invalid callback was supplied.");return this.each(function(){var f=n(this),u=[],s,h,e,o;r?(s=n.waitForImages.hasImageProperties||[],h=/url\((['"]?)(.*?)\1\)/g,f.find("*").each(function(){var t=n(this);t.is("img:uncached")&&u.push({src:t.attr("src"),element:t[0]});n.each(s,function(n,i){var r=t.css(i),f;if(!r)return!0;while(f=h.exec(r))u.push({src:f[2],element:t[0]})})})):f.find("img:uncached").each(function(){u.push({src:this.src,element:this})});e=u.length;o=0;e==0&&t.call(f[0]);n.each(u,function(r,u){var s=new Image;n(s).bind("load error",function(n){return o++,i&&i.call(u.element,o,e,n.type=="load"),o==e?(t.call(f[0]),!1):void 0});s.src=u.src})})}})(jQuery);$(document).ready(function(){$mainContent=$("#Content");$mainContent.length==0&&($mainContent=$(".Content_wp_outer").filter(":visible"));$(".mlhmenu").mouseenter(function(){$(this).parents(".wp_first_col").not('[class*="MainColumns"]').css("overflow","visible")}).mouseleave(function(){$(this).parents(".wp_first_col").not('[class*="MainColumns"]').css("overflow","hidden")});$(window).resize(onWindowResize);typeof initLayout=="function"&&initLayout();$("#msgwebcontainer").waitForImages(function(){window.initStickyPanels&&initStickyPanels()});transitions&&initTransitions();var n=document.getElementsByTagName("head")[0],t=n.insertBefore;n.insertBefore=function(i,r){if(i.href&&i.href.indexOf("//fonts.googleapis.com/css?family=Roboto")>-1){console.info("Prevented GM from loading Roboto !");return}t.call(n,i,r)}});$.fn.scrollView=function(n){return this.each(function(){$("html, body").animate({scrollTop:$(this).offset().top},n)})};var sShowIconUrl="/web/handlers/ImageGalleryHandler.ashx?action=showicon&img=",sShowImageUrl="/web/handlers/ImageGalleryHandler.ashx?action=showimage&img=",resultOfPageJs,holderMode=!0,isTransitioning=!1,blogNewOrd,isBlogTransition,isInnerBlogPage,ms_cssFiles={};respBPs=null;$(document).ready(function(){respBPs&&($(window).resize(function(){var n=$(this).width();nextHighBP&&n>nextHighBP&&responsiveBP(respState-1);nextLowBP&&n<nextLowBP&&responsiveBP(respState+1)}),initResponsive(),ma_log("width: "+$(window).width()+", next low: "+nextLowBP+", next high: "+nextHighBP+", state: "+respState))});respState=0;Array.prototype.indexOf||(Array.prototype.indexOf=function(n,t){var r,f,u,i;if(this==null)throw new TypeError('"this" is null or not defined');if((f=Object(this),u=f.length>>>0,u===0)||(i=+t||0,Math.abs(i)===Infinity&&(i=0),i>=u))return-1;for(r=Math.max(i>=0?i:u-Math.abs(i),0);r<u;){if(r in f&&f[r]===n)return r;r++}return-1});supportsOrientationChange="onorientationchange"in window;orientationEvent=supportsOrientationChange?"orientationchange":"resize";window.addEventListener&&window.addEventListener(orientationEvent,function(){setTimeout(function(){clearStickPanels();initStickyPanels();typeof msgExpand=="function"&&msgExpand()},300)},!1);bPrintStickyPanelsLog=!1