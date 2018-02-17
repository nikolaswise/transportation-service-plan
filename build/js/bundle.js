!function(){"use strict";function t(t,e){var n;for(n=e;n&&(1!==n.nodeType||!o(n,t));n=n.parentNode);return n}function e(t){return Array.isArray(t)?t:Array.prototype.slice.call(t)}function n(t,n){return e((n||document).querySelectorAll(t))}function o(t,e){return new RegExp("(\\s|^)"+e+"(\\s|$)").test(t.getAttribute("class"))}function r(t,e){e.split(" ").forEach(function(e){o(t,e)||t.setAttribute("class",t.getAttribute("class")+" "+e)})}function i(t,e){e.split(" ").forEach(function(e){var n=t.getAttribute("class").replace(new RegExp("(\\s|^)"+e+"(\\s|$)","g"),"$2");o(t,e)&&t.setAttribute("class",n)})}function s(t,e){o(t,e)?i(t,e):r(t,e)}function a(t){(t=e(t)).forEach(function(t){i(t,"is-active")})}function c(){}function u(){i(document.querySelector("html"),"js-is-inactive")}function l(){var t=document.location.pathname+"/";"/map/"===(t=t.replace("//","/"))?P.emit("set:view","map"):"/text/"===t?P.emit("set:view","text"):P.emit("set:view","split"),P.emit("routing:done")}function p(){return"click"}function d(t,e,n){return t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent?t.attachEvent("on"+e,n):void 0}function h(t,e,n){return t.removeEventListener?t.removeEventListener(e,n,!1):t.detachEvent?t.detachEvent("on"+e,n):void 0}function f(t){if(t.preventDefault)return t.preventDefault();t.returnValue&&(t.returnValue=!1)}function m(t){t.forEach(function(t){t&&t.setAttribute("aria-hidden",!0)})}function w(t){t.forEach(function(t){t&&t.removeAttribute("aria-hidden")})}function v(){function e(){return[]}function s(t){if(P.emit("modal:close"),t){var n=document.querySelector('.js-modal[data-modal="'+t+'"]');n.removeAttribute("tabindex"),d(document,"focusin",l),r(n,"is-active"),m(e()),n.focus()}}function c(t){if(!t)return a(b);var n=document.querySelector('.js-modal[data-modal="'+t+'"]');i(n,"is-active"),n.setAttribute("tabindex",0),h(document,"focusin",l),w(e())}function u(t){t?d(t,p(),v):y.forEach(function(t){d(t,p(),v)})}function l(e){t("js-modal",e.target)||b.forEach(function(t){o(t,"is-active")&&t.focus()})}function v(t){f(t);var e=t.target.dataset.modal;P.emit("modal:open",e)}var y=n(".js-modal-toggle"),b=n(".js-modal");P.on("modal:open",s),P.on("keyboard:escape",c),P.on("modal:close",c),P.on("modal:bind",u),P.emit("modal:bind")}function y(){function e(t){P.emit("drawer:close");var e=document.querySelector('.js-drawer[data-drawer="'+t.id+'"]');if(e){var n=o(e,"drawer-right"),i=o(e,"drawer-left");e.setAttribute("tabindex",0),r(e,"is-active"),n?r(y,"drawer-right-is-active"):i&&r(y,"drawer-left-is-active"),m([y]),d(e,p(),u),d(document,"focusin",a)}}function s(t){if(t){var e=document.querySelector('.js-drawer[data-drawer="'+t.id+'"]');e.removeAttribute("tabindex"),i(e,"is-active")}else g.forEach(function(t){t.removeAttribute("tabindex"),i(t,"is-active")});i(y,"drawer-left-is-active"),i(y,"drawer-right-is-active"),b.forEach(function(t){i(t,"is-active")}),w([y]),h(document,"focusin",a),v&&v.focus()}function a(e){t("js-drawer",e.target)||g.forEach(function(t){o(t,"is-active")&&t.focus()})}function c(t){t?d(t.node,p(),l):b.forEach(function(t){d(t,p(),l)})}function u(t){o(t.target,"js-drawer")&&P.emit("drawer:close"),o(t.target,"js-drawer-close")&&P.emit("drawer:close")}function l(t){f(t);var e=t.target.getAttribute("data-drawer");r(t.target,"is-active"),P.emit("drawer:open",{id:e})}var v,y=document.querySelector(".js-panels"),b=n(".js-drawer-toggle"),g=n(".js-drawer");P.on("drawer:open",e),P.on("keyboard:escape",s),P.on("drawer:close",s),P.on("drawer:bind",c),P.emit("drawer:bind")}function b(t){return Ht.startTag+t+Ht.endTag}function g(t,e){var n=t.split(" ");n=(n=(n=n.filter(function(t){return""!==t})).join("|")).replace(/[-[\]{}()*+?.,\\^$]/g,"\\$&");var o=new RegExp(n,"gi");return e.replace(o,b)}function E(t){var e=0;do{isNaN(t.offsetTop)||(e+=t.offsetTop)}while(t=t.offsetParent);return e}function T(){P.on("search:index",xt),P.on("search:bind",Ft),P.on("search:for",zt),P.on("search:render",Gt),P.on("search:cancel",Yt),P.on("search:for",_t),P.on("search:result",Xt),P.emit("search:index"),P.emit("search:bind")}c.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function o(){r.off(t,o),e.apply(n,arguments)}var r=this;return o._=e,this.on(t,o,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,r=n.length;for(o;o<r;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],r=[];if(o&&e)for(var i=0,s=o.length;i<s;i++)o[i].fn!==e&&o[i].fn._!==e&&r.push(o[i]);return r.length?n[t]=r:delete n[t],this}};var P=new c;P.on("has:javascript",u);"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var S,j=function(t,e){return e={exports:{}},t(e,e.exports),e.exports}(function(t,e){!function(e,n){t.exports=function(){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){var o=n(1).isInBrowser,r=new(n(2))(o?document.body:null);r.setStateFromDOM(null),r.listenToDOM(),o&&(window.scrollMonitor=r),t.exports=r},function(t,e){e.VISIBILITYCHANGE="visibilityChange",e.ENTERVIEWPORT="enterViewport",e.FULLYENTERVIEWPORT="fullyEnterViewport",e.EXITVIEWPORT="exitViewport",e.PARTIALLYEXITVIEWPORT="partiallyExitViewport",e.LOCATIONCHANGE="locationChange",e.STATECHANGE="stateChange",e.eventTypes=[e.VISIBILITYCHANGE,e.ENTERVIEWPORT,e.FULLYENTERVIEWPORT,e.EXITVIEWPORT,e.PARTIALLYEXITVIEWPORT,e.LOCATIONCHANGE,e.STATECHANGE],e.isOnServer="undefined"==typeof window,e.isInBrowser=!e.isOnServer,e.defaultOffsets={top:0,bottom:0}},function(t,e,n){function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t){return c?0:t===document.body?window.innerHeight||document.documentElement.clientHeight:t.clientHeight}function i(t){return c?0:t===document.body?Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.documentElement.clientHeight):t.scrollHeight}function s(t){return c?0:t===document.body?window.pageYOffset||document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop}var a=n(1),c=a.isOnServer,u=a.isInBrowser,l=a.eventTypes,p=n(3),d=function(){function t(e,n){function a(){if(u.viewportTop=s(e),u.viewportBottom=u.viewportTop+u.viewportHeight,u.documentHeight=i(e),u.documentHeight!==p){for(d=u.watchers.length;d--;)u.watchers[d].recalculateLocation();p=u.documentHeight}}function c(){for(h=u.watchers.length;h--;)u.watchers[h].update();for(h=u.watchers.length;h--;)u.watchers[h].triggerCallbacks()}o(this,t);var u=this;this.item=e,this.watchers=[],this.viewportTop=null,this.viewportBottom=null,this.documentHeight=i(e),this.viewportHeight=r(e),this.DOMListener=function(){t.prototype.DOMListener.apply(u,arguments)},this.eventTypes=l,n&&(this.containerWatcher=n.create(e));var p,d,h;this.update=function(){a(),c()},this.recalculateLocations=function(){this.documentHeight=0,this.update()}}return t.prototype.listenToDOM=function(){u&&(window.addEventListener?(this.item===document.body?window.addEventListener("scroll",this.DOMListener):this.item.addEventListener("scroll",this.DOMListener),window.addEventListener("resize",this.DOMListener)):(this.item===document.body?window.attachEvent("onscroll",this.DOMListener):this.item.attachEvent("onscroll",this.DOMListener),window.attachEvent("onresize",this.DOMListener)),this.destroy=function(){window.addEventListener?(this.item===document.body?(window.removeEventListener("scroll",this.DOMListener),this.containerWatcher.destroy()):this.item.removeEventListener("scroll",this.DOMListener),window.removeEventListener("resize",this.DOMListener)):(this.item===document.body?(window.detachEvent("onscroll",this.DOMListener),this.containerWatcher.destroy()):this.item.detachEvent("onscroll",this.DOMListener),window.detachEvent("onresize",this.DOMListener))})},t.prototype.destroy=function(){},t.prototype.DOMListener=function(t){this.setStateFromDOM(t)},t.prototype.setStateFromDOM=function(t){var e=s(this.item),n=r(this.item),o=i(this.item);this.setState(e,n,o,t)},t.prototype.setState=function(t,e,n,o){var r=this,i=e!==this.viewportHeight||n!==this.contentHeight;if(this.latestEvent=o,this.viewportTop=t,this.viewportHeight=e,this.viewportBottom=t+e,this.contentHeight=n,i)for(var s=this.watchers.length;s--;)r.watchers[s].recalculateLocation();this.updateAndTriggerWatchers(o)},t.prototype.updateAndTriggerWatchers=function(t){for(var e=this,n=this.watchers.length;n--;)e.watchers[n].update();for(n=this.watchers.length;n--;)e.watchers[n].triggerCallbacks(t)},t.prototype.createCustomContainer=function(){return new t},t.prototype.createContainer=function(e){"string"==typeof e?e=document.querySelector(e):e&&e.length>0&&(e=e[0]);var n=new t(e,this);return n.setStateFromDOM(),n.listenToDOM(),n},t.prototype.create=function(t,e){"string"==typeof t?t=document.querySelector(t):t&&t.length>0&&(t=t[0]);var n=new p(this,t,e);return this.watchers.push(n),n},t.prototype.beget=function(t,e){return this.create(t,e)},t}();t.exports=d},function(t,e,n){function o(t,e,n){function o(t,e){if(0!==t.length)for(g=t.length;g--;)(L=t[g]).callback.call(r,e,r),L.isOne&&t.splice(g,1)}var r=this;this.watchItem=e,this.container=t,this.offsets=n?n===+n?{top:n,bottom:n}:{top:n.top||h.top,bottom:n.bottom||h.bottom}:h,this.callbacks={};for(var f=0,m=d.length;f<m;f++)r.callbacks[d[f]]=[];this.locked=!1;var w,v,y,b,g,L;this.triggerCallbacks=function(t){switch(this.isInViewport&&!w&&o(this.callbacks[s],t),this.isFullyInViewport&&!v&&o(this.callbacks[a],t),this.isAboveViewport!==y&&this.isBelowViewport!==b&&(o(this.callbacks[i],t),v||this.isFullyInViewport||(o(this.callbacks[a],t),o(this.callbacks[u],t)),w||this.isInViewport||(o(this.callbacks[s],t),o(this.callbacks[c],t))),!this.isFullyInViewport&&v&&o(this.callbacks[u],t),!this.isInViewport&&w&&o(this.callbacks[c],t),this.isInViewport!==w&&o(this.callbacks[i],t),!0){case w!==this.isInViewport:case v!==this.isFullyInViewport:case y!==this.isAboveViewport:case b!==this.isBelowViewport:o(this.callbacks[p],t)}w=this.isInViewport,v=this.isFullyInViewport,y=this.isAboveViewport,b=this.isBelowViewport},this.recalculateLocation=function(){if(!this.locked){var t=this.top,e=this.bottom;if(this.watchItem.nodeName){var n=this.watchItem.style.display;"none"===n&&(this.watchItem.style.display="");for(var r=0,i=this.container;i.containerWatcher;)r+=i.containerWatcher.top-i.containerWatcher.container.viewportTop,i=i.containerWatcher.container;var s=this.watchItem.getBoundingClientRect();this.top=s.top+this.container.viewportTop-r,this.bottom=s.bottom+this.container.viewportTop-r,"none"===n&&(this.watchItem.style.display=n)}else this.watchItem===+this.watchItem?this.watchItem>0?this.top=this.bottom=this.watchItem:this.top=this.bottom=this.container.documentHeight-this.watchItem:(this.top=this.watchItem.top,this.bottom=this.watchItem.bottom);this.top-=this.offsets.top,this.bottom+=this.offsets.bottom,this.height=this.bottom-this.top,void 0===t&&void 0===e||this.top===t&&this.bottom===e||o(this.callbacks[l],null)}},this.recalculateLocation(),this.update(),w=this.isInViewport,v=this.isFullyInViewport,y=this.isAboveViewport,b=this.isBelowViewport}var r=n(1),i=r.VISIBILITYCHANGE,s=r.ENTERVIEWPORT,a=r.FULLYENTERVIEWPORT,c=r.EXITVIEWPORT,u=r.PARTIALLYEXITVIEWPORT,l=r.LOCATIONCHANGE,p=r.STATECHANGE,d=r.eventTypes,h=r.defaultOffsets;o.prototype={on:function(t,e,n){switch(!0){case t===i&&!this.isInViewport&&this.isAboveViewport:case t===s&&this.isInViewport:case t===a&&this.isFullyInViewport:case t===c&&this.isAboveViewport&&!this.isInViewport:case t===u&&this.isInViewport&&this.isAboveViewport:if(e.call(this,this.container.latestEvent,this),n)return}if(!this.callbacks[t])throw new Error("Tried to add a scroll monitor listener of type "+t+". Your options are: "+d.join(", "));this.callbacks[t].push({callback:e,isOne:n||!1})},off:function(t,e){var n=this;if(!this.callbacks[t])throw new Error("Tried to remove a scroll monitor listener of type "+t+". Your options are: "+d.join(", "));for(var o,r=0;o=this.callbacks[t][r];r++)if(o.callback===e){n.callbacks[t].splice(r,1);break}},one:function(t,e){this.on(t,e,!0)},recalculateSize:function(){this.height=this.watchItem.offsetHeight+this.offsets.top+this.offsets.bottom,this.bottom=this.top+this.height},update:function(){this.isAboveViewport=this.top<this.container.viewportTop,this.isBelowViewport=this.bottom>this.container.viewportBottom,this.isInViewport=this.top<this.container.viewportBottom&&this.bottom>this.container.viewportTop,this.isFullyInViewport=this.top>=this.container.viewportTop&&this.bottom<=this.container.viewportBottom||this.isAboveViewport&&this.isBelowViewport},destroy:function(){var t=this.container.watchers.indexOf(this),e=this;this.container.watchers.splice(t,1);for(var n=0,o=d.length;n<o;n++)e.callbacks[d[n]].length=0},lock:function(){this.locked=!0},unlock:function(){this.locked=!1}};for(var f=0,m=d.length;f<m;f++){var w=d[f];o.prototype[w]=function(t){return function(e,n){this.on.call(this,t,e,n)}}(w)}t.exports=o}])}()}()}),I=function(){function t(t){P.emit("layers:draw")}n(".js-layer-toggle").forEach(function(e){d(e,"click",t)})},O=function(){function t(t){t.preventDefault(),P.emit("layer:control")}n(".js-layer-control").forEach(function(e){d(e,"click",t)})},k=function(){function t(t){t.preventDefault();var e=t.target.getAttribute("data-panel");P.emit("set:view",e)}n(".js-view-control").forEach(function(e){d(e,"click",t)})},C=function(){function t(t){t.preventDefault(),P.emit("popup:close")}n(".js-close-popup").forEach(function(e){d(e,"click",t)})},M=function(){function t(t){27===t.keyCode?P.emit("keyboard:escape"):13===t.keyCode?P.emit("keyboard:return"):32===t.keyCode?P.emit("keyboard:space"):38===t.keyCode?P.emit("keyboard:arrow:up"):40===t.keyCode?P.emit("keyboard:arrow:down"):37===t.keyCode?P.emit("keyboard:arrow:left"):39===t.keyCode?P.emit("keyboard:arrow:right"):9===t.keyCode&&P.emit("keyboard:tab")}d(document,"keyup",t)},A=function(){function t(){var t=e.offsetWidth;t>785?P.emit("type:size","large"):t>599?P.emit("type:size","medium"):t<600&&P.emit("type:size","small")}window.onresize=t;var e=document.querySelector(".js-text-area")},B=function(){P.emit("bind:layer:toggles"),P.emit("bind:layer:controllers"),P.emit("bind:view:controller"),P.emit("bind:scroll:watcher"),P.emit("bind:popup:closers"),P.emit("bind:keyup"),P.emit("bind:window:resize")},V=function(){P.on("bind:layer:toggles",I),P.on("bind:layer:controllers",O),P.on("bind:view:controller",k),P.on("bind:popup:closers",C),P.on("bind:keyup",M),P.on("bind:window:resize",A),P.on("bind:intent",B),P.emit("bind:intent")},R=function(t,e){var n=document.querySelector(".js-pop-up"),o=document.querySelector(".js-template");r(n,"is-active"),o.innerHTML=e(t.feature.properties)},H=function(){i(document.querySelector(".js-pop-up"),"is-active"),P.emit("popup:closed")},D=function(t){var e=document.querySelector(".js-panels");o(e,"text-is-active")&&i(e,"text-is-active"),o(e,"map-is-active")&&i(e,"map-is-active"),o(e,"split-is-active")&&i(e,"split-is-active"),r(e,t+"-is-active"),"map"===t|"split"===t&&q()},x=function(t){"split"===t&&(t="/"),window.history.replaceState&&window.history.replaceState(null,null,t)},N=function(){var t=document.querySelector(".js-layer-control-panel"),e=document.querySelector(".js-layer-control");s(t,"is-active"),s(e,"is-active")},_=function(){var t=document.querySelector(".js-layer-control-panel");o(t,"is-active")&&i(t,"is-active")},q=function(){setTimeout(function(){P.emit("map:redraw")},300)},W=function(){i(document.querySelector("html"),"is-loading")},F=function(){P.on("set:view",D),P.on("set:view",x),P.on("layer:control",N),P.on("keyboard:escape",_),P.on("keyboard:escape",H),P.on("popup:opened",R),P.on("popup:close",H),P.on("popup:leafletclosed",H),P.on("routing:done",W)},z=function(t,e){return function(n){return'\n      <h5 class="flush-top">\n        '+n.StreetName+'\n      </h5>\n      <table class="lead-bottom lead-top">\n        <tbody>\n          <tr>\n            <td>Current Classification:</td>\n            <td>'+n[t]+"</td>\n          </tr>\n          <tr>\n            <td>Proposed Classification:</td>\n            <td>"+n[e]+'</td>\n          </tr>\n        </tbody>\n      </table>\n      <p class="flush-bottom"><b>'+n[t]+':</b></p>\n      <p>What does that mean do you thing?</p>\n\n      <p class="flush-bottom"><b>'+n[e]+':</b></p>\n      <p>What does that mean do you thing?</p>\n\n      <p>Transportation Plan ID: <a href="#">'+n.TranPlanID+"</a></p>\n    "}},G=function(t,e){return function(t){return'\n      <h5 class="flush-top">\n        '+t.ProjectName+"\n      </h5>\n      <p> "+t.ProjectDescription+' </p>\n      <table class="lead-bottom lead-top">\n        <tbody>\n          <tr>\n            <td>Status</td>\n            <td>'+t.ProjectStatus+"</td>\n          </tr>\n          <tr>\n            <td>Source</td>\n            <td>"+t.ProjectSource+"</td>\n          </tr>\n          <tr>\n            <td>Lead Agency</td>\n            <td>"+t.LeadAgency+"</td>\n          </tr>\n          <tr>\n            <td>Estimated Cost</td>\n            <td>"+t.EstimatedCost+"</td>\n          </tr>\n          <tr>\n            <td>Estimated Timeframe</td>\n            <td>"+t.EstimatedTimeframe+'</td>\n          </tr>\n        </tbody>\n      </table>\n      <p>Transportation Plan ID: <a href="#">'+t.TranPlanID+"</a></p>\n    "}},Y={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20"}),popup:z("Design","ProposedDesign")},U={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/22"}),popup:z("Bicycle","ProposedBicycle")},X={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/1"}),popup:z("Transit","ProposedTransit")},$={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/4"}),popup:z("Traffic","ProposedTraffic")},Z={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/7"}),popup:z("Emergency","ProposedEmergency")},J={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/13"}),popup:z("Pedestrian","ProposedPedestrian")},K={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/14",style:function(t){return{fill:!0,fillColor:"#4AAB9C",fillOpacity:.2}}}),popup:z("Pedestrian","ProposedPedestrian")},Q={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/17"}),popup:z("Freight","ProposedFreight")},tt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/18",style:function(t){return{fill:!0,fillColor:"#DB7BD5",fillOpacity:.2}}}),popup:z("Freight","ProposedFreight")},et={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1",pane:"top"}),popup:G()},nt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5",pane:"top"}),popup:G()},ot={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6",pane:"bottom"}),popup:G()},rt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5",pane:"top"}),popup:G()},it={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5",pane:"top"}),popup:G()},st={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5",pane:"top"}),popup:G()},at={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5",pane:"top"}),popup:G()},ct={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1",pane:"top"}),popup:G()},ut={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1",pane:"top"}),popup:G()},lt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1",pane:"top"}),popup:G()},pt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1",pane:"top"}),popup:G()},dt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6",pane:"bottom"}),popup:G()},ht={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6",pane:"bottom"}),popup:G()},ft={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6",pane:"bottom"}),popup:G()},mt={features:window.L.esri.featureLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6",pane:"bottom"}),popup:G()},wt=Object.freeze({designClassifications:Y,bicycleClassifications:U,transitClassifications:X,trafficClassifications:$,emergencyClassifications:Z,pedestrianClassifications:J,pedestrianDistricts:K,freightClassifications:Q,freightDistricts:tt,projectPoints:et,projectLines:nt,projectPolygons:ot,projLinesConstrained:rt,projLinesUnconstrained:it,projLinesCC2035:st,projLinesOther:at,projPointsConstrained:ct,projPointsUnconstrained:ut,projPointsCC2035:lt,projPointsOther:pt,projPolygonsConstrained:dt,projPolygonsUnconstrained:ht,projPolygonsCC2035:ft,projPolygonsOther:mt}),vt={center:[45.528,-122.63],zoom:12},yt=function(){(S=window.L.map("map",{trackResize:!0,center:vt.center,zoom:vt.zoom,zoomControl:!1,scrollWheelZoom:!1})).createPane("bottom"),S.createPane("top"),window.L.esri.tiledMapLayer({url:"https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Complete/MapServer"}).addTo(S),S.on("moveend",function(){vt.center=S.getCenter(),vt.zoom=S.getZoom()}),bt()},bt=function(){S.addControl(window.L.control.zoom({position:"topright"}));window.L.esri.Geocoding.geocodeServiceProvider({url:"https://www.portlandmaps.com/locator/Default/GeocodeServer"});var t=L.esri.Geocoding.geosearch({position:"topright",zoomToResult:!0,allowMultipleResults:!1,searchBounds:L.latLngBounds([[45.6574694,-122.8695448],[45.3309588,-122.4284356]])}).addTo(S),e=L.layerGroup().addTo(S);t.on("results",function(t){e.clearLayers(),e.addLayer(L.marker(t.results[0].latlng)),S.setZoom(0),vt.zoom=0})},gt=function(){return n(".js-layer-toggle").filter(function(t){return t.checked})},Lt=function(){return n(".js-layer-toggle").filter(function(t){return!t.checked})},Et=function(t){t&&t.split(",").forEach(function(t){return Tt(t)})},Tt=function(t){wt[t].features.addTo(S),P.emit("layer:reset",t),wt[t].features.bindPopup(function(e){return Pt(e,t),""}).on("popupclose",function(){P.emit("layer:reset",t)})},Pt=function(t,e){t.bringToFront(),t.setStyle({lineCap:"round",weight:30,color:"#34F644"}),P.emit("popup:opened",t,wt[e].popup)},St=function(t){wt[t].features.resetStyle()},jt=function(t){t&&t.split(",").forEach(function(t){return It(t)})},It=function(t){wt[t].features.removeFrom(S),wt[t].features.unbindPopup()},Ot=function(){gt().forEach(function(t){var e=t.getAttribute("data-layers");P.emit("map:layer:add",e)}),Lt().forEach(function(t){var e=t.getAttribute("data-layers");P.emit("map:layer:remove",e)})},kt=function(){S&&S.remove()},Ct=function(){P.emit("map:destroy"),P.emit("map:create")},Mt=function(){S.closePopup()},At=function(t){S.fitBounds(t)},Bt=function(t,e){S.flyTo(t,e),vt.zoom=e},Vt=function(t){if(t.getBounds){var e=t.getBounds();P.emit("map:fitBounds",e)}else{var n=t._latlng;P.emit("map:setFeature",n,16)}},Rt=function(){P.on("popup:opened",Vt),P.on("popup:closed",Mt),P.on("map:redraw",Ct),P.on("map:destroy",kt),P.on("map:create",yt),P.on("map:create",Ot),P.on("map:fitBounds",At),P.on("map:setFeature",Bt),P.on("layers:draw",Ot),P.on("map:layer:add",Et),P.on("map:layer:remove",jt),P.on("layer:reset",St)},Ht={startTag:"<b class='highlight'>",endTag:"</b>"},Dt=g;String.prototype.includes||(String.prototype.includes=function(t,e){return"number"!=typeof e&&(e=0),!(e+t.length>this.length)&&-1!==this.indexOf(t,e)});var xt=function(){window.content=[];var t=document.querySelector(".js-search-content"),n=e(t.getElementsByTagName("h1")),o=e(t.getElementsByTagName("h2")),r=e(t.getElementsByTagName("h3")),i=e(t.getElementsByTagName("h4")),s=e(t.getElementsByTagName("h5")),a=e(t.getElementsByTagName("h6")),c=e(t.getElementsByTagName("p"));window.content=window.content.concat(n),window.content=window.content.concat(o),window.content=window.content.concat(r),window.content=window.content.concat(i),window.content=window.content.concat(s),window.content=window.content.concat(a),window.content=window.content.concat(c)},Nt=function(t,e){return!!t.innerHTML&&!!t.innerHTML.toLowerCase().includes(e)},_t=function(t){t=t.toLowerCase();var e=window.content.filter(function(e){return Nt(e,t)});P.emit("search:result",e.length,e,t)},qt=function(t){f(t);var e=n(".js-search-input",t.target.parentNode)[0].value;P.emit("search:for",e)},Wt=function(t){f(t),n(".js-search-input",t.target.parentNode)[0].value="",P.emit("search:cancel")},Ft=function(){var t=n(".js-search-submit"),e=n(".js-search-cancel");t.map(function(t){d(t,"click",qt)}),e.map(function(t){d(t,"click",Wt)})},zt=function(){var t=n(".js-search-loader"),e=n(".js-search-hide"),o=n(".js-search-results");e.forEach(function(t){r(t,"is-hidden")}),t.forEach(function(t){r(t,"is-active")}),o.forEach(function(t){i(t,"is-active")})},Gt=function(){var t=n(".js-search-loader"),e=n(".js-search-hide"),o=n(".js-search-results");e.forEach(function(t){r(t,"is-hidden")}),t.forEach(function(t){i(t,"is-active")}),o.forEach(function(t){r(t,"is-active")})},Yt=function(){var t=n(".js-search-loader"),e=n(".js-search-hide"),o=n(".js-search-results");e.forEach(function(t){i(t,"is-hidden")}),t.forEach(function(t){i(t,"is-active")}),o.forEach(function(t){i(t,"is-active")})};window.scrollToPosition=function(t){document.querySelector(".js-text-area").scrollTop=t-60};var Ut=function(t){for(var e;"H"!=t.tagName[0];)e=t,(t=t.previousElementSibling)||(t=e.parentNode);return t.innerHTML},Xt=function(t,e,o){var r=n(".js-search-results");document.querySelector(".js-search-content");r.map(function(n){n.innerHTML='\n      <h6 class="search-result-summary">'+t+" results for '"+o+"'</h6>\n    ",e.map(function(t){var e=Ut(t),r=E(t),i=t.innerHTML,s=Dt(o,i);n.insertAdjacentHTML("beforeend",'\n        <a class="search-result" onclick="scrollToPosition('+r+')">\n          <h6 class="search-result-header">'+e+'</h6>\n          <p class="search-result-preview">'+s+"</p>\n        </a>\n      ")})}),P.emit("search:render")},$t=document.querySelector(".js-text-area"),Zt=e($t.getElementsByTagName("h1")),Jt=(document.querySelector(".js-chapter-nubs"),document.querySelector(".js-nub-list")),Kt=j.createContainer($t),Qt={},te=function(){Zt.forEach(function(t){Qt[t.id]=Kt.create(t),Qt[t.id].enterViewport(function(){P.emit("nubs:active",t.id),P.emit("breadscrumbs:active",t)})})},ee=function(t){return'\n    <li>\n      <a href="#'+t.href+'"\n         data-nub="'+t.href+'"\n         class="nub\n                js-nub\n                tooltip tooltip-right"\n         aria-label="'+t.text+'">\n      </a>\n    </li>\n  '},ne=function(){e($t.getElementsByTagName("h1")).map(function(t){return{href:t.id,text:t.innerHTML}}).forEach(function(t){var e=ee(t);Jt.insertAdjacentHTML("beforeend",e)}),P.emit("nubs:active","top")},oe=function(t){e(Jt.querySelectorAll(".js-nub")).forEach(function(e){i(e,"is-active"),e.getAttribute("data-nub")===t&&r(e,"is-active")})},re=function(){P.on("nubs:draw",ne),P.on("nubs:draw",te),P.on("nubs:active",oe),P.emit("nubs:draw")},ie=document.querySelector(".js-breadcrumbs"),se=function(t){var e='\n    <span class="pt8 nav-top-link">></span>\n    <a href=\'#'+t.id+'\' class="crumb nav-top-link pt10">\n      '+t.innerHTML+"\n    </a>\n  ";ie.innerHTML="",ie.insertAdjacentHTML("beforeend",e)},ae=function(){P.on("breadscrumbs:active",se)},ce=function(){F(),V(),l(),v(),y(),Rt(),T(),re(),ae()};P.on("has:javascript",ce),function(){P.emit("has:javascript")}()}();