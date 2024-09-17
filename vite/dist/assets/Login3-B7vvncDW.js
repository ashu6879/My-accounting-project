import{b as B,d as I,r as x,u as F,j as e,G as s,B as d,T as c,F as w,I as P,A as T,e as y,f as D,S as L,g as W}from"./index-DjrlQ2F5.js";import{F as E,c as O,a as f,I as q,d as z,b as H,A as M,e as R,f as U}from"./AuthFooter-_oq7srDQ.js";import{I as b,O as S,F as h,B as N}from"./OutlinedInput-DsoeenSI.js";const $=({...u})=>{const r=B();I(r.breakpoints.down("md")),x.useState(!0);const[m,v]=x.useState(!1),[p,j]=x.useState(""),C=F(),k=()=>v(!m),A=t=>t.preventDefault();return e.jsxs(e.Fragment,{children:[e.jsxs(s,{container:!0,direction:"column",justifyContent:"center",spacing:2,children:[e.jsx(s,{item:!0,xs:12,children:e.jsx(d,{sx:{alignItems:"center",display:"flex"}})}),e.jsx(s,{item:!0,xs:12,container:!0,alignItems:"center",justifyContent:"center",children:e.jsx(d,{sx:{mb:2},children:e.jsx(c,{variant:"subtitle1",children:"Sign in with Username"})})})]}),e.jsx(E,{initialValues:{username:"",password:""},validationSchema:O().shape({username:f().max(255).required("Username is required"),password:f().max(255).required("Password is required")}),onSubmit:async(t,{setSubmitting:o})=>{console.log("Submitting values:",t);try{const n=await fetch("https://ekarigar-accounts.onrender.com/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t.username,password:t.password})});console.log("Response status:",n.status);const a=await n.text();if(console.log("Response body:",a),n.ok){const i=JSON.parse(a);console.log("Response data:",i),localStorage.setItem("authToken",i.token),C("/dashboard")}else j(a||"Login failed. Please try again.")}catch(n){console.error("Fetch error:",n),j("An error occurred. Please try again.")}finally{o(!1)}},children:({errors:t,handleBlur:o,handleChange:n,handleSubmit:a,isSubmitting:i,touched:l,values:g})=>e.jsxs("form",{noValidate:!0,onSubmit:a,...u,children:[e.jsxs(w,{fullWidth:!0,error:!!(l.username&&t.username),sx:{...r.typography.customInput},children:[e.jsx(b,{htmlFor:"outlined-adornment-username-login",children:"Username"}),e.jsx(S,{id:"outlined-adornment-username-login",type:"text",value:g.username,name:"username",onBlur:o,onChange:n,label:"Username"}),l.username&&t.username&&e.jsx(h,{error:!0,id:"standard-weight-helper-text-username-login",children:t.username})]}),e.jsxs(w,{fullWidth:!0,error:!!(l.password&&t.password),sx:{...r.typography.customInput},children:[e.jsx(b,{htmlFor:"outlined-adornment-password-login",children:"Password"}),e.jsx(S,{id:"outlined-adornment-password-login",type:m?"text":"password",value:g.password,name:"password",onBlur:o,onChange:n,endAdornment:e.jsx(q,{position:"end",children:e.jsx(P,{"aria-label":"toggle password visibility",onClick:k,onMouseDown:A,edge:"end",size:"large",children:m?e.jsx(z,{}):e.jsx(H,{})})}),label:"Password"}),l.password&&t.password&&e.jsx(h,{error:!0,id:"standard-weight-helper-text-password-login",children:t.password})]}),p&&e.jsx(d,{sx:{mt:3},children:e.jsx(h,{error:!0,children:p})}),e.jsx(d,{sx:{mt:2},children:e.jsx(T,{children:e.jsx(N,{disableElevation:!0,disabled:i,fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"secondary",children:"Sign in"})})})]})})]})},_=()=>{const u=I(r=>r.breakpoints.down("md"));return e.jsx(M,{children:e.jsxs(s,{container:!0,direction:"column",justifyContent:"flex-end",sx:{minHeight:"100vh"},children:[e.jsx(s,{item:!0,xs:12,children:e.jsx(s,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"calc(100vh - 68px)"},children:e.jsx(s,{item:!0,sx:{m:{xs:1,sm:3},mb:0},children:e.jsx(R,{children:e.jsxs(s,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:[e.jsx(s,{item:!0,sx:{mb:3},children:e.jsxs(y,{to:"/","aria-label":"logo",children:[" ",e.jsx(D,{})]})}),e.jsx(s,{item:!0,xs:12,children:e.jsx(s,{container:!0,direction:{xs:"column-reverse",md:"row"},alignItems:"center",justifyContent:"center",children:e.jsx(s,{item:!0,children:e.jsxs(L,{alignItems:"center",justifyContent:"center",spacing:1,children:[e.jsx(c,{color:"secondary.main",gutterBottom:!0,variant:u?"h3":"h2",children:"Hi, Welcome Back"}),e.jsx(c,{variant:"caption",fontSize:"16px",textAlign:{xs:"center",md:"inherit"},children:"Enter your credentials to continue"})]})})})}),e.jsx(s,{item:!0,xs:12,children:e.jsx($,{})}),e.jsx(s,{item:!0,xs:12,children:e.jsx(W,{})}),e.jsx(s,{item:!0,xs:12,children:e.jsx(s,{item:!0,container:!0,direction:"column",alignItems:"center",xs:12,children:e.jsx(c,{component:y,to:"/pages/register/register3",variant:"subtitle1",sx:{textDecoration:"none"},children:"Don't have an account?"})})})]})})})})}),e.jsx(s,{item:!0,xs:12,sx:{m:3,mt:1},children:e.jsx(U,{})})]})})};export{_ as default};