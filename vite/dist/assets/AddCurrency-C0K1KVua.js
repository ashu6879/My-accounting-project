import{V as o,r as n,u as E,j as e,T as p,G as v,F as L}from"./index-DjrlQ2F5.js";import{u as N,T as g,S as R}from"./useAuth-DvVyDevX.js";import{L as T}from"./LoadingButton-CeD71zW5.js";import{C as z,S as x,A as C}from"./Snackbar-CFecR7nN.js";import{I as F}from"./OutlinedInput-DsoeenSI.js";import{M as W}from"./MenuItem-CowiRKKG.js";import"./CircularProgress-BMgE6Vjs.js";var B=o("currency-dollar","IconCurrencyDollar",[["path",{d:"M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2",key:"svg-0"}],["path",{d:"M12 3v3m0 12v3",key:"svg-1"}]]),G=o("currency-euro","IconCurrencyEuro",[["path",{d:"M17.2 7a6 7 0 1 0 0 10",key:"svg-0"}],["path",{d:"M13 10h-8m0 4h8",key:"svg-1"}]]),H=o("currency-rupee","IconCurrencyRupee",[["path",{d:"M18 5h-11h3a4 4 0 0 1 0 8h-3l6 6",key:"svg-0"}],["path",{d:"M7 9l11 0",key:"svg-1"}]]),O=o("search","IconSearch",[["path",{d:"M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0",key:"svg-0"}],["path",{d:"M21 21l-6 -6",key:"svg-1"}]]);const f=[{value:"USD",label:"Dollar",icon:e.jsx(B,{size:48})},{value:"EUR",label:"Euro",icon:e.jsx(G,{size:48})},{value:"INR",label:"Rupee",icon:e.jsx(H,{size:48})}],X=()=>{const[t,d]=n.useState({currencyName:"",currencySymbol:""}),[S,j]=n.useState(""),[h,b]=n.useState(f),[s,c]=n.useState(""),[l,u]=n.useState(""),[I,m]=n.useState(!1),{isAuthenticated:M,loading:k}=N(),D=E(),y=r=>{d({...t,[r.target.name]:r.target.value})},w=r=>{j(r);const a=f.filter(i=>i.label.toLowerCase().includes(r.toLowerCase()));b(a)},A=async r=>{r.preventDefault(),m(!0);try{const a=await fetch("http://ec2-13-234-31-37.ap-south-1.compute.amazonaws.com:8181/currencies",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!a.ok){const i=await a.text();throw new Error(i||"Failed to add currency")}u("Currency added successfully!"),d({currencyName:"",currencySymbol:""}),setTimeout(()=>{D("/ManageiconCurrency/edit")},2e3)}catch(a){c(a.message)}finally{m(!1)}};return k?e.jsx("div",{children:"Loading..."}):M?e.jsxs(z,{maxWidth:"sm",children:[e.jsx(p,{variant:"h4",gutterBottom:!0,children:"Add Currency"}),e.jsx(g,{placeholder:"Search currencies...",value:S,onChange:r=>w(r.target.value),InputProps:{endAdornment:e.jsx(O,{size:24})},fullWidth:!0,margin:"normal"}),e.jsx(v,{container:!0,spacing:2,justifyContent:"center",children:h.map(r=>e.jsxs(v,{item:!0,xs:6,sm:4,md:2,display:"flex",flexDirection:"column",alignItems:"center",children:[r.icon,e.jsx(p,{variant:"caption",children:r.label})]},r.value))}),e.jsxs("form",{onSubmit:A,children:[e.jsx(g,{label:"Currency Name",name:"currencyName",variant:"outlined",fullWidth:!0,value:t.currencyName,onChange:y,margin:"normal",required:!0}),e.jsxs(L,{fullWidth:!0,margin:"normal",required:!0,children:[e.jsx(F,{children:"Currency Symbol"}),e.jsx(R,{name:"currencySymbol",value:t.currencySymbol,onChange:y,label:"Currency Symbol",children:h.map(r=>e.jsx(W,{value:r.value,children:r.label},r.value))})]}),e.jsx(T,{type:"submit",variant:"contained",color:"primary",fullWidth:!0,loading:I,children:"Add Currency"})]}),l&&e.jsx(x,{open:!!l,autoHideDuration:6e3,onClose:()=>u(""),children:e.jsx(C,{onClose:()=>u(""),severity:"success",sx:{width:"100%"},children:l})}),s&&e.jsx(x,{open:!!s,autoHideDuration:6e3,onClose:()=>c(""),children:e.jsx(C,{onClose:()=>c(""),severity:"error",sx:{width:"100%"},children:s})})]}):null};export{X as default};
