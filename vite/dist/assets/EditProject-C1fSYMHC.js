import{r as a,u as Y,j as e,T as s,I as k,B as Z}from"./index-DjrlQ2F5.js";import{u as ee,T as N}from"./useAuth-DvVyDevX.js";import{C as te,S as U,A as W}from"./Snackbar-CFecR7nN.js";import{T as ae,a as oe,b as z,c as r,d as se,E as re,D as ne,e as A,f as B,g as _,h as L}from"./Edit-D7WWWgqQ.js";import{B as l}from"./OutlinedInput-DsoeenSI.js";import{D as O}from"./DialogContentText-qY3U4X4o.js";const ge=()=>{const[c,d]=a.useState([]),[j,n]=a.useState(""),[f,h]=a.useState(""),[F,C]=a.useState(!1),[P,y]=a.useState(!1),[i,S]=a.useState(null),[D,b]=a.useState(null),[u,v]=a.useState(""),[p,$]=a.useState(""),[T,w]=a.useState(1),[E,ie]=a.useState(20),[H,M]=a.useState(!0);Y();const{isAuthenticated:g,loading:I}=ee();a.useEffect(()=>{g&&R()},[T,g,p]);const R=async()=>{try{const t=await fetch(`https://ekarigar-accounts.onrender.com/projectcategories?page=${T}&limit=${E}&search=${encodeURIComponent(p)}`);if(!t.ok)throw new Error("Failed to fetch categories");const o=await t.json();M(o.length===E),d(X=>[...X,...o])}catch(t){n(t.message)}},J=t=>{$(t.target.value),w(1),d([])},q=t=>{b(t),v(t.pcName),y(!0)},G=t=>{S(t),C(!0)},m=()=>{C(!1),S(null)},x=()=>{y(!1),b(null)},K=async()=>{try{if(!(await fetch(`https://ekarigar-accounts.onrender.com/projectcategories/${i._id}`,{method:"DELETE"})).ok)throw new Error("Failed to delete category");h("Project Category deleted successfully"),d(c.filter(o=>o._id!==i._id)),m()}catch(t){n(t.message)}},Q=async()=>{try{if(!(await fetch(`https://ekarigar-accounts.onrender.com/projectcategories/${D._id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({pcName:u})})).ok)throw new Error("Failed to update category");h("Project Category updated successfully"),d(c.map(o=>o._id===D._id?{...o,pcName:u}:o)),x()}catch(t){n(t.message)}},V=()=>{w(t=>t+1)};return I?e.jsx("div",{children:"Loading..."}):g?e.jsxs(te,{maxWidth:"md",children:[e.jsx(s,{variant:"h4",gutterBottom:!0,children:"Project Categories"}),e.jsxs(s,{variant:"h6",gutterBottom:!0,children:["Total Categories As per page: ",c.length]}),e.jsx(N,{label:"Search projects",variant:"outlined",fullWidth:!0,margin:"normal",value:p,onChange:J,placeholder:"Search by category name"}),e.jsxs(ae,{children:[e.jsx(oe,{children:e.jsxs(z,{children:[e.jsx(r,{children:e.jsx(s,{variant:"h6",sx:{fontWeight:"bold",fontSize:"1.2rem"},children:"Sr. No."})}),e.jsx(r,{children:e.jsx(s,{variant:"h6",sx:{fontWeight:"bold",fontSize:"1.2rem"},children:"Category Name"})}),e.jsx(r,{align:"right",sx:{fontWeight:"bold",fontSize:"1.2rem"},children:"Actions"})]})}),e.jsx(se,{children:c.map((t,o)=>e.jsxs(z,{children:[e.jsx(r,{children:e.jsx(s,{variant:"body1",sx:{fontWeight:"bold",fontSize:"1rem"},children:o+1})}),e.jsx(r,{children:e.jsx(s,{variant:"body1",sx:{fontWeight:"bold",fontSize:"1rem"},children:t.pcName})}),e.jsxs(r,{align:"right",children:[e.jsx(k,{color:"primary",onClick:()=>q(t),children:e.jsx(re,{})}),e.jsx(k,{color:"secondary",onClick:()=>G(t),children:e.jsx(ne,{})})]})]},t._id))})]}),H&&e.jsx(Z,{textAlign:"right",mt:2,children:e.jsx(l,{variant:"outlined",color:"primary",size:"small",onClick:V,sx:{transition:"all 0.3s ease","&:hover":{backgroundColor:"#003d99",color:"white",transform:"scale(1.05)",boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.2)"}},children:"Load More"})}),e.jsxs(A,{open:F,onClose:m,children:[e.jsx(B,{children:"Delete Category"}),e.jsx(_,{children:e.jsxs(O,{children:['Are you sure you want to delete the category "',i==null?void 0:i.pcName,'"?']})}),e.jsxs(L,{children:[e.jsx(l,{onClick:m,color:"primary",children:"Cancel"}),e.jsx(l,{onClick:K,color:"secondary",children:"Delete"})]})]}),e.jsxs(A,{open:P,onClose:x,fullWidth:!0,maxWidth:"sm",children:[e.jsx(B,{children:"Update Category"}),e.jsxs(_,{children:[e.jsx(O,{children:"Update the category name:"}),e.jsx(N,{autoFocus:!0,margin:"dense",id:"name",label:"Category Name",type:"text",fullWidth:!0,variant:"outlined",value:u,onChange:t=>v(t.target.value)})]}),e.jsxs(L,{children:[e.jsx(l,{onClick:x,color:"primary",children:"Cancel"}),e.jsx(l,{onClick:Q,color:"secondary",children:"Update"})]})]}),e.jsx(U,{open:!!f,autoHideDuration:6e3,onClose:()=>h(""),children:e.jsx(W,{onClose:()=>h(""),severity:"success",children:f})}),e.jsx(U,{open:!!j,autoHideDuration:6e3,onClose:()=>n(""),children:e.jsx(W,{onClose:()=>n(""),severity:"error",children:j})})]}):null};export{ge as default};