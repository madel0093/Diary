//>>built
("undefined"===typeof define?function(e,a){a()}:define)(["dojo/_base/config","dojo/_base/lang","dojo/_base/window","require"],function(e,a,g,o){var d=a&&a.getObject("dojox.mobile",!0)||{},a=new function(){g||(g=window,g.doc=document,g._no_dojo_dm=d);e=e||g.mblConfig||{};for(var a=g.doc.getElementsByTagName("script"),l=0;l<a.length;l++){var m=a[l],k=m.getAttribute("src")||"";if(k.match(/\/deviceTheme\.js/i)){e.baseUrl=k.replace("deviceTheme.js","../../dojo/");if(a=m.getAttribute("data-dojo-config")||
m.getAttribute("djConfig")){var a=eval("({ "+a+" })"),n;for(n in a)e[n]=a[n]}break}else if(k.match(/\/dojo\.js/i)){e.baseUrl=k.replace("dojo.js","");break}}this.loadCssFile=function(a){var b=g.doc.createElement("link");b.href=a;b.type="text/css";b.rel="stylesheet";a=g.doc.getElementsByTagName("head")[0];a.insertBefore(b,a.firstChild);d.loadedCssFiles.push(b)};this.toUrl=function(a){return o?o.toUrl(a):e.baseUrl+"../"+a};this.setDm=function(a){d=a};this.themeMap=e.themeMap||[["Holodark","holodark",
[]],["Android 3","holodark",[]],["Android 4","holodark",[]],["Android","android",[]],["BlackBerry","blackberry",[]],["BB10","blackberry",[]],["ios7","ios7",[]],["iPhone;.*OS 7_","ios7",[]],["iPhone;.*OS 8_","ios7",[]],["iPad;.*OS 7_","ios7",[]],["iPad;.*OS 8_","ios7",[]],["iPhone","iphone",[]],["iPad","iphone",[this.toUrl("dojox/mobile/themes/iphone/ipad.css")]],["WindowsPhone","windows",[]],["Windows Phone","windows",[]],["Trident","iphone",[]],["Custom","custom",[]],[".*","iphone",[]]];d.loadedCssFiles=
[];this.loadDeviceTheme=function(a){var b=e.mblThemeFiles||d.themeFiles||["@theme"],f,c;c=this.themeMap;var h=a||e.mblUserAgent||(location.search.match(/theme=(\w+)/)?RegExp.$1:navigator.userAgent);for(f=0;f<c.length;f++)if(h.match(RegExp(c[f][0]))){var i=c[f][1];if(!(i=="windows"&&e.mblDisableWindowsTheme)){h=g.doc.documentElement.className;h=h.replace(RegExp(" *"+d.currentTheme+"_theme"),"")+" "+i+"_theme";g.doc.documentElement.className=h;d.currentTheme=i;f=[].concat(c[f][2]);for(c=0;c<b.length;c++){var j=
b[c]instanceof Array||typeof b[c]=="array";if(!j&&b[c].indexOf("/")!==-1)h=b[c];else{h=j?(b[c][0]||"").replace(/\./g,"/"):"dojox/mobile";j=(j?b[c][1]:b[c]).replace(/\./g,"/");h=h+"/"+("themes/"+i+"/"+(j==="@theme"?i:j)+".css")}f.unshift(this.toUrl(h))}for(b=0;b<d.loadedCssFiles.length;b++){i=d.loadedCssFiles[b];i.parentNode.removeChild(i)}d.loadedCssFiles=[];for(c=0;c<f.length;c++){b=f[c].toString();e["dojo-bidi"]==true&&b.indexOf("_rtl")==-1&&"android.css blackberry.css custom.css iphone.css holodark.css base.css Carousel.css ComboBox.css IconContainer.css IconMenu.css ListItem.css RoundRectCategory.css SpinWheel.css Switch.css TabBar.css ToggleButton.css ToolBarButton.css ProgressIndicator.css Accordion.css GridLayout.css FormLayout.css".indexOf(b.substr(b.lastIndexOf("/")+
1))!=-1&&this.loadCssFile(b.replace(".css","_rtl.css"));this.loadCssFile(f[c].toString())}a&&d.loadCompatCssFiles&&d.loadCompatCssFiles();break}}}};a.loadDeviceTheme();return window.deviceTheme=d.deviceTheme=a});
//# sourceMappingURL=deviceTheme.js.map