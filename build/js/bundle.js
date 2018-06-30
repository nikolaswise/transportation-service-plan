!function(){"use strict";function t(t,e){var r;for(r=e;r&&(1!==r.nodeType||!n(r,t));r=r.parentNode);return r}function e(t){return Array.isArray(t)?t:Array.prototype.slice.call(t)}function r(t,r){return e((r||document).querySelectorAll(t))}function n(t,e){return new RegExp("(\\s|^)"+e+"(\\s|$)").test(t.getAttribute("class"))}function o(t,e){e.split(" ").forEach(function(e){n(t,e)||t.setAttribute("class",t.getAttribute("class")+" "+e)})}function i(t,e){e.split(" ").forEach(function(e){var r=t.getAttribute("class").replace(new RegExp("(\\s|^)"+e+"(\\s|$)","g"),"$2");n(t,e)&&t.setAttribute("class",r)})}function a(t,e){n(t,e)?i(t,e):o(t,e)}function s(t){(t=e(t)).forEach(function(t){i(t,"is-active")})}function c(){}function u(){i(document.querySelector("html"),"js-is-inactive")}function l(){var t=document.location.pathname+"/";"/map/"===(t=t.replace("//","/"))?P.emit("set:view","map"):"/text/"===t?P.emit("set:view","text"):P.emit("set:view","split"),P.emit("routing:done")}function p(){return"click"}function d(t,e,r){return t.addEventListener?t.addEventListener(e,r,!1):t.attachEvent?t.attachEvent("on"+e,r):void 0}function f(t,e,r){return t.removeEventListener?t.removeEventListener(e,r,!1):t.detachEvent?t.detachEvent("on"+e,r):void 0}function h(t){if(t.preventDefault)return t.preventDefault();t.returnValue&&(t.returnValue=!1)}function m(t){t.forEach(function(t){t&&t.setAttribute("aria-hidden",!0)})}function w(t){t.forEach(function(t){t&&t.removeAttribute("aria-hidden")})}function y(){function e(){return[]}function a(t){if(P.emit("modal:close"),t){var r=document.querySelector('.js-modal[data-modal="'+t+'"]');r.removeAttribute("tabindex"),d(document,"focusin",l),o(r,"is-active"),m(e()),r.focus()}}function c(t){if(!t)return s(b);var r=document.querySelector('.js-modal[data-modal="'+t+'"]');i(r,"is-active"),r.setAttribute("tabindex",0),f(document,"focusin",l),w(e())}function u(t){t?d(t,p(),y):v.forEach(function(t){d(t,p(),y)})}function l(e){t("js-modal",e.target)||b.forEach(function(t){n(t,"is-active")&&t.focus()})}function y(t){h(t);var e=t.target.dataset.modal;P.emit("modal:open",e)}var v=r(".js-modal-toggle"),b=r(".js-modal");P.on("modal:open",a),P.on("keyboard:escape",c),P.on("modal:close",c),P.on("modal:bind",u),P.emit("modal:bind")}function v(){function e(t){P.emit("drawer:close");var e=document.querySelector('.js-drawer[data-drawer="'+t.id+'"]');if(e){var r=n(e,"drawer-right"),i=n(e,"drawer-left");e.setAttribute("tabindex",0),o(e,"is-active"),r?o(v,"drawer-right-is-active"):i&&o(v,"drawer-left-is-active"),m([v]),d(e,p(),u),d(document,"focusin",s)}}function a(t){if(t){var e=document.querySelector('.js-drawer[data-drawer="'+t.id+'"]');e.removeAttribute("tabindex"),i(e,"is-active")}else g.forEach(function(t){t.removeAttribute("tabindex"),i(t,"is-active")});i(v,"drawer-left-is-active"),i(v,"drawer-right-is-active"),b.forEach(function(t){i(t,"is-active")}),w([v]),f(document,"focusin",s),y&&y.focus()}function s(e){t("js-drawer",e.target)||g.forEach(function(t){n(t,"is-active")&&t.focus()})}function c(t){t?d(t.node,p(),l):b.forEach(function(t){d(t,p(),l)})}function u(t){n(t.target,"js-drawer")&&P.emit("drawer:close"),n(t.target,"js-drawer-close")&&P.emit("drawer:close")}function l(t){h(t);var e=t.target.getAttribute("data-drawer");o(t.target,"is-active"),P.emit("drawer:open",{id:e})}var y,v=document.querySelector(".js-panels"),b=r(".js-drawer-toggle"),g=r(".js-drawer");P.on("drawer:open",e),P.on("keyboard:escape",a),P.on("drawer:close",a),P.on("drawer:bind",c),P.emit("drawer:bind")}function b(t){var e=0;do{isNaN(t.offsetTop)||(e+=t.offsetTop)}while(t=t.offsetParent);return e}function g(t){return oe.startTag+t+oe.endTag}function T(t,e){var r=t.split(" ");r=(r=(r=r.filter(function(t){return""!==t})).join("|")).replace(/[-[\]{}()*+?.,\\^$]/g,"\\$&");var n=new RegExp(r,"gi");return e.replace(n,g)}function S(){P.on("search:index",ce),P.on("search:bind",fe),P.on("search:for",he),P.on("search:render",me),P.on("search:cancel",we),P.on("search:for",le),P.on("search:result",ve),P.emit("search:index"),P.emit("search:bind")}c.prototype={on:function(t,e,r){var n=this.e||(this.e={});return(n[t]||(n[t]=[])).push({fn:e,ctx:r}),this},once:function(t,e,r){function n(){o.off(t,n),e.apply(r,arguments)}var o=this;return n._=e,this.on(t,n,r)},emit:function(t){var e=[].slice.call(arguments,1),r=((this.e||(this.e={}))[t]||[]).slice(),n=0,o=r.length;for(n;n<o;n++)r[n].fn.apply(r[n].ctx,e);return this},off:function(t,e){var r=this.e||(this.e={}),n=r[t],o=[];if(n&&e)for(var i=0,a=n.length;i<a;i++)n[i].fn!==e&&n[i].fn._!==e&&o.push(n[i]);return o.length?r[t]=o:delete r[t],this}};var P=new c;P.on("has:javascript",u),"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var E,M=function(t,e){return e={exports:{}},function(t,e){!function(e,r){t.exports=function(){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){var n=r(1).isInBrowser,o=new(r(2))(n?document.body:null);o.setStateFromDOM(null),o.listenToDOM(),n&&(window.scrollMonitor=o),t.exports=o},function(t,e){e.VISIBILITYCHANGE="visibilityChange",e.ENTERVIEWPORT="enterViewport",e.FULLYENTERVIEWPORT="fullyEnterViewport",e.EXITVIEWPORT="exitViewport",e.PARTIALLYEXITVIEWPORT="partiallyExitViewport",e.LOCATIONCHANGE="locationChange",e.STATECHANGE="stateChange",e.eventTypes=[e.VISIBILITYCHANGE,e.ENTERVIEWPORT,e.FULLYENTERVIEWPORT,e.EXITVIEWPORT,e.PARTIALLYEXITVIEWPORT,e.LOCATIONCHANGE,e.STATECHANGE],e.isOnServer="undefined"==typeof window,e.isInBrowser=!e.isOnServer,e.defaultOffsets={top:0,bottom:0}},function(t,e,r){function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t){return c?0:t===document.body?window.innerHeight||document.documentElement.clientHeight:t.clientHeight}function i(t){return c?0:t===document.body?Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.documentElement.clientHeight):t.scrollHeight}function a(t){return c?0:t===document.body?window.pageYOffset||document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop}var s=r(1),c=s.isOnServer,u=s.isInBrowser,l=s.eventTypes,p=r(3),d=function(){function t(e,r){function s(){if(u.viewportTop=a(e),u.viewportBottom=u.viewportTop+u.viewportHeight,u.documentHeight=i(e),u.documentHeight!==p){for(d=u.watchers.length;d--;)u.watchers[d].recalculateLocation();p=u.documentHeight}}function c(){for(f=u.watchers.length;f--;)u.watchers[f].update();for(f=u.watchers.length;f--;)u.watchers[f].triggerCallbacks()}n(this,t);var u=this;this.item=e,this.watchers=[],this.viewportTop=null,this.viewportBottom=null,this.documentHeight=i(e),this.viewportHeight=o(e),this.DOMListener=function(){t.prototype.DOMListener.apply(u,arguments)},this.eventTypes=l,r&&(this.containerWatcher=r.create(e));var p,d,f;this.update=function(){s(),c()},this.recalculateLocations=function(){this.documentHeight=0,this.update()}}return t.prototype.listenToDOM=function(){u&&(window.addEventListener?(this.item===document.body?window.addEventListener("scroll",this.DOMListener):this.item.addEventListener("scroll",this.DOMListener),window.addEventListener("resize",this.DOMListener)):(this.item===document.body?window.attachEvent("onscroll",this.DOMListener):this.item.attachEvent("onscroll",this.DOMListener),window.attachEvent("onresize",this.DOMListener)),this.destroy=function(){window.addEventListener?(this.item===document.body?(window.removeEventListener("scroll",this.DOMListener),this.containerWatcher.destroy()):this.item.removeEventListener("scroll",this.DOMListener),window.removeEventListener("resize",this.DOMListener)):(this.item===document.body?(window.detachEvent("onscroll",this.DOMListener),this.containerWatcher.destroy()):this.item.detachEvent("onscroll",this.DOMListener),window.detachEvent("onresize",this.DOMListener))})},t.prototype.destroy=function(){},t.prototype.DOMListener=function(t){this.setStateFromDOM(t)},t.prototype.setStateFromDOM=function(t){var e=a(this.item),r=o(this.item),n=i(this.item);this.setState(e,r,n,t)},t.prototype.setState=function(t,e,r,n){var o=this,i=e!==this.viewportHeight||r!==this.contentHeight;if(this.latestEvent=n,this.viewportTop=t,this.viewportHeight=e,this.viewportBottom=t+e,this.contentHeight=r,i)for(var a=this.watchers.length;a--;)o.watchers[a].recalculateLocation();this.updateAndTriggerWatchers(n)},t.prototype.updateAndTriggerWatchers=function(t){for(var e=this,r=this.watchers.length;r--;)e.watchers[r].update();for(r=this.watchers.length;r--;)e.watchers[r].triggerCallbacks(t)},t.prototype.createCustomContainer=function(){return new t},t.prototype.createContainer=function(e){"string"==typeof e?e=document.querySelector(e):e&&e.length>0&&(e=e[0]);var r=new t(e,this);return r.setStateFromDOM(),r.listenToDOM(),r},t.prototype.create=function(t,e){"string"==typeof t?t=document.querySelector(t):t&&t.length>0&&(t=t[0]);var r=new p(this,t,e);return this.watchers.push(r),r},t.prototype.beget=function(t,e){return this.create(t,e)},t}();t.exports=d},function(t,e,r){function n(t,e,r){function n(t,e){if(0!==t.length)for(g=t.length;g--;)(L=t[g]).callback.call(o,e,o),L.isOne&&t.splice(g,1)}var o=this;this.watchItem=e,this.container=t,this.offsets=r?r===+r?{top:r,bottom:r}:{top:r.top||f.top,bottom:r.bottom||f.bottom}:f,this.callbacks={};for(var h=0,m=d.length;h<m;h++)o.callbacks[d[h]]=[];this.locked=!1;var w,y,v,b,g,L;this.triggerCallbacks=function(t){switch(this.isInViewport&&!w&&n(this.callbacks[a],t),this.isFullyInViewport&&!y&&n(this.callbacks[s],t),this.isAboveViewport!==v&&this.isBelowViewport!==b&&(n(this.callbacks[i],t),y||this.isFullyInViewport||(n(this.callbacks[s],t),n(this.callbacks[u],t)),w||this.isInViewport||(n(this.callbacks[a],t),n(this.callbacks[c],t))),!this.isFullyInViewport&&y&&n(this.callbacks[u],t),!this.isInViewport&&w&&n(this.callbacks[c],t),this.isInViewport!==w&&n(this.callbacks[i],t),!0){case w!==this.isInViewport:case y!==this.isFullyInViewport:case v!==this.isAboveViewport:case b!==this.isBelowViewport:n(this.callbacks[p],t)}w=this.isInViewport,y=this.isFullyInViewport,v=this.isAboveViewport,b=this.isBelowViewport},this.recalculateLocation=function(){if(!this.locked){var t=this.top,e=this.bottom;if(this.watchItem.nodeName){var r=this.watchItem.style.display;"none"===r&&(this.watchItem.style.display="");for(var o=0,i=this.container;i.containerWatcher;)o+=i.containerWatcher.top-i.containerWatcher.container.viewportTop,i=i.containerWatcher.container;var a=this.watchItem.getBoundingClientRect();this.top=a.top+this.container.viewportTop-o,this.bottom=a.bottom+this.container.viewportTop-o,"none"===r&&(this.watchItem.style.display=r)}else this.watchItem===+this.watchItem?this.watchItem>0?this.top=this.bottom=this.watchItem:this.top=this.bottom=this.container.documentHeight-this.watchItem:(this.top=this.watchItem.top,this.bottom=this.watchItem.bottom);this.top-=this.offsets.top,this.bottom+=this.offsets.bottom,this.height=this.bottom-this.top,void 0===t&&void 0===e||this.top===t&&this.bottom===e||n(this.callbacks[l],null)}},this.recalculateLocation(),this.update(),w=this.isInViewport,y=this.isFullyInViewport,v=this.isAboveViewport,b=this.isBelowViewport}var o=r(1),i=o.VISIBILITYCHANGE,a=o.ENTERVIEWPORT,s=o.FULLYENTERVIEWPORT,c=o.EXITVIEWPORT,u=o.PARTIALLYEXITVIEWPORT,l=o.LOCATIONCHANGE,p=o.STATECHANGE,d=o.eventTypes,f=o.defaultOffsets;n.prototype={on:function(t,e,r){switch(!0){case t===i&&!this.isInViewport&&this.isAboveViewport:case t===a&&this.isInViewport:case t===s&&this.isFullyInViewport:case t===c&&this.isAboveViewport&&!this.isInViewport:case t===u&&this.isInViewport&&this.isAboveViewport:if(e.call(this,this.container.latestEvent,this),r)return}if(!this.callbacks[t])throw new Error("Tried to add a scroll monitor listener of type "+t+". Your options are: "+d.join(", "));this.callbacks[t].push({callback:e,isOne:r||!1})},off:function(t,e){var r=this;if(!this.callbacks[t])throw new Error("Tried to remove a scroll monitor listener of type "+t+". Your options are: "+d.join(", "));for(var n,o=0;n=this.callbacks[t][o];o++)if(n.callback===e){r.callbacks[t].splice(o,1);break}},one:function(t,e){this.on(t,e,!0)},recalculateSize:function(){this.height=this.watchItem.offsetHeight+this.offsets.top+this.offsets.bottom,this.bottom=this.top+this.height},update:function(){this.isAboveViewport=this.top<this.container.viewportTop,this.isBelowViewport=this.bottom>this.container.viewportBottom,this.isInViewport=this.top<this.container.viewportBottom&&this.bottom>this.container.viewportTop,this.isFullyInViewport=this.top>=this.container.viewportTop&&this.bottom<=this.container.viewportBottom||this.isAboveViewport&&this.isBelowViewport},destroy:function(){var t=this.container.watchers.indexOf(this),e=this;this.container.watchers.splice(t,1);for(var r=0,n=d.length;r<n;r++)e.callbacks[d[r]].length=0},lock:function(){this.locked=!0},unlock:function(){this.locked=!1}};for(var h=0,m=d.length;h<m;h++){var w=d[h];n.prototype[w]=function(t){return function(e,r){this.on.call(this,t,e,r)}}(w)}t.exports=n}])}()}()}(e,e.exports),e.exports}(),C=function(){function t(t){P.emit("layers:draw")}r(".js-layer-toggle").forEach(function(e){d(e,"click",t)})},O=function(){function t(t){t.preventDefault(),P.emit("layer:control")}r(".js-layer-control").forEach(function(e){d(e,"click",t)})},_=function(){function t(t){t.preventDefault();var e=t.target.getAttribute("data-panel");P.emit("set:view",e)}r(".js-view-control").forEach(function(e){d(e,"click",t)})},I=function(){function t(t){t.preventDefault(),P.emit("popup:close")}r(".js-close-popup").forEach(function(e){d(e,"click",t)})},j=function(){function t(t){27===t.keyCode?P.emit("keyboard:escape"):13===t.keyCode?P.emit("keyboard:return"):32===t.keyCode?P.emit("keyboard:space"):38===t.keyCode?P.emit("keyboard:arrow:up"):40===t.keyCode?P.emit("keyboard:arrow:down"):37===t.keyCode?P.emit("keyboard:arrow:left"):39===t.keyCode?P.emit("keyboard:arrow:right"):9===t.keyCode&&P.emit("keyboard:tab")}d(document,"keyup",t)},A=function(){function t(){var t=e.offsetWidth;t>785?P.emit("type:size","large"):t>599?P.emit("type:size","medium"):t<600&&P.emit("type:size","small")}window.onresize=t;var e=document.querySelector(".js-text-area")},k=function(){P.emit("bind:layer:toggles"),P.emit("bind:layer:controllers"),P.emit("bind:view:controller"),P.emit("bind:scroll:watcher"),P.emit("bind:popup:closers"),P.emit("bind:keyup"),P.emit("bind:window:resize")},B=function(){P.on("bind:layer:toggles",C),P.on("bind:layer:controllers",O),P.on("bind:view:controller",_),P.on("bind:popup:closers",I),P.on("bind:keyup",j),P.on("bind:window:resize",A),P.on("bind:intent",k),P.emit("bind:intent")},R=function(t,e){var r=document.querySelector(".js-pop-up"),n=document.querySelector(".js-template");o(r,"is-active"),n.innerHTML=e(t.feature.properties)},V=function(){i(document.querySelector(".js-pop-up"),"is-active"),P.emit("popup:closed")},N=function(t){var e=document.querySelector(".js-panels");n(e,"text-is-active")&&i(e,"text-is-active"),n(e,"map-is-active")&&i(e,"map-is-active"),n(e,"split-is-active")&&i(e,"split-is-active"),o(e,t+"-is-active"),"map"===t|"split"===t&&z()},D=function(t){"split"===t&&(t="/"),window.history.replaceState&&window.history.replaceState(null,null,t)},H=function(){var t=document.querySelector(".js-layer-control-panel"),e=document.querySelector(".js-layer-control");a(t,"is-active"),a(e,"is-active")},x=function(){},z=function(){setTimeout(function(){P.emit("map:redraw")},300)},q=function(){i(document.querySelector("html"),"is-loading")},F=function(){P.on("set:view",N),P.on("set:view",D),P.on("layer:control",H),P.on("keyboard:escape",x),P.on("keyboard:escape",V),P.on("popup:opened",R),P.on("popup:close",V),P.on("popup:leafletclosed",V),P.on("routing:done",q)},W={MCB:"Major City Bikeway",CB:"City Bikeway",LS:"Local Service",UT:"Urban Throughway",UH:"Urban Highway",RMS:"Regional Main Street",CC:"Community Corridor",CMS:"Community Main Street",RC:"Regional Corridor",UR:"Urban Road",IR:"Industrial Road",CIMS:"Civic Main Steet",NMS:"Neighborhood Main Street",CIC:"Civic Corridor",NC:"Neighborhood Corridor",MAJ:"Major Emergency Response",MIN:"Minor Emergency Response",PRIMARY:"Primary Emergency Response",SECOND:"Secondary Emergency Response",RT:"Regional",PT:"Priority Truck Street",MT:"Major Truck Street",TA:"Truck Access Street",FD:"Freight District Street",RML:"Railroad Main Line",RBL:"Railroad Branch Line",CCTP:"Central City Transit/Ped Street",CW:"City Walkway",PD:"Pedestrian District Walkway/Street",OSP:"Off-Street Path",RTMCT:"Regional Trafficway/Major City Traffic",MCT:"Major City Traffic Street",DC:"District Collector",RTMTP:"Regional Transit/Major Transit Priority",CT:"Community Transit Street",IPR:"Intercity Passenger Rail","N/A":"No Class",UNK:"Unknown"},Y=function(t,e){return function(e){return'\n      <h5 class="flush-top">\n        '+e.StreetName+'\n      </h5>\n      <table class="flush-bottom lead-top">\n        <tbody>\n          <tr>\n            <td>'+t+" Class:</td>\n            <td>"+e[t]+'</td>\n          </tr>\n        </tbody>\n      </table>\n      <p class="lead-bottom">\n        <b>'+e[t]+":</b>\n        "+W[e[t]]+'\n      </p>\n\n      <p>Transportation Plan ID: <a href="#">'+e.TranPlanID+"</a></p>\n    "}},G=function(t,e){return function(t){return'\n      <h5 class="flush-top">\n        '+t.ProjectName+"\n      </h5>\n      <p> "+t.ProjectDescription+' </p>\n      <table class="lead-bottom lead-top">\n        <tbody>\n          <tr>\n            <td>Status</td>\n            <td>'+t.ProjectStatus+"</td>\n          </tr>\n          <tr>\n            <td>Lead Agency</td>\n            <td>"+t.LeadAgency+"</td>\n          </tr>\n          <tr>\n            <td>Estimated Cost</td>\n            <td>"+t.EstimatedCost+"</td>\n          </tr>\n          <tr>\n            <td>Estimated Time Frame</td>\n            <td>"+t.EstimatedTimeframe+"</td>\n          </tr>\n        </tbody>\n      </table>\n      <p>Transportation Plan ID: "+t.TranPlanID+"</p>\n    "}},U={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20",style:function(t){return{fillOpacity:0,opacity:0}}}),pane:"top",popup:Y("Design")},Z={features:window.L.esri.dynamicMapLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Transportation_System_Plan_Proposal/MapServer",layers:[15,16]}),pane:"bottom"},X={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/22",style:function(t){return{fillOpacity:0,opacity:0}}}),pane:"top",popup:Y("Bicycle")},$={features:window.L.esri.dynamicMapLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Transportation_System_Plan_Proposal/MapServer",layers:[6,7]}),pane:"bottom"},Q={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/1",style:function(t){return{fillOpacity:0,opacity:0}}}),pane:"top",popup:Y("Transit")},J={features:window.L.esri.dynamicMapLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Transportation_System_Plan_Proposal/MapServer",layers:[4,5]}),pane:"bottom"},K={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/4",style:function(t){return{fillOpacity:0,opacity:0}}}),pane:"top",popup:Y("Traffic")},tt={features:window.L.esri.dynamicMapLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Transportation_System_Plan_Proposal/MapServer",layers:[2,3]}),pane:"bottom"},et={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/7",style:function(t){return{fillOpacity:0,opacity:0}}}),pane:"top",popup:Y("Emergency")},rt={features:window.L.esri.dynamicMapLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Transportation_System_Plan_Proposal/MapServer",layers:[0,1]}),pane:"bottom"},nt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/13",style:function(t){return{fillOpacity:0,opacity:0}}}),pane:"top",popup:Y("Pedestrian")},ot={features:window.L.esri.dynamicMapLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Transportation_System_Plan_Proposal/MapServer",layers:[9,10]}),pane:"bottom"},it={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/14",style:function(t){return{fill:!0,fillColor:"#4AAB9C",fillOpacity:.2}}}),popup:Y("Pedestrian")},at={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/17",style:function(t){return{fillOpacity:0,opacity:0}}}),pane:"top",popup:Y("Freight")},st={features:window.L.esri.dynamicMapLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Transportation_System_Plan_Proposal/MapServer",layers:[12,13]}),pane:"bottom"},ct={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/18",style:function(t){return{fill:!0,fillColor:"#DB7BD5",fillOpacity:.2}}}),popup:Y("Freight")},ut={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1",pane:"top"}),popup:G()},lt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5",pane:"top"}),popup:G()},pt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6",pane:"bottom"}),popup:G()},dt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5",pane:"top"}),popup:G()},ft={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5",pane:"top"}),popup:G()},ht={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5",pane:"top"}),popup:G()},mt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5",pane:"top"}),popup:G()},wt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1",pane:"top"}),popup:G()},yt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1",pane:"top"}),popup:G()},vt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1",pane:"top"}),popup:G()},bt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1",pane:"top"}),popup:G()},gt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6",pane:"bottom"}),popup:G()},Lt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6",pane:"bottom"}),popup:G()},Tt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6",pane:"bottom"}),popup:G()},St={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6",pane:"bottom"}),popup:G()},Pt={features:window.L.esri.featureLayer({url:"https://services.arcgis.com/quVN97tn06YNGj9s/arcgis/rest/services/TSPBikePrograms_temp_2018_03_15/FeatureServer/0",pane:"bottom"}),popup:G()},Et={features:window.L.esri.featureLayer({url:"https://services.arcgis.com/quVN97tn06YNGj9s/arcgis/rest/services/TSPBikePrograms_temp_2018_03_15/FeatureServer/1",pane:"bottom"}),popup:G()},Mt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color/MapServer/8",pane:"bottom",style:function(t){return{fillOpacity:.2}}}),popup:function(t,e){return function(t){return console.log(t),'\n      <h5 class="flush-top">\n        '+t.SITEADDR+"\n      </h5>\n    "}}()},Ct={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Zoning/MapServer/0",pane:"bottom",style:function(t){return{fillOpacity:.2}}}),popup:function(t,e){return function(t){return console.log(t),'\n      <h5 class="flush-top">\n        '+t.CMP+'\n      </h5>\n      <p class="flush-bottom">\n        <b>Zone:</b>\n        '+t.CMP_DESC+"\n      </p>\n      <p>\n        <b>Overlay:</b>\n        "+t.OVRLY_DESC+"\n      </p>\n    "}}()},Ot={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/46",pane:"bottom",style:function(t){return{fillOpacity:.2}}}),popup:function(t,e){return function(t){return'\n      <h5 class="flush-top">\n        '+t.NAME+"\n      </h5>\n    "}}()},_t={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/44",pane:"bottom"}),popup:function(t,e){return function(t){return'\n      <h5 class="flush-top">\n        '+t.LOCATION+"\n      </h5>\n    "}}()},It={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/2",pane:"bottom"}),popup:G()},jt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/3",pane:"bottom"}),popup:G()},At={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/4",pane:"bottom"}),popup:G()},kt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/5",pane:"bottom"}),popup:G()},Bt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/6",pane:"bottom"}),popup:G()},Rt=Object.freeze({designFeatures:U,designClassifications:Z,bicycleFeatures:X,bicycleClassifications:$,transitFeatures:Q,transitClassifications:J,trafficFeatures:K,trafficClassifications:tt,emergencyFeatures:et,emergencyClassifications:rt,pedestrianFeatures:nt,pedestrianClassifications:ot,pedestrianDistricts:it,freightFeatures:at,freightClassifications:st,freightDistricts:ct,projectPoints:ut,projectLines:lt,projectPolygons:pt,projLinesConstrained:dt,projLinesUnconstrained:ft,projLinesCC2035:ht,projLinesOther:mt,projPointsConstrained:wt,projPointsUnconstrained:yt,projPointsCC2035:vt,projPointsOther:bt,projPolygonsConstrained:gt,projPolygonsUnconstrained:Lt,projPolygonsCC2035:Tt,projPolygonsOther:St,bikeProgram:Pt,greenwayProgram:Et,taxlots:Mt,zoning:Ct,centers:Ot,corridors:_t,centersRegional:It,centersTown:jt,centersNeighborhood:At,corridorsCivic:kt,corridorsNeighborhood:Bt}),Vt={center:[45.528,-122.63],zoom:12},Nt=L.Control.Zoom.extend({options:{position:"topright",zoomInText:"+",zoomInTitle:"Zoom in",zoomOutText:"-",zoomOutTitle:"Zoom out",zoomMinText:"Zoom min",zoomMinTitle:"Zoom min"},onAdd:function(t){var e="leaflet-control-zoom",r=L.DomUtil.create("div",e+" leaflet-bar"),n=this.options;return this._map=t,this._zoomInButton=this._createButton(n.zoomInText,n.zoomInTitle,e+"-in",r,this._zoomIn,this),this._zoomOutButton=this._createButton(n.zoomOutText,n.zoomOutTitle,e+"-out",r,this._zoomOut,this),this._zoomMinButton=this._createButton(n.zoomMinText,n.zoomMinTitle,e+"-min",r,this._zoomMin,this),r},_zoomMin:function(){this._map.flyTo(Vt.center,Vt.zoom)}}),Dt={center:[45.528,-122.63],zoom:12},Ht=function(){(E=window.L.map("map",{trackResize:!0,center:Dt.center,minZoom:12,zoom:Dt.zoom,zoomControl:!1,scrollWheelZoom:!1})).createPane("bottom"),E.createPane("top"),window.L.esri.tiledMapLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Complete/MapServer"}).addTo(E),E.on("moveend",function(){Dt.center=E.getCenter(),Dt.zoom=E.getZoom()}),xt()},xt=function(){E.addControl(new Nt),window.L.esri.Geocoding.geocodeServiceProvider({url:"https://www.portlandmaps.com/locator/Default/GeocodeServer"});var t=L.esri.Geocoding.geosearch({position:"topright",zoomToResult:!0,allowMultipleResults:!1,searchBounds:L.latLngBounds([[45.6574694,-122.8695448],[45.3309588,-122.4284356]])}).addTo(E),e=L.layerGroup().addTo(E);t.on("results",function(t){e.clearLayers(),e.addLayer(L.marker(t.results[0].latlng)),E.setZoom(0),Dt.zoom=0})},zt=function(){return r(".js-layer-toggle").filter(function(t){return t.checked})},qt=function(){return r(".js-layer-toggle").filter(function(t){return!t.checked})},Ft=function(t){t&&t.split(",").forEach(function(t){return Wt(t)})},Wt=function(t){return new Promise(function(e,r){Rt[t]?(Rt[t].features.addTo(E),P.emit("layer:reset",t),Rt[t].features.bindPopup(function(e){return e&&Yt(e,t),""}).on("popupclose",function(){P.emit("layer:reset",t)}),e()):r()})},Yt=function(t,e){t.bringToFront(),t.setStyle({lineCap:"round",weight:30,color:"#34F644"}),P.emit("popup:opened",t,Rt[e].popup)},Gt=function(t){Rt[t].features.resetStyle&&Rt[t].features.resetStyle()},Ut=function(t){t&&t.split(",").forEach(function(t){return Zt(t)})},Zt=function(t){Rt[t]&&(Rt[t].features.removeFrom(E),Rt[t].features.unbindPopup())},Xt=function(){var t=zt();P.emit("map:legend",t),t.forEach(function(t){var e=t.getAttribute("data-layers");P.emit("map:layer:add",e)}),qt().forEach(function(t){var e=t.getAttribute("data-layers");P.emit("map:layer:remove",e)})},$t=function(){E&&E.remove()},Qt=function(){P.emit("map:destroy"),P.emit("map:create")},Jt=function(){E.closePopup()},Kt=function(t){E.fitBounds(t)},te=function(t,e){E.flyTo(t,e),Dt.zoom=e},ee=function(t){if(t.getBounds){var e=t.getBounds();P.emit("map:fitBounds",e)}else{var r=t._latlng;P.emit("map:setFeature",r,16)}},re=function(t){var e=document.querySelector(".js-legend");e.innerHTML="Viewing:",(t=t.filter(function(t){return null!=t.getAttribute("data-layers")})).forEach(function(t){e.insertAdjacentHTML("beforeend",'\n      <span class="legend-layer">\n        '+t.getAttribute("data-layers")+",\n      </span>\n    ")}),t.length<1&&e.insertAdjacentHTML("beforeend","None")},ne=function(){P.on("popup:opened",ee),P.on("popup:closed",Jt),P.on("map:redraw",Qt),P.on("map:destroy",$t),P.on("map:create",Ht),P.on("map:create",Xt),P.on("map:fitBounds",Kt),P.on("map:setFeature",te),P.on("layers:draw",Xt),P.on("map:layer:add",Ft),P.on("map:layer:remove",Ut),P.on("layer:reset",Gt),P.on("map:legend",re)},oe={startTag:"<b class='highlight'>",endTag:"</b>"},ie=T;Math.easeInOutQuad=function(t,e,r,n){return(t/=n/2)<1?r/2*t*t+e:(t--,-r/2*(t*(t-2)-1)+e)},Math.easeInCubic=function(t,e,r,n){return e+r*((t/=n)*t*t)},Math.inOutQuintic=function(t,e,r,n){var o=(t/=n)*t,i=o*t;return e+r*(6*i*o+-15*o*o+10*i)};var ae=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}(),se=function(t,e,r,n){function o(e){t.scrollTop=e}var i=function(){return t.scrollTop}(),a=e-i,s=0;n=void 0===n?500:n;var c=function(){s+=20,o(Math.easeInOutQuad(s,i,a,n)),s<n?ae(c):r&&"function"==typeof r&&r()};c()};String.prototype.includes||(String.prototype.includes=function(t,e){return"number"!=typeof e&&(e=0),!(e+t.length>this.length)&&-1!==this.indexOf(t,e)});var ce=function(){window.content=[];var t=document.querySelector(".js-search-content"),r=e(t.getElementsByTagName("h1")),n=e(t.getElementsByTagName("h2")),o=e(t.getElementsByTagName("h3")),i=e(t.getElementsByTagName("h4")),a=e(t.getElementsByTagName("h5")),s=e(t.getElementsByTagName("h6")),c=e(t.getElementsByTagName("p"));window.content=window.content.concat(r),window.content=window.content.concat(n),window.content=window.content.concat(o),window.content=window.content.concat(i),window.content=window.content.concat(a),window.content=window.content.concat(s),window.content=window.content.concat(c)},ue=function(t,e){return!!t.innerHTML&&!!t.innerHTML.toLowerCase().includes(e)},le=function(t){t=t.toLowerCase();var e=window.content.filter(function(e){return ue(e,t)});P.emit("search:result",e.length,e,t)},pe=function(t){h(t);var e=r(".js-search-input",t.target.parentNode)[0].value;P.emit("search:for",e)},de=function(t){h(t),r(".js-search-input",t.target.parentNode)[0].value="",P.emit("search:cancel")},fe=function(){var t=r(".js-search-submit"),e=r(".js-search-cancel");t.map(function(t){d(t,"click",pe)}),e.map(function(t){d(t,"click",de)})},he=function(){var t=r(".js-search-loader"),e=r(".js-search-hide"),n=r(".js-search-results");e.forEach(function(t){o(t,"is-hidden")}),t.forEach(function(t){o(t,"is-active")}),n.forEach(function(t){i(t,"is-active")})},me=function(){var t=r(".js-search-loader"),e=r(".js-search-hide"),n=r(".js-search-results");e.forEach(function(t){o(t,"is-hidden")}),t.forEach(function(t){i(t,"is-active")}),n.forEach(function(t){o(t,"is-active")})},we=function(){var t=r(".js-search-loader"),e=r(".js-search-hide"),n=r(".js-search-results");e.forEach(function(t){i(t,"is-hidden")}),t.forEach(function(t){i(t,"is-active")}),n.forEach(function(t){i(t,"is-active")})};window.scrollToPosition=function(t){var e=document.querySelector(".js-text-area");se(e,t-60)};var ye=function(t){for(var e;"H"!=t.tagName[0];)e=t,(t=t.previousElementSibling)||(t=e.parentNode);return t.innerHTML},ve=function(t,e,n){var o=r(".js-search-results");document.querySelector(".js-search-content"),o.map(function(r){r.innerHTML='\n      <h6 class="search-result-summary">'+t+" results for '"+n+"'</h6>\n    ",e.map(function(t){var e=ye(t),o=b(t),i=t.innerHTML,a=ie(n,i);r.insertAdjacentHTML("beforeend",'\n        <a class="search-result" onclick="scrollToPosition('+o+')">\n          <h6 class="search-result-header">'+e+'</h6>\n          <p class="search-result-preview">'+a+"</p>\n        </a>\n      ")})}),P.emit("search:render")},be=document.querySelector(".js-text-area"),ge=e(be.getElementsByTagName("h1")),Le=(document.querySelector(".js-chapter-nubs"),document.querySelector(".js-nub-list")),Te=M.createContainer(be),Se={},Pe=function(){ge.forEach(function(t){Se[t.id]=Te.create(t),Se[t.id].enterViewport(function(){P.emit("nubs:active",t.id),P.emit("breadscrumbs:active",t)})})},Ee=function(t){return'\n    <li>\n      <a href="#'+t.href+'"\n         data-nub="'+t.href+'"\n         class="nub\n                js-nub\n                tooltip tooltip-right"\n         aria-label="'+t.text+'">\n      </a>\n    </li>\n  '},Me=function(){e(be.getElementsByTagName("h1")).map(function(t){return{href:t.id,text:t.innerHTML}}).forEach(function(t){var e=Ee(t);Le&&Le.insertAdjacentHTML("beforeend",e)}),P.emit("nubs:active","top")},Ce=function(t){Le&&e(Le.querySelectorAll(".js-nub")).forEach(function(e){i(e,"is-active"),e.getAttribute("data-nub")===t&&o(e,"is-active")})},Oe=function(){P.on("nubs:draw",Me),P.on("nubs:draw",Pe),P.on("nubs:active",Ce),P.emit("nubs:draw")},_e=document.querySelector(".js-breadcrumbs"),Ie=function(t){var e='\n    <span class="pt8 nav-top-link">></span>\n    <a href=\'#'+t.id+'\' class="crumb nav-top-link pt10">\n      '+t.innerHTML+"\n    </a>\n  ";_e.innerHTML="",_e.insertAdjacentHTML("beforeend",e)},je=function(){P.on("breadscrumbs:active",Ie)},Ae=function(){var t=Array.apply(void 0,document.querySelectorAll(".toc ul li ul")),e=Array.apply(void 0,document.querySelectorAll(".toc ul"));t.forEach(function(t){n(t,"is-active")&&i(t,"is-active")}),e.forEach(function(t){n(t,"is-active")&&i(t,"is-active")})},ke=function(t){a(t.querySelector("ul"),"is-active")},Be=function(){Array.apply(void 0,document.querySelectorAll(".toc a")).forEach(function(t){t.addEventListener("click",function(t){var e=t.target.parentNode,r=e.parentNode.parentNode;P.emit("toc:toggle",e),P.emit("toc:toggle",r)})}),Array.apply(void 0,document.querySelectorAll(".toc ul li ul")).forEach(function(t){t.addEventListener("click",function(t){P.emit("toc:close")})})},Re=function(){P.on("toc:bind",Be),P.on("toc:toggle",ke),P.on("toc:close",Ae),P.on("keyboard:escape",Ae),P.on("drawer:close",Ae),P.on("keyboard:arrow:left",Ae),P.emit("toc:bind")},Ve=function(){var t=document.querySelector(".js-text-area");Array.apply(void 0,document.querySelectorAll("a")).filter(function(t){return"#"==t.attributes.href.value.charAt(0)}).forEach(function(e){var r=e.attributes.href.value;e.addEventListener("click",function(e){e.preventDefault(),console.log(r);var n=b(document.querySelector(r))-60;se(t,n)})})},Ne=function(){F(),B(),l(),y(),v(),ne(),S(),Oe(),je(),Ve(),Re()};P.on("has:javascript",Ne),function(){P.emit("has:javascript")}()}();