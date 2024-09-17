import{r as s,u as je,j as e,T as n,B as S,I as D,P as Ce,D as fe,L as be,a as $}from"./index-DjrlQ2F5.js";import{u as ve,T as l}from"./useAuth-DvVyDevX.js";import{C as ye,S as R,A as J}from"./Snackbar-CFecR7nN.js";import{M as Se}from"./Menu-DE4PzJr1.js";import{T as De}from"./TableContainer-BbKF_kkm.js";import{T as we,a as Te,b as X,c as o,d as Ee,E as We,D as ke,e as q,f as K,g as Q,h as V}from"./Edit-D7WWWgqQ.js";import{B as c}from"./OutlinedInput-DsoeenSI.js";import{M as Ne}from"./MenuItem-CowiRKKG.js";import{L as Y}from"./ListItem-BrNapC6M.js";const ze=()=>{const[d,h]=s.useState([]),[Z,ee]=s.useState([]),[w,r]=s.useState(""),[T,u]=s.useState(""),[te,E]=s.useState(!1),[se,W]=s.useState(!1),[i,k]=s.useState(null),[N,A]=s.useState(null),[U,L]=s.useState(1),[P,Ae]=s.useState(20),[ae,ne]=s.useState(!0),[m,B]=s.useState(""),[x,I]=s.useState(""),[p,M]=s.useState(""),[g,O]=s.useState(""),[j,_]=s.useState(""),[C,G]=s.useState(""),[z,oe]=s.useState(!1),[f,le]=s.useState(""),F=je(),{isAuthenticated:b,loading:re}=ve();s.useEffect(()=>{b&&(ie(),ce())},[b,U,f]);const ie=async()=>{try{const t=await fetch(`https://ekarigar-accounts.onrender.com/clients?page=${U}&limit=${P}&search=${encodeURIComponent(f)}`);if(!t.ok)throw new Error("Failed to fetch clients");const a=await t.json();ne(a.length===P),h(ge=>[...ge,...a])}catch(t){r(t.message)}},ce=async()=>{try{const t=await fetch("https://ekarigar-accounts.onrender.com/clientcategories");if(!t.ok)throw new Error("Failed to fetch categories");const a=await t.json();ee(a)}catch(t){r(t.message)}},de=t=>{A(t),B(t.clientName),I(t.clientAddress),M(t.clientPhone),O(t.clientGst),_(t.clientEmail),G(t.clientCat),W(!0)},he=t=>{k(t),E(!0)},v=()=>{E(!1),k(null)},y=()=>{W(!1),A(null)},ue=async()=>{try{if(!(await fetch(`https://ekarigar-accounts.onrender.com/clients/${i._id}`,{method:"DELETE"})).ok)throw new Error("Failed to delete client");u("Client deleted successfully"),h(d.filter(a=>a._id!==i._id)),v()}catch(t){console.error(t),r(t.message)}},me=async()=>{try{if(!(await fetch(`https://ekarigar-accounts.onrender.com/clients/${N._id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({clientName:m,clientAddress:x,clientPhone:p,clientGst:g,clientEmail:j,clientCat:C})})).ok)throw new Error("Failed to update client");u("Client updated successfully"),h(d.map(a=>a._id===N._id?{...a,clientName:m,clientAddress:x,clientPhone:p,clientGst:g,clientEmail:j,clientCat:C}:a)),y()}catch(t){console.error(t),r(t.message)}},xe=()=>{L(t=>t+1)},pe=t=>{le(t.target.value),L(1),h([])},H=()=>{oe(!z)};return re?e.jsx("div",{children:"Loading..."}):b?e.jsxs(ye,{maxWidth:"md",children:[e.jsx(n,{variant:"h4",gutterBottom:!0,children:"Client List"}),e.jsxs(n,{variant:"h6",gutterBottom:!0,children:["Total Clients As per page: ",d.length]}),e.jsx(S,{mb:2,children:e.jsx(l,{label:"Search Clients Name",variant:"outlined",fullWidth:!0,value:f,onChange:pe})}),e.jsx(D,{edge:"start",color:"inherit","aria-label":"menu",onClick:H,sx:{display:{xs:"block",sm:"none"}},children:e.jsx(Se,{})}),e.jsx(De,{component:Ce,sx:{maxWidth:"100%",overflowX:"auto"},children:e.jsxs(we,{children:[e.jsx(Te,{children:e.jsxs(X,{children:[e.jsx(o,{children:e.jsx(n,{variant:"h6",sx:{fontWeight:"bold"},children:"Sr. No."})}),e.jsx(o,{children:e.jsx(n,{variant:"h6",sx:{fontWeight:"bold"},children:"Client Name"})}),e.jsx(o,{children:e.jsx(n,{variant:"h6",sx:{fontWeight:"bold"},children:"Mobile Number"})}),e.jsx(o,{children:e.jsx(n,{variant:"h6",sx:{fontWeight:"bold"},children:"Email"})}),e.jsx(o,{align:"right",children:e.jsx(n,{variant:"h6",sx:{fontWeight:"bold"},children:"Actions"})})]})}),e.jsx(Ee,{children:d.map((t,a)=>e.jsxs(X,{children:[e.jsx(o,{children:e.jsx(n,{variant:"body1",sx:{fontWeight:"bold"},children:a+1})}),e.jsx(o,{children:e.jsx(n,{variant:"body1",sx:{fontWeight:"bold"},children:t.clientName})}),e.jsx(o,{children:e.jsx(n,{variant:"body1",sx:{fontWeight:"bold"},children:t.clientPhone})}),e.jsx(o,{children:e.jsx(n,{variant:"body1",sx:{fontWeight:"bold"},children:t.clientEmail})}),e.jsx(o,{align:"right",children:e.jsxs(S,{sx:{display:"flex",gap:1},children:[e.jsx(D,{color:"primary",onClick:()=>de(t),children:e.jsx(We,{})}),e.jsx(D,{color:"secondary",onClick:()=>he(t),children:e.jsx(ke,{})})]})})]},t._id))})]})}),ae&&e.jsx(S,{textAlign:"right",mt:2,children:e.jsx(c,{variant:"outlined",color:"primary",size:"small",onClick:xe,sx:{transition:"all 0.3s ease","&:hover":{backgroundColor:"#003d99",color:"white",transform:"scale(1.05)",boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.2)"}},children:"Load More"})}),e.jsxs(q,{open:te,onClose:v,children:[e.jsx(K,{children:"Delete Client"}),e.jsxs(Q,{children:["Are you sure you want to delete ",i==null?void 0:i.clientName,"?"]}),e.jsxs(V,{children:[e.jsx(c,{onClick:v,children:"Cancel"}),e.jsx(c,{color:"secondary",onClick:ue,children:"Delete"})]})]}),e.jsxs(q,{open:se,onClose:y,children:[e.jsx(K,{children:"Update Client"}),e.jsxs(Q,{children:[e.jsx(l,{label:"Client Name",fullWidth:!0,margin:"normal",value:m,onChange:t=>B(t.target.value)}),e.jsx(l,{label:"Address",fullWidth:!0,margin:"normal",value:x,onChange:t=>I(t.target.value)}),e.jsx(l,{label:"Phone",fullWidth:!0,margin:"normal",value:p,onChange:t=>M(t.target.value)}),e.jsx(l,{label:"GST Number",fullWidth:!0,margin:"normal",value:g,onChange:t=>O(t.target.value)}),e.jsx(l,{label:"Email",fullWidth:!0,margin:"normal",value:j,onChange:t=>_(t.target.value)}),e.jsx(l,{label:"Category",select:!0,fullWidth:!0,margin:"normal",value:C,onChange:t=>G(t.target.value),children:Z.map(t=>e.jsx(Ne,{value:t.ccID,children:t.ccName},t.ccID))})]}),e.jsxs(V,{children:[e.jsx(c,{onClick:y,children:"Cancel"}),e.jsx(c,{color:"primary",onClick:me,children:"Update"})]})]}),e.jsx(R,{open:!!w,autoHideDuration:6e3,onClose:()=>r(""),children:e.jsx(J,{onClose:()=>r(""),severity:"error",children:w})}),e.jsx(R,{open:!!T,autoHideDuration:6e3,onClose:()=>u(""),children:e.jsx(J,{onClose:()=>u(""),severity:"success",children:T})}),e.jsx(fe,{anchor:"left",open:z,onClose:H,children:e.jsxs(be,{children:[e.jsx(Y,{button:!0,onClick:()=>F("/home"),children:e.jsx($,{primary:"Home"})}),e.jsx(Y,{button:!0,onClick:()=>F("/clients"),children:e.jsx($,{primary:"Clients"})})]})})]}):null};export{ze as default};