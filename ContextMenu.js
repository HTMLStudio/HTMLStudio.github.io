window.ContextMenu=function e(t){this.getItem=function(e){for(var t=this.node.children,i=t.length-1;i>=0;i--)if(t[i].id==this.id+"-item-"+(e||0))return t[i]},this.node=document.createElement("ul"),this.node.root=this.node,this.id=this.node.id="context-"+(new Date).getTime().toString(36),this.node.className="contextmenu",this.node.style.listStyle="none",this.node.style.display="inline-block",this.node.style.position="absolute",this.node.style.left=this.node.style.top="0",this.node.style.zIndex=9999996;for(var i=t.items.length-1;i>=0;i--)(function(){var s=document.createElement("li"),n=document.createElement("div"),l=document.createElement("span"),o=document.createElement("div"),d="pad"in t.items[i]&&!t.items[i].pad,a=t.items[i];s.className="contextmenuitem",s.id=this.id+"-item-"+i,s.root=this.node;var m=t.items[i].disabled,r=t.items[i].toggled||!1;if(Object.defineProperties(s,{disabled:{get:function(){return m},set:function(e){m=!!e,(s.children[1]||s.firstChild).style.color=e?"#AAA":"",s.title=a[e&&a.disabledtitle?"disabledtitle":"title"],e&&a.disabledimage&&s.children[0].className.includes("contextmenuitemimage")?s.children[0].style.backgroundImage='url("'+a.disabledimage+'")':a.image&&s.children[0].className.includes("contextmenuitemimage")&&(s.children[0].style.backgroundImage='url("'+a.image+'")')},enumerable:!0,configurable:!0},toggled:{get:function(){return r},set:function(e){r=!!e,a.toggle&&!d&&(s.firstChild.style.backgroundImage='url("'+(e?a.image||"":a.imageoff||a.image||"")+'")')}}}),s.func=t.items[i].func,d?s.style.width="calc(12rem + 1.7em)":(t.items[i].toggle?n.style.backgroundImage=t.items[i].toggled?'url("'+t.items[i].image||'")':'url("'+(t.items[i].imageoff||t.items[i].image||"")+'")':!t.items[i].image||t.items[i].disabled&&t.items[i].disabledimage?t.items[i].disabledimage&&t.items[i].disabled&&(n.style.backgroundImage='url("'+t.items[i].disabledimage+'")'):n.style.backgroundImage='url("'+t.items[i].image+'")',n.className="contextmenuitemimage",n.style.width="1.4em",n.style.height="1.4em",n.style.backgroundSize="100% 100%",n.style.display="inline-block",n.style.position="absolute",n.style.left=".3em",n.style.top="0em",n.style.pointerEvents="none",n.root=this.node,s.style.paddingLeft="2.1em",s.appendChild(n)),o.style.width="auto",o.style.textOverflow="ellipsis",o.style.overflowX="hidden",o.style.pointerEvents="none",o.root=this.node,o.className="contextmenuitemtextcontainer",m&&(o.style.color="#AAA"),s.appendChild(o),l.className="contextmenuitemtext",l.innerHTML=t.items[i].name||" ",l.style.pointerEvents="none",l.style.MozUserSelect="-moz-none",l.style.WebkitUserSelect="none",l.style.MsUserSelect="none",l.style.userSelect="none",l.root=this.node,o.appendChild(l),!t.items[i].title||m&&t.items[i].disabledtitle?t.items[i].disabledtitle&&m&&(s.title=t.items[i].disabledtitle):s.title=t.items[i].title,t.items[i].func&&s.addEventListener("click",function(e){m||s.func.call(this,e,function(){s.style.background="#F5F5F5",s.root.parentNode&&s.root.parentNode.removeChild(s.root)})}),s.addEventListener("mouseenter",function(){if(this.style.backgroundColor=m?"#E5E5E5":"#B2EBF2",this.style.whiteSpace="pre-line",this.style.height="",a.subcontext){var t=new e(a.subcontext),i=s.getBoundingClientRect();t.node.parent=s,t.node.className+=" subcontextmenu",t.node.style.top=em(-.2)-1+"px",t.node.style.left=i.width+"px",t.node.style.position="absolute",this.appendChild(t.node)}}),s.addEventListener("mouseleave",function(e){if(this.style.backgroundColor="",this.style.whiteSpace="nowrap",this.style.height="1.4em",a.subcontext)for(var t=this.children.length-1;t>=0;t--)this.children[t].className.includes("subcontextmenu")&&this.removeChild(this.children[t])}),s.addEventListener("mousedown",function(){this.style.backgroundColor=m?"#E5E5E5":"#A0D3D9"}),s.addEventListener("mouseup",function(){this.style.backgroundColor=m?"#E5E5E5":"#B2EBF2"}),s.style.padding=s.style.paddingLeft?".05em .4em .05em 2.1em":".05em .4em",s.style.paddingTop=".075em",s.style.paddingBottom=".025em",s.style.paddingRight=".4em",s.style.paddingLeft=s.style.paddingLeft||".4em",s.style.width=s.style.width||"12rem",s.style.height=s.style.minHeight="1.4em",s.style.textOverflow="ellipsis",s.style.whiteSpace="nowrap",s.style.position="relative",t.items[i].separate){s.style.marginBottom="calc(.2em + 1px)";var c=document.createElement("div");c.className="contextmenuitemseparator",c.style.width="calc(12rem + 1.7em)",c.style.height="1px",c.style.backgroundColor="#C5C5C5",c.style.position="relative",c.style.top="-.15em",c.style.left=".4em",this.node.insertBefore(c,this.node.firstChild)}if(t.css)for(var h in t.css)s.style[h]=t.css[h];if(t.items[i].css)for(var h in t.items[i].css)s.style[h]=t.items[i].css[h];this.node.insertBefore(s,this.node.firstChild)}).call(this)};
