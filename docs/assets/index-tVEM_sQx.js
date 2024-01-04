import{r as d,j as e,R as F}from"./react-UkBVq0uJ.js";import"./bootstrap-h7kJcuSp.js";import{c as A}from"./react-dom-HA-SIXFg.js";import{S as G}from"./@supercharge-WiZxvw2n.js";import{m as M}from"./ag-grid-react-6LaZHkGj.js";import"./ag-grid-community-G_Ji_TT9.js";import"./scheduler-iwWdm5Ml.js";import"./uuid-pEGGjzlR.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function l(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(t){if(t.ep)return;t.ep=!0;const a=l(t);fetch(t.href,a)}})();const w=s=>typeof s=="string"&&s.length>0,P=(s="body-tertiary")=>{d.useEffect(()=>{const i=w(s);return i&&document.body.classList.add(`bg-${s}`),()=>{i&&document.body.classList.remove(`bg-${s}`)}},[s])},T=({children:s})=>e.jsx(e.Fragment,{children:e.jsx("main",{className:"container",children:e.jsx("div",{className:"my-3 p-3 bg-body rounded shadow-sm",children:s})})}),E=s=>G(s).pascal().words().join(" "),$=(s,i)=>{const l=(r,f=new Set(["number","string"]))=>{const h={},O=new Set;return r.forEach(R=>{Object.keys(R).forEach(j=>{const k=R[j],b=typeof k;f.has(b)&&(j in h||(h[j]={}),b in h[j]||(h[j][b]=0),h[j][b]+=1,j===i&&O.add(k))})}),{columnTypesCounted:h,setOfPivotValues:O}},{columnTypesCounted:c,setOfPivotValues:t}=l(s),a=r=>Object.entries(r).sort((f,h)=>h[1]-f[1])[0][0],o=Object.entries(c).map(([r,f])=>({type:a(f),field:r})).filter(({field:r})=>r!==i),m=o.filter(({type:r})=>r==="number"),n=o.filter(({type:r})=>r==="string"),u=new Set(n.map(({field:r})=>r)),p=r=>r.map(({field:f})=>({label:E(f),value:f})),y=p(n),x=p(m),C=[...t],g=[...n.map(({field:r})=>({field:r})),...C.map(r=>({field:r}))];return{summaryColumnOptions:y,setOfSummaryColumns:u,measureOptions:x,allColumnDefs:g}},B=({checkedSummaryColumns:s,setOfSummaryColumns:i,dataContainsRates:l,checkedMeasure:c,allColumnDefs:t})=>t==null?void 0:t.filter(({field:a})=>!i.has(a)||s.has(a)).map(a=>i.has(a.field)?a:{...a,valueFormatter:({value:o})=>(l?(o==null?void 0:o[c])/(o==null?void 0:o.total):Math.round(o==null?void 0:o[c])).toLocaleString(),type:"numericColumn"}),L=d.memo(({setCheckedValues:s,checkedValues:i,className:l,options:c})=>{const t=m=>d.startTransition(()=>s(n=>{const u=new Set(n),p=m.target.value;return n.has(p)?u.delete(p):u.add(p),u})),a="list-group",o=w(l)?`${a} ${l}`:a;return e.jsx(e.Fragment,{children:e.jsx("div",{className:o,children:c==null?void 0:c.map(({value:m,label:n})=>e.jsxs("label",{className:"list-group-item d-flex gap-2",children:[e.jsx("input",{className:"form-check-input flex-shrink-0",checked:i.has(m),onChange:t,type:"checkbox",value:m}),e.jsx("span",{children:n})]},m))})})});L.displayName="CheckboxListGroup";const S=d.memo(({setCheckedValue:s,checkedValue:i,className:l,options:c,name:t})=>{const a=n=>d.startTransition(()=>s(n.target.value)),o="list-group",m=w(l)?`${o} ${l}`:o;return e.jsx(e.Fragment,{children:e.jsx("div",{className:m,children:c==null?void 0:c.map(({value:n,label:u})=>e.jsxs("label",{className:"list-group-item d-flex gap-2",children:[e.jsx("input",{className:"form-check-input flex-shrink-0",checked:n===i,onChange:a,value:n,type:"radio",name:t}),e.jsx("span",{children:u})]},n))})})});S.displayName="RadioListGroup";const N=[{label:"Fall Enrollment",pivotColumn:"termDesc",containsRates:!1,value:"fall"},{label:"Spring Enrollment",pivotColumn:"termDesc",containsRates:!1,value:"spring"},{label:"Summer Enrollment",pivotColumn:"termDesc",containsRates:!1,value:"summer"},{label:"Degrees Awarded",containsRates:!1,pivotColumn:"year",value:"degrees"},{pivotColumn:"retention_year",label:"Retention Rates",containsRates:!0,value:"retention"},{pivotColumn:"cohort_term",label:"Graduation Rates",value:"graduation",containsRates:!0},{label:"Credit Hours",containsRates:!1,pivotColumn:"year",value:"hours"}],v=s=>Array.isArray(s)&&s.length>0,D="lg",I={headerValueGetter:({colDef:{field:s}})=>E(s)},q=({checkedSummaryColumns:s,measureOptions:i,pivotColumn:l,data:c})=>{const t=[],a={},o=[...s];return c==null||c.forEach(m=>{let n=a;const u=m[l],p=[];o.forEach((y,x)=>{const C=x===o.length-1,g=m[y];p.push([y,g]),g in n||(C?(n[g]=Object.fromEntries(p),t.push(n[g])):n[g]={}),n=n[g],C&&(u in n||(n[u]={}),n=n[u],i.forEach(({value:r})=>{const f=m[r];r in n||(n[r]=0),n[r]+=f}))})}),t},_=s=>{const[i,l]=d.useState(null);return d.useEffect(()=>{if(s){let c=!1;return fetch(s).then(t=>t.json()).then(t=>{c||l(t)}),()=>{c=!0}}},[s]),i},V=d.memo(s=>e.jsx(M.AgGridReact,{...s}));V.displayName="Grid";const z=()=>{const[s,i]=d.useState(N[0].value),[l,c]=d.useState(""),[t,a]=d.useState(new Set),o=_(`data/${s}.json`),m=N.find(({value:f})=>f===s),n=m.pivotColumn,u=m.containsRates,{summaryColumnOptions:p,setOfSummaryColumns:y,measureOptions:x,allColumnDefs:C}=d.useMemo(()=>v(o)?$(o,n):{},[o,n]),g=d.useMemo(()=>B({checkedSummaryColumns:t,setOfSummaryColumns:y,dataContainsRates:u,checkedMeasure:l,allColumnDefs:C}),[C,l,u,y,t]),r=d.useMemo(()=>q({checkedSummaryColumns:t,measureOptions:x,pivotColumn:n,data:o}),[o,n,x,t]);return console.log(r),d.useEffect(()=>{(h=>v(h)&&c(h[0].value))(x)},[x]),d.useEffect(()=>{(h=>v(h)&&a(new Set([h[0].value])))(p)},[p]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:`d-flex flex-wrap-reverse flex-${D}-nowrap gap-3`,children:[e.jsxs("div",{className:`d-flex gap-3 flex-row flex-wrap flex-${D}-column p-3 rounded shadow-sm flex-fill`,children:[e.jsxs("div",{className:"d-flex flex-column gap-2",children:[v(N)&&e.jsx("div",{className:"lh-1",children:"Dataset:"}),e.jsx(S,{setCheckedValue:i,className:"shadow-sm text-nowrap",checkedValue:s,options:N,name:"dataset"})]}),e.jsxs("div",{className:"d-flex flex-column gap-2",children:[v(x)&&e.jsx("div",{className:"lh-1",children:"Measure:"}),e.jsx(S,{setCheckedValue:c,className:"shadow-sm text-nowrap",checkedValue:l,options:x,name:"measure"})]}),e.jsxs("div",{className:"d-flex flex-column gap-2",children:[v(p)&&e.jsx("div",{className:"lh-1",children:"Summary Columns:"}),e.jsx(L,{setCheckedValues:a,checkedValues:t,className:"shadow-sm text-nowrap",options:p})]})]}),e.jsxs("div",{className:"rounded shadow-sm p-3 w-100 d-flex flex-column gap-2",children:[e.jsx("div",{className:"lh-1",children:"Pivot Table:"}),e.jsx("div",{className:"ag-theme-quartz",style:{height:500},children:e.jsx(V,{defaultColDef:I,columnDefs:g,rowData:r})})]})]})})},H=()=>(P("primary-subtle"),e.jsx(e.Fragment,{children:e.jsx(T,{children:e.jsx(z,{})})}));A.createRoot(document.getElementById("root")).render(e.jsx(F.StrictMode,{children:e.jsx(H,{})}));