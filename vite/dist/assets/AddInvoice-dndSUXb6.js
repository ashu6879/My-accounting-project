import{r as a,u as ie,j as e,T as c,G as s,F as f,B as D}from"./index-DjrlQ2F5.js";import{L as ae}from"./LoadingButton-CeD71zW5.js";import{d as ce}from"./Delete-BND5BdWY.js";import{u as oe,S as g,T as p}from"./useAuth-DvVyDevX.js";import{C as le,S as M,A as O}from"./Snackbar-CFecR7nN.js";import{I as C,B as w}from"./OutlinedInput-DsoeenSI.js";import{M as b}from"./MenuItem-CowiRKKG.js";import"./CircularProgress-BMgE6Vjs.js";const ye=()=>{const[S,G]=a.useState([]),[B,k]=a.useState([]),[P,x]=a.useState([{invID:1,itemDesc:"",itemQty:0,itemRate:0}]),[m,T]=a.useState(null),[d,E]=a.useState(null),[q,J]=a.useState([]),[l,j]=a.useState({clientID:"",projectID:"",currencyID:"",remarks:""}),[H,A]=a.useState(!1),[R,u]=a.useState(""),[W,v]=a.useState(""),{isAuthenticated:_,loading:$}=oe(),[F,N]=a.useState(""),K=ie(),U=async()=>{try{const r=await(await fetch("http://ec2-13-234-31-37.ap-south-1.compute.amazonaws.com:8181/clients")).json();G(r)}catch{u("Failed to fetch clients")}},z=async()=>{try{const r=await(await fetch("http://ec2-13-234-31-37.ap-south-1.compute.amazonaws.com:8181/currencies")).json();J(r)}catch{u("Failed to fetch currencies")}};a.useEffect(()=>{U(),z()},[]);const V=async t=>{const r=t.target.value,n=S.find(i=>i.clientID===r);if(n){T(n),j(i=>({...i,clientID:n.clientID}));try{const h=await(await fetch(`http://ec2-13-234-31-37.ap-south-1.compute.amazonaws.com:8181/getProjectByClientID/${r}`)).json();k(h)}catch{u("Failed to fetch projects for the selected client")}}},X=t=>{const r=t.target.value,n=B.find(i=>i.projectID===r);n&&(E(n),j(i=>({...i,projectID:n.projectID})))},Y=t=>{const{name:r,value:n}=t.target;j(i=>({...i,[r]:n}))},I=(t,r)=>{const{name:n,value:i}=r.target;x(h=>{const y=[...h];return y[t]={...y[t],[n]:i},y})},Z=async()=>{try{if(!(await fetch("http://ec2-13-234-31-37.ap-south-1.compute.amazonaws.com:8181/currencies",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({currency:F})})).ok)throw new Error("Failed to add currency");v("Currency added successfully"),N(""),await z()}catch(t){u(t.message)}},ee=()=>{x(t=>[...t,{invID:t.length+1,itemDesc:"",itemQty:0,itemRate:0}])},te=t=>{x(r=>r.filter((n,i)=>i!==t))},ne=async t=>{t.preventDefault(),A(!0);const r={clientID:l.clientID,projectID:l.projectID,currencyID:l.currencyID,remarks:l.remarks};try{const n=await fetch("http://ec2-13-234-31-37.ap-south-1.compute.amazonaws.com:8181/invoices",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!n.ok){const o=await n.text();throw new Error(o||"Failed to generate invoice")}const i=await fetch("http://ec2-13-234-31-37.ap-south-1.compute.amazonaws.com:8181/invoices");if(!i.ok){const o=await i.text();throw new Error(o||"Failed to fetch invoices")}const h=await i.json();if(h.length===0)throw new Error("No invoices found after creation");const Q=h[0].invID;if(!Q)throw new Error("Invoice ID is null or undefined");await Promise.all(P.map(async o=>{if(!o||!o.itemDesc||o.itemQty===void 0||o.itemRate===void 0)throw new Error("Invalid invoice item data");const L=await fetch("http://ec2-13-234-31-37.ap-south-1.compute.amazonaws.com:8181/invoiceItem",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...o,invID:Q})});if(!L.ok){const se=await L.text();throw new Error(se||"Failed to add invoice item")}})),v("Invoice generated successfully!"),j({clientID:"",projectID:"",currencyID:"",remarks:""}),x([{invID:1,itemDesc:"",itemQty:0,itemRate:0}]),k([]),T(null),E(null),setTimeout(()=>{K("/ManageInvoice/edit")},2e3)}catch(n){u(n.message)}finally{A(!1)}},re=t=>{const r=t.target.value;j(n=>({...n,currencyID:r}))};return $?e.jsx("div",{children:"Loading..."}):_?e.jsxs(le,{maxWidth:"md",children:[e.jsx(c,{variant:"h4",gutterBottom:!0,children:"Generate Invoice"}),e.jsx("form",{onSubmit:ne,children:e.jsxs(s,{container:!0,spacing:3,children:[e.jsx(s,{item:!0,xs:12,children:e.jsxs(s,{container:!0,spacing:3,children:[e.jsx(s,{item:!0,xs:12,sm:6,children:e.jsxs(f,{variant:"outlined",fullWidth:!0,required:!0,children:[e.jsx(C,{id:"client-label",children:"Select Client"}),e.jsx(g,{labelId:"client-label",id:"clientID",name:"clientID",value:l.clientID,onChange:V,label:"Select Client",children:S.map(t=>e.jsx(b,{value:t.clientID,children:t.clientName},t.clientID))})]})}),e.jsx(s,{item:!0,xs:12,sm:6,children:e.jsxs(f,{variant:"outlined",fullWidth:!0,required:!0,children:[e.jsx(C,{id:"project-label",children:"Select Project"}),e.jsx(g,{labelId:"project-label",id:"projectID",name:"projectID",value:l.projectID,onChange:X,label:"Select Project",disabled:!m,children:B.map(t=>e.jsx(b,{value:t.projectID,children:t.projectTitle},t.projectID))})]})})]})}),e.jsx(s,{item:!0,xs:12,children:e.jsxs(s,{container:!0,spacing:2,alignItems:"center",children:[e.jsx(s,{item:!0,xs:12,sm:8,children:e.jsxs(f,{variant:"outlined",fullWidth:!0,required:!0,children:[e.jsx(C,{id:"currency-label",children:"Select Currency"}),e.jsx(g,{labelId:"currency-label",id:"currency",name:"currency",value:l.currencyID,onChange:re,label:"Select Currency",children:q.map(t=>e.jsx(b,{value:t.currencyID,children:t.currency},t.currencyID))})]})}),e.jsxs(s,{item:!0,xs:12,sm:4,container:!0,spacing:2,alignItems:"center",children:[e.jsx(s,{item:!0,xs:8,children:e.jsx(p,{label:"Add New Currency",variant:"outlined",fullWidth:!0,value:F,onChange:t=>N(t.target.value)})}),e.jsx(s,{item:!0,xs:4,children:e.jsx(w,{variant:"contained",color:"primary",onClick:Z,fullWidth:!0,children:"Add"})})]})]})}),m&&e.jsxs(s,{item:!0,xs:12,sm:6,children:[e.jsx(c,{variant:"h6",gutterBottom:!0,children:"Client Details"}),e.jsxs(D,{mb:2,children:[e.jsxs(c,{variant:"subtitle1",children:["Client Name: ",m.clientName]}),e.jsxs(c,{variant:"subtitle1",children:["Client Email: ",m.clientEmail]}),e.jsxs(c,{variant:"subtitle1",children:["Client Address: ",m.clientAddress]})]})]}),d&&e.jsxs(s,{item:!0,xs:12,sm:6,children:[e.jsx(c,{variant:"h6",gutterBottom:!0,children:"Project Details"}),e.jsxs(D,{mb:2,children:[e.jsxs(c,{variant:"subtitle1",children:["Project Title: ",d.projectTitle]}),e.jsxs(c,{variant:"subtitle1",children:["Serviced By: ",d.ServicedBy]}),e.jsxs(c,{variant:"subtitle1",children:["Sale done By: ",d.SaledoneBy]}),e.jsxs(c,{variant:"subtitle1",children:["Approved By: ",d.ApprovedBy]}),e.jsxs(c,{variant:"subtitle1",children:["Progress By: ",d.ProgressBy]})]})]}),e.jsxs(s,{item:!0,xs:12,children:[e.jsx(c,{variant:"h6",gutterBottom:!0,children:"Invoice Items"}),e.jsx(w,{variant:"outlined",color:"primary",onClick:ee,children:"Add Item"}),P.map((t,r)=>e.jsx(D,{mt:2,children:e.jsxs(s,{container:!0,spacing:2,alignItems:"center",children:[e.jsx(s,{item:!0,xs:12,sm:4,children:e.jsx(p,{label:"Description",name:"itemDesc",variant:"outlined",fullWidth:!0,value:t.itemDesc,onChange:n=>I(r,n)})}),e.jsx(s,{item:!0,xs:12,sm:4,children:e.jsx(p,{type:"number",label:"Quantity",name:"itemQty",variant:"outlined",fullWidth:!0,value:t.itemQty,onChange:n=>I(r,n)})}),e.jsx(s,{item:!0,xs:12,sm:3,children:e.jsx(p,{type:"numeric",label:"Rate",name:"itemRate",variant:"outlined",fullWidth:!0,value:t.itemRate,onChange:n=>I(r,n)})}),e.jsx(s,{item:!0,xs:12,sm:1,children:e.jsx(w,{variant:"outlined",color:"secondary",onClick:()=>te(r),startIcon:e.jsx(ce,{})})})]})},r))]}),e.jsx(s,{item:!0,xs:12,children:e.jsx(p,{label:"Remarks",name:"remarks",variant:"outlined",fullWidth:!0,multiline:!0,rows:4,value:l.remarks,onChange:Y})}),e.jsx(s,{item:!0,xs:12,children:e.jsx(ae,{loading:H,variant:"contained",color:"primary",type:"submit",fullWidth:!0,children:"Generate Invoice"})})]})}),e.jsx(M,{open:!!W,autoHideDuration:6e3,onClose:()=>v(""),children:e.jsx(O,{onClose:()=>v(""),severity:"success",children:W})}),e.jsx(M,{open:!!R,autoHideDuration:6e3,onClose:()=>u(""),children:e.jsx(O,{onClose:()=>u(""),severity:"error",children:R})})]}):null};export{ye as default};
