import{i as E,h as F,s as N,m as o,r as d,l as w,_ as S,z as I,j as l,n as L,o as D,w as x,O as Z,C as tt,Q as et,E as st,U as B,t as ot}from"./index-DjrlQ2F5.js";function at(t){return F("MuiListItem",t)}const b=E("MuiListItem",["root","container","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","padding","button","secondaryAction","selected"]);function nt(t){return F("MuiListItemSecondaryAction",t)}E("MuiListItemSecondaryAction",["root","disableGutters"]);const it=["className"],rt=t=>{const{disableGutters:e,classes:s}=t;return D({root:["root",e&&"disableGutters"]},nt,s)},ct=N("div",{name:"MuiListItemSecondaryAction",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:s}=t;return[e.root,s.disableGutters&&e.disableGutters]}})(({ownerState:t})=>o({position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"},t.disableGutters&&{right:0})),z=d.forwardRef(function(e,s){const a=w({props:e,name:"MuiListItemSecondaryAction"}),{className:n}=a,i=S(a,it),p=d.useContext(I),u=o({},a,{disableGutters:p.disableGutters}),g=rt(u);return l.jsx(ct,o({className:L(g.root,n),ownerState:u,ref:s},i))});z.muiName="ListItemSecondaryAction";const lt=["className"],dt=["alignItems","autoFocus","button","children","className","component","components","componentsProps","ContainerComponent","ContainerProps","dense","disabled","disableGutters","disablePadding","divider","focusVisibleClassName","secondaryAction","selected","slotProps","slots"],pt=(t,e)=>{const{ownerState:s}=t;return[e.root,s.dense&&e.dense,s.alignItems==="flex-start"&&e.alignItemsFlexStart,s.divider&&e.divider,!s.disableGutters&&e.gutters,!s.disablePadding&&e.padding,s.button&&e.button,s.hasSecondaryAction&&e.secondaryAction]},ut=t=>{const{alignItems:e,button:s,classes:a,dense:n,disabled:i,disableGutters:p,disablePadding:u,divider:g,hasSecondaryAction:f,selected:A}=t;return D({root:["root",n&&"dense",!p&&"gutters",!u&&"padding",g&&"divider",i&&"disabled",s&&"button",e==="flex-start"&&"alignItemsFlexStart",f&&"secondaryAction",A&&"selected"],container:["container"]},at,a)},mt=N("div",{name:"MuiListItem",slot:"Root",overridesResolver:pt})(({theme:t,ownerState:e})=>o({display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left"},!e.disablePadding&&o({paddingTop:8,paddingBottom:8},e.dense&&{paddingTop:4,paddingBottom:4},!e.disableGutters&&{paddingLeft:16,paddingRight:16},!!e.secondaryAction&&{paddingRight:48}),!!e.secondaryAction&&{[`& > .${Z.root}`]:{paddingRight:48}},{[`&.${b.focusVisible}`]:{backgroundColor:(t.vars||t).palette.action.focus},[`&.${b.selected}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:x(t.palette.primary.main,t.palette.action.selectedOpacity),[`&.${b.focusVisible}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.focusOpacity}))`:x(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)}},[`&.${b.disabled}`]:{opacity:(t.vars||t).palette.action.disabledOpacity}},e.alignItems==="flex-start"&&{alignItems:"flex-start"},e.divider&&{borderBottom:`1px solid ${(t.vars||t).palette.divider}`,backgroundClip:"padding-box"},e.button&&{transition:t.transitions.create("background-color",{duration:t.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(t.vars||t).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${b.selected}:hover`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.hoverOpacity}))`:x(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:x(t.palette.primary.main,t.palette.action.selectedOpacity)}}},e.hasSecondaryAction&&{paddingRight:48})),bt=N("li",{name:"MuiListItem",slot:"Container",overridesResolver:(t,e)=>e.container})({position:"relative"}),ft=d.forwardRef(function(e,s){const a=w({props:e,name:"MuiListItem"}),{alignItems:n="center",autoFocus:i=!1,button:p=!1,children:u,className:g,component:f,components:A={},componentsProps:O={},ContainerComponent:G="li",ContainerProps:{className:T}={},dense:j=!1,disabled:M=!1,disableGutters:P=!1,disablePadding:H=!1,divider:Q=!1,focusVisibleClassName:W,secondaryAction:h,selected:Y=!1,slotProps:q={},slots:J={}}=a,K=S(a.ContainerProps,lt),X=S(a,dt),k=d.useContext(I),R=d.useMemo(()=>({dense:j||k.dense||!1,alignItems:n,disableGutters:P}),[n,k.dense,j,P]),$=d.useRef(null);tt(()=>{i&&$.current&&$.current.focus()},[i]);const m=d.Children.toArray(u),U=m.length&&et(m[m.length-1],["ListItemSecondaryAction"]),C=o({},a,{alignItems:n,autoFocus:i,button:p,dense:R.dense,disabled:M,disableGutters:P,disablePadding:H,divider:Q,hasSecondaryAction:U,selected:Y}),V=ut(C),_=st($,s),y=J.root||A.Root||mt,v=q.root||O.root||{},r=o({className:L(V.root,v.className,g),disabled:M},X);let c=f||"li";return p&&(r.component=f||"div",r.focusVisibleClassName=L(b.focusVisible,W),c=ot),U?(c=!r.component&&!f?"div":c,G==="li"&&(c==="li"?c="div":r.component==="li"&&(r.component="div")),l.jsx(I.Provider,{value:R,children:l.jsxs(bt,o({as:G,className:L(V.container,T),ref:_,ownerState:C},K,{children:[l.jsx(y,o({},v,!B(y)&&{as:c,ownerState:o({},C,v.ownerState)},r,{children:m})),m.pop()]}))})):l.jsx(I.Provider,{value:R,children:l.jsxs(y,o({},v,{as:c,ref:_},!B(y)&&{ownerState:o({},C,v.ownerState)},r,{children:[m,h&&l.jsx(z,{children:h})]}))})});export{ft as L};
