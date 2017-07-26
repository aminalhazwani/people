!function(a){"use strict";function b(a){this.translateX=0,this._colspanOnFocus=0,this.frameElem="string"==typeof a.frameElem?document.getElementById(a.frameElem):a.frameElem,this.listElem="string"==typeof a.listElem?document.getElementById(a.listElem):a.listElem,this.nodes=Array.prototype.slice.call(this.listElem.children),this.spacing=a.spacing||c,this.leftMargin=a.leftMargin||d,this.itemClassName=a.itemClassName;var b=Array.prototype.slice.call(this.listElem.getElementsByClassName(a.itemClassName));this.listElem.addEventListener("transitionend",this);var e=this.listElem.dataset.defaultItem;this.spatialNavigator=new SpatialNavigator(b),this.spatialNavigator.focus(b.length>e?b[e]:null),this.spatialNavigator.on("focus",this.handleSelection.bind(this)),this.spatialNavigator.on("unfocus",this.handleUnfocus.bind(this)),this._setNodesPosition(),this.setScale(a.scale||1),this.isSliding=!1,this.isHovering=!1,this.hoveringItem=null,this.hoveredItem=null,this._isRevesed=!1,a.referenceElement&&this.setReferenceElement(a.referenceElement)}var c=2,d=2,e=.5;b.prototype=evt({CLASS_NAME:"XScrollable",uninit:function(){this.listElem.removeEventListener("transitionend",this)},getItemRect:function(a){var b=this.frameElem.getBoundingClientRect(),c=this.getNodeFromItem(a),d=parseInt(c.dataset.idx,10),e=this._getTabstop(d),f={left:(b.left+(c.offsetWidth+10*this.spacing)*e)*this.scale+this.translateX,top:(b.top+a.offsetTop)*this.scale,width:a.offsetWidth*this.scale,height:a.offsetHeight*this.scale};return f},getBoundingClientRect:function(){return this.frameElem.getBoundingClientRect()},endSlide:function(){this.listElem.classList.add("no-transition"),this.forceReflow(this.listElem),this.listElem.classList.remove("no-transition"),this.listElem.style.transitionDuration=null,this.isHovering||(this._setOtherNodesPosition(this.newCardIndex),this.focus(this.newCardIndex)),this.fire("slideEnd"),this.isSliding=!1},_slide:function(a,b){this.isSliding=!0,this.newCardIndex=b;var c=this.listElem.style.transform,d=Math.abs(this._getScrollOffset(a)-this.translateX),e=960>d?.3:d/2e3;this.listElem.style.transitionDuration=e+"s",this.scrollTo(a),(!c||c===this.listElem.style.transform||this.refElem||"visible"!==document.visibilityState)&&this.endSlide()},scrollTo:function(a){return a?(this.translateX=this._getScrollOffset(a),void this._setScrollStyle()):this.translateX},resetScroll:function(){this.translateX=0,this.scrollTo(this.getItem(0))},_setScrollStyle:function(){this.listElem.style.transform="translateX("+this.translateX+"px) scale("+this.scale+")"},setScale:function(a){a=a?a:1,this.scale=a,this.translateX=0,this.scrollTo(this.currentItem)},setReferenceElement:function(a){if(this.refElem=a,!this.length||!this.refElem)return!1;var b;b="XScrollable"===this.refElem.CLASS_NAME?this.refElem.getItemRect(this.refElem.currentItem):this.refElem.getBoundingClientRect(),this._isReversed=b.left>this.frameElem.offsetWidth*e,this.listElem.classList.toggle("reversed",this._isReversed);var c=this.getItemFromNode(this.getNode(this._isReversed?this.length-1:0));this.spatialNavigator.focusSilently(c);var d=(c.offsetWidth+10*this.spacing)*this.scale;return this.refPoint=b.left+(b.width-c.offsetWidth*this.scale)/2,this.translateX=this._isReversed?this.refPoint-d*(this.length-1):this.refPoint,this._setScrollStyle(),!0},_getTabstop:function(a){if(this.isHovering){var b=this.getItemFromNode(this.nodes[a]);if(b===this.hoveringItem||b===this.hoveredItem){var c=this.getNodeFromItem(this.hoveringItem),d=this.getNodeFromItem(this.hoveredItem);return(parseInt(c.dataset.idx,10)+parseInt(d.dataset.idx,10))/2}}return a<this.currentIndex?a:a===this.currentIndex?a+this._colspanOnFocus/2:a+this._colspanOnFocus},_getScrollOffset:function(a){if(this.refElem)return this._getScrollOffsetByReferenceElement(a);var b=this.getNodeFromItem(a),c=parseInt(b.dataset.idx,10),d=this._getTabstop(c),e=this.length+this._colspanOnFocus,f=(b.offsetWidth+10*this.spacing)*this.scale,g=this.frameElem.offsetWidth;return f*e+10*this.leftMargin<g?-(f*e-10*this.spacing-g)/2:f*d<10*this.leftMargin-this.translateX?0!==d?-f*(d-.5):10*this.leftMargin:f*(d+1)>g-this.translateX?g-f*(d+1.5):this.translateX},_getScrollOffsetByReferenceElement:function(a){var b=this.getNodeFromItem(a),c=parseInt(b.dataset.idx,10),d=this._getTabstop(c),e=(b.offsetWidth+10*this.spacing)*this.scale,f=this.frameElem.offsetWidth,g=Math.floor(this.refPoint/e),h=Math.floor((f-this.refPoint)/e);return e*d<10*this.leftMargin-this.translateX?this.refPoint-(g+d)*e:e*(d+1)>f-this.translateX?this.refPoint-(d-h+1)*e:this.translateX},getNodeFromItem:function(a){if(!a)return null;for(var b=a;b.parentElement!==this.listElem;)b=b.parentElement;return b},getItem:function(a){var b;return a<this.nodes.length&&(b=this.nodes[a]),b},getItemFromNode:function(a){return a?a.classList.contains(this.itemClassName)?a:a.getElementsByClassName(this.itemClassName)[0]:null},getNextItem:function(a){return this.getItemFromNode(this._getNextNode(a))},getPrevItem:function(a){return this.getItemFromNode(this._getPrevNode(a))},_getNextNode:function(a){var b=this.getNodeFromItem(a),c=parseInt(b.dataset.idx,10)+1;return 0>c||c>=this.nodes.length?null:this.nodes[c]},_getPrevNode:function(a){var b=this.getNodeFromItem(a),c=parseInt(b.dataset.idx,10)-1;return 0>c||c>=this.nodes.length?null:this.nodes[c]},handleSelection:function(a){this.scrollTo(a),this.fire("focus",this,a,this.getNodeFromItem(a))},handleUnfocus:function(a){this.fire("unfocus",this,a,this.getNodeFromItem(a))},addNode:function(a){var b=this.getItemFromNode(a);return b?(this.nodes.push(a),this.spatialNavigator.add(b)&&this.listElem.appendChild(a)?(this._setNodePosition(this.nodes.length-1),!0):!1):!1},getNode:function(a){return this.nodes[a]},removeNode:function(a){"number"==typeof a&&(a=this.nodes[a]);var b=this.getItemFromNode(a);if(!b)return!1;var c=this.spatialNavigator.getFocusedElement(),d=c==b?this.getNextItem(c)||this.getPrevItem(c):c;return this.spatialNavigator.remove(b),this.listElem.removeChild(a),this.nodes.splice(parseInt(a.dataset.idx,10),1),this._setNodesPosition(),this.spatialNavigator.focus(d),!0},removeNodes:function(a){var b,c=this.nodes.indexOf(this.getNodeFromItem(this.currentItem)),d=Number.MAX_VALUE,e=this.nodes.filter(function(e,f){if(-1!==a.indexOf(f)){var g=this.getItemFromNode(e);return this.spatialNavigator.remove(g),this.listElem.removeChild(e),!1}var h=Math.abs(c-f);return d>h&&(d=h,b=f),!0},this),f=this.getItemFromNode(this.nodes[b]),g=this.isHovering&&1===a.length&&this.hoveringItem===this.getItemFromNode(this.nodes[a[0]]);if(this.nodes=e,!this.isHovering&&f)this._setNodesPosition(),this.spatialNavigator.focus(f);else if(g){var h=this.hoveringItem,i=this.hoveredItem;this._colspanOnFocus=1,this.spatialNavigator.focusSilently(this.hoveredItem),this.unhoverSilently(),this._setNodesPosition(),this.fire("hovering-node-removed",h,i)}},insertNodeBefore:function(a,b){"number"==typeof b&&(b=this.nodes[b]);var c=this.getItemFromNode(a);if(!c)return!1;var d=b?parseInt(b.dataset.idx,10):this.nodes.length;return this.nodes.splice(d,0,a),this.listElem.appendChild(a),this._setNodePosition(d),this.spatialNavigator.add(c),this.refElem&&(this.realignToReferenceElement(),this._shiftNodesPosition(1,d)),this._slide(this.getItemFromNode(a),d),!0},insertNodeOver:function(a,b){"number"==typeof b&&(b=this.nodes[b]);var c=this.getItemFromNode(a);if(!c)return!1;this._colspanOnFocus=0;var d=parseInt(b.dataset.idx,10);return this.nodes.splice(d,0,a),this.listElem.appendChild(a),this._setNodesPosition(),this.spatialNavigator.add(c),this.hover(c,this.getItemFromNode(b)),this.focus(d),this._slide(this.getItemFromNode(b),d+1),this.fire("node-inserted-over-folder"),!0},get currentItem(){return this.spatialNavigator.getFocusedElement()},get currentIndex(){return this.nodes.indexOf(this.getNodeFromItem(this.spatialNavigator.getFocusedElement()))},get length(){return this.nodes.length},get isReversed(){return this._isReversed},get allItems(){var a=this,b=[];return this.nodes.forEach(function(c){var d=a.getItemFromNode(c);d&&b.push(d)}),b},_setOtherNodesPosition:function(a){this.nodes.forEach(function(b,c){c!=a&&this._setNodePosition(c)},this)},_setNodesIdx:function(){this.nodes.forEach(function(a,b){this.nodes[b].dataset.idx=b},this)},_setNodesPosition:function(){this.nodes.forEach(function(a,b){this._setNodePosition(b)},this)},_setNodePosition:function(a){this.nodes[a].dataset.idx=a;var b=this._getTabstop(a);this.getNodeFromItem(this.nodes[a]).style.transform="translateX(calc((100% + "+this.spacing+"rem) * "+b+"))"},_shiftNodesPosition:function(a,b){this.nodes.forEach(function(c,d){if(d!==b){c.style.transitionProperty="none";var e=this._getTabstop(d)+a;this.getNodeFromItem(c).style.transform="translateX(calc((100% + "+this.spacing+"rem) * "+e+"))"}}.bind(this)),this.forceReflow(this.nodes[0]),this.nodes.forEach(function(a){a.style.transitionProperty=""})},swap:function(a,b){if("number"==typeof a&&(a=this.nodes[a]),"number"==typeof b&&(b=this.nodes[b]),!a||!b)return!1;var c=parseInt(a.dataset.idx,10),d=parseInt(b.dataset.idx,10);return this.nodes[c]=b,this.nodes[d]=a,this._setNodePosition(c),this._setNodePosition(d),this.focus(),!0},hover:function(a,b){var c=this.getNodeFromItem(a),d=this.getNodeFromItem(b);if(!c||!d)return!1;var e=parseInt(c.dataset.idx,10),f=parseInt(d.dataset.idx,10);return this.isHovering=!0,this.hoveringItem=a,this.hoveredItem=b,a.classList.add("hover"),b.classList.add("hovered"),c.classList.add("hover"),d.classList.add("hovered"),this._setNodePosition(e),this._setNodePosition(f),this.fire("hover",this),!0},unhover:function(a){var b=this.getNodeFromItem(this.hoveringItem),c=this.getNodeFromItem(this.hoveredItem);this.fire("unhover",this),this.isHovering=!1,a&&this._setNodesPosition(),this.hoveringItem.classList.remove("hover"),this.hoveredItem.classList.remove("hovered"),b.classList.remove("hover"),c.classList.remove("hovered"),this.hoveringItem=null,this.hoveredItem=null},unhoverSilently:function(){var a=this.getNodeFromItem(this.hoveredItem);this.isHovering=!1,this.hoveredItem.classList.remove("hovered"),a.classList.remove("hovered"),this.hoveringItem=null,this.hoveredItem=null},getTargetItem:function(a){return"left"===a?this.getPrevItem(this.currentItem):"right"===a?this.getNextItem(this.currentItem):void 0},focus:function(a){"number"==typeof a?a=this.getItemFromNode(this.nodes[a]):"undefined"==typeof a&&(a=this.currentItem||0),this.spatialNavigator.focus(a)},move:function(a){return this.spatialNavigator.move(a)},clean:function(){this.spatialNavigator.setCollection(),this.spatialNavigator.unfocus(),this.listElem.innerHTML="",this.nodes.length=0},isEmpty:function(){return!this.nodes.length},handleEvent:function(a){"transitionend"===a.type&&(a.target===this.listElem&&"transform"===a.propertyName?(this.isSliding&&this.endSlide(),this.fire("listTransformEnd",this.listElem)):a.target.classList.contains("card")&&"transform"===a.propertyName&&this.fire("nodeTransformEnd",a.target))},setColspanOnFocus:function(a){this._colspanOnFocus=a,this._setNodesPosition(),this.scrollTo(this.currentItem)},realignToReferenceElement:function(){this.refElem&&this.setReferenceElement(this.refElem)},forceReflow:function(a){getComputedStyle(a).width}}),a.XScrollable=b}(window),function(a){function b(a,b){if(this._focus=null,this._previous=null,this.setCollection(a),b)for(var c in b)this[c]=b[c]}b.prototype=evt({straightOnly:!1,straightOverlapThreshold:.5,ignoreHiddenElement:!1,rememberSource:!1,navigableFilter:null,_getRect:function(a){var b=null;if(!this._isNavigable(a))return null;if(a.getBoundingClientRect){var c=a.getBoundingClientRect();b={left:c.left,top:c.top,width:c.width,height:c.height}}else{if(void 0===a.left)return null;b={left:parseInt(a.left||0,10),top:parseInt(a.top||0,10),width:parseInt(a.width||0,10),height:parseInt(a.height||0,10)}}return b.element=a,b.right=b.left+b.width,b.bottom=b.top+b.height,b.center={x:b.left+Math.floor(b.width/2),y:b.top+Math.floor(b.height/2)},b.center.left=b.center.right=b.center.x,b.center.top=b.center.bottom=b.center.y,b},_getAllRects:function(a){var b=[];return this._collection.forEach(function(c){if(!a||a!==c){var d=this._getRect(c);d&&b.push(d)}},this),b},_isNavigable:function(a){if(this.ignoreHiddenElement&&a instanceof HTMLElement){var b=window.getComputedStyle(a);if(a.offsetWidth<=0&&a.offsetHeight<=0||"hidden"==b.getPropertyValue("visibility")||"none"==b.getPropertyValue("display")||a.hasAttribute("aria-hidden"))return!1}return this.navigableFilter&&!this.navigableFilter(a)?!1:!0},_partition:function(a,b){var c=[[],[],[],[],[],[],[],[],[]],d=this.straightOverlapThreshold;return(d>1||0>d)&&(d=.5),a.forEach(function(a){var e,f,g,h=a.center;e=h.x<b.left?0:h.x<=b.right?1:2,f=h.y<b.top?0:h.y<=b.bottom?1:2,g=3*f+e,c[g].push(a),-1!==[0,2,6,8].indexOf(g)&&(a.left<=b.right-b.width*d&&(2===g?c[1].push(a):8===g&&c[7].push(a)),a.right>=b.left+b.width*d&&(0===g?c[1].push(a):6===g&&c[7].push(a)),a.top<=b.bottom-b.height*d&&(6===g?c[3].push(a):8===g&&c[5].push(a)),a.bottom>=b.top+b.height*d&&(0===g?c[3].push(a):2===g&&c[5].push(a)))}),c},_getDistanceFunction:function(a){return{nearPlumbLineIsBetter:function(b){var c;return c=b.center.x<a.center.x?a.center.x-b.right:b.left-a.center.x,0>c?0:c},nearHorizonIsBetter:function(b){var c;return c=b.center.y<a.center.y?a.center.y-b.bottom:b.top-a.center.y,0>c?0:c},nearTargetLeftIsBetter:function(b){var c;return c=b.center.x<a.center.x?a.left-b.right:b.left-a.left,0>c?0:c},nearTargetTopIsBetter:function(b){var c;return c=b.center.y<a.center.y?a.top-b.bottom:b.top-a.top,0>c?0:c},topIsBetter:function(a){return a.top},bottomIsBetter:function(a){return-1*a.bottom},leftIsBetter:function(a){return a.left},rightIsBetter:function(a){return-1*a.right}}},_prioritize:function(a,b,c){var d=a.find(function(a){return!!a.group.length});if(!d)return null;if(this.rememberSource&&this._previous&&b==this._previous.destination&&c==this._previous.reverse){var e=this._previous.source,f=d.group.find(function(a){return a.element==e});if(f)return f}return d.group.sort(function(a,b){return d.distance.reduce(function(c,d){return c||d(a)-d(b)},0)}),d.group[0]},setCollection:function(a){this.unfocus(),this._collection=[],a&&this.multiAdd(a)},add:function(a){var b=this._collection.indexOf(a);return b>=0?!1:(this._collection.push(a),!0)},multiAdd:function(a){return Array.from(a).every(this.add,this)},remove:function(a){var b=this._collection.indexOf(a);return 0>b?!1:(this._focus===a&&this.unfocus(),this._collection.splice(b,1),!0)},multiRemove:function(a){return Array.from(a).every(this.remove,this)},focus:function(a){return!a&&this._focus&&this._isNavigable(this._focus)&&(a=this._focus),this.focusSilently(a)?(this.fire("focus",this._focus),!0):!1},focusSilently:function(a){if(!this._collection)return!1;if(a){if(this._collection.indexOf(a)<0||!this._isNavigable(a))return!1}else{var b=this._collection.filter(this._isNavigable,this);if(!b.length)return!1;a=b[0]}return this.unfocus(),this._focus=a,!0},unfocus:function(){if(this._focus){var a=this._focus;this._focus=null,this.fire("unfocus",a)}return!0},getFocusedElement:function(){return this._focus},move:function(a){var b={left:"right",up:"down",right:"left",down:"up"};if(this._focus){var c=this.navigate(this._focus,a);if(!c)return!1;this.rememberSource&&(this._previous={source:this._focus,destination:c,reverse:b[a.toLowerCase()]}),this.unfocus(),this.focus(c)}else this._previous=null,this.focus();return!0},navigate:function(a,b){if(!a||!b||!this._collection)return null;b=b.toLowerCase();var c=this._getAllRects(a),d=this._getRect(a);if(!d||!c.length)return null;var e,f=this._getDistanceFunction(d),g=this._partition(c,d),h=this._partition(g[4],d.center);switch(b){case"left":e=[{group:h[0].concat(h[3]).concat(h[6]),distance:[f.nearPlumbLineIsBetter,f.topIsBetter]},{group:g[3],distance:[f.nearPlumbLineIsBetter,f.topIsBetter]},{group:g[0].concat(g[6]),distance:[f.nearHorizonIsBetter,f.rightIsBetter,f.nearTargetTopIsBetter]}];break;case"right":e=[{group:h[2].concat(h[5]).concat(h[8]),distance:[f.nearPlumbLineIsBetter,f.topIsBetter]},{group:g[5],distance:[f.nearPlumbLineIsBetter,f.topIsBetter]},{group:g[2].concat(g[8]),distance:[f.nearHorizonIsBetter,f.leftIsBetter,f.nearTargetTopIsBetter]}];break;case"up":e=[{group:h[0].concat(h[1]).concat(h[2]),distance:[f.nearHorizonIsBetter,f.leftIsBetter]},{group:g[1],distance:[f.nearHorizonIsBetter,f.leftIsBetter]},{group:g[0].concat(g[2]),distance:[f.nearPlumbLineIsBetter,f.bottomIsBetter,f.nearTargetLeftIsBetter]}];break;case"down":e=[{group:h[6].concat(h[7]).concat(h[8]),distance:[f.nearHorizonIsBetter,f.leftIsBetter]},{group:g[7],distance:[f.nearHorizonIsBetter,f.leftIsBetter]},{group:g[6].concat(g[8]),distance:[f.nearPlumbLineIsBetter,f.topIsBetter,f.nearTargetLeftIsBetter]}];break;default:return null}this.straightOnly&&e.pop();var i=this._prioritize(e,a,b);return i?i.element:null}}),a.SpatialNavigator=b}(window),function(a){"use strict";function b(){}b.prototype=evt({KEY_EVENTS:Object.freeze(["keydown","keyup"]),MOZ_BROWSER_KEY_EVENTS:["mozbrowserbeforekeydown","mozbrowserbeforekeyup","mozbrowserafterkeydown","mozbrowserafterkeyup"],init:function(a,b){this._targetElement=a||window,b=b||{},this._evtNames=[].concat(this.KEY_EVENTS),b.useMozBrowserKeyEvents&&(this._evtNames=this._evtNames.concat(this.MOZ_BROWSER_KEY_EVENTS))},uninit:function(){},handleEvent:function(a){-1!==this._evtNames.indexOf(a.type)&&this.handleKeyEvent(this.convertKeyToString(a.keyCode),a.type)},handleKeyEvent:function(a,b){var c="keyup"===b?"-keyup":"",d=/mozbrowser(before|after)/.exec(b),e=d?d[1]+"-":"";switch(a){case"up":case"down":case"left":case"right":this.fire(e+"move"+c,a);break;case"enter":this.fire(e+"enter"+c);break;case"esc":this.fire(e+"esc"+c)}},convertKeyToString:function(a){switch(a){case KeyEvent.DOM_VK_UP:return"up";case KeyEvent.DOM_VK_RIGHT:return"right";case KeyEvent.DOM_VK_DOWN:return"down";case KeyEvent.DOM_VK_LEFT:return"left";case KeyEvent.DOM_VK_RETURN:return"enter";case KeyEvent.DOM_VK_ESCAPE:return"esc";case KeyEvent.DOM_VK_BACK_SPACE:return"esc";default:return null}}}),a.KeyNavigationAdapter=b}(window),function(a){var b=function(){};b.prototype=evt({_channels:void 0,init:function(a){var b=this;this._channels=a,this._channels.forEach(function(a){window.addEventListener(a,b)})},uninit:function(){var a=this;this._channels.forEach(function(b){window.removeEventListener(b,a)})},handleEvent:function(a){var b=a.detail;b&&b.type&&this.fire(b.type,b.data)}}),a.ConnectionManager=b}(window);