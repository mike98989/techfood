import{u as C,S as D,a as R,R as g,r as c,f as q,j as e,h as T}from"./index-217676aa.js";const O=y=>{var p,k,f,h,_;const{t:r}=C(),{setIsLoading:n,Spinner:m}=D(),b=R(t=>t.user.value),{allRequest:v}=g(),[d,E]=c.useState(y.componentData),[i,w]=c.useState([]);g();const{MessageBox:j,setFormMessage:x}=q();c.useState(!1);const{fetchApi:N}=T(),[s,u]=c.useState({occurance_date:"",deviation_type_id:"",deviation_code_id:"",risk_category_id:"",product_id:"",cleared_before:"",implemented_by:"",location_id:"",section_id:"",danger_id:""});c.useEffect(()=>{(async(a,l)=>{n(!0),v({event:null,action_url:a,method:"GET",formId:"",formData:null,contentType:"application/json",authentication:b.token,setIsLoading:n,setReturnData:l})})("hygiene_round_form_related_data",w),u({occurance_date:new Date(d.occurance_date).toISOString().split("T")[0],deviation_type_id:d.deviation_type_id,deviation_code_id:d.deviation_code_id,risk_category_id:d.risk_category_id,product_id:d.product_id,cleared_before:d.cleared_before,implemented_by:d.implemented_id,location_id:d.location_id,section_id:d.section_id,danger_id:d.danger_id})},[]);const o=t=>{const{name:a,value:l}=t.target;u(S=>({...S,[a]:l}))};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"flex",children:e.jsxs("div",{className:"w-full",children:[e.jsx("div",{className:"border-b border-stroke py-2 dark:border-strokedark",children:e.jsx("h3",{className:"font-medium text-black dark:text-white",children:r("update")+" "+r("daily_hygiene_rounds")+" "+r("values")})}),e.jsx(j,{}),e.jsx("form",{onSubmit:t=>{t.preventDefault(),n(!0),N({url:"hygienerounds/"+d.id,method:"PUT",formData:s,contentType:"application/json",authentication:b.token}).then(a=>{const l=JSON.parse(a);n(!1),l.status=="1"&&(u({occurance_date:"",deviation_type_id:"",deviation_code_id:"",risk_category_id:"",product_id:"",cleared_before:"",implemented_by:"",location_id:"",section_id:"",danger_id:""}),x({message:l.message,status:"success"}),setTimeout(()=>{window.location.reload()},1200))}).catch(a=>{n(!1),x({message:JSON.parse(a),status:"error"})})},action:"#",id:"editHygieneRounds",method:"POST",children:e.jsxs("div",{className:"p-0.5",children:[e.jsx(m,{}),e.jsxs("div",{className:"mb-4.5 flex flex-col gap-6 xl:flex-row",children:[e.jsxs("div",{className:"w-full xl:w-3/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("occurance_date")}),e.jsx("input",{type:"date",name:"occurance_date",defaultValue:s.occurance_date,onChange:o,placeholder:r("enter")+" "+r("occurance_date"),className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"})]}),e.jsxs("div",{className:"w-full xl:w-3/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("deviation_type")}),e.jsxs("select",{className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm",required:!0,value:s.deviation_type_id,onChange:o,name:"deviation_type_id",children:[e.jsxs("option",{value:"",children:["--",r("select"),"--"]}),(p=i.deviation_types)==null?void 0:p.original.data.map((t,a)=>e.jsx("option",{value:t.id,children:r(t.name_key)},a))]})]})]}),e.jsxs("div",{className:"mb-4.5 flex flex-col gap-6 xl:flex-row",children:[e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("deviation_code")}),e.jsxs("select",{className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm",required:!0,name:"deviation_code_id",value:s.deviation_code_id,onChange:o,children:[e.jsxs("option",{value:"",children:["--",r("select"),"--"]}),(k=i.deviation_codes)==null?void 0:k.original.data.map((t,a)=>e.jsx("option",{value:t.id,children:r(t.name_key)},a))]})]}),e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("risk_category")}),e.jsxs("select",{className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm",required:!0,name:"risk_category_id",value:s.risk_category_id,onChange:o,children:[e.jsxs("option",{value:"",children:["--",r("select"),"--"]}),(f=i.risk_categories)==null?void 0:f.original.data.map((t,a)=>e.jsx("option",{value:t.id,children:t.name},a))]})]}),e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white",children:r("product_type")}),e.jsxs("select",{className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm",required:!0,name:"product_id",value:s.product_id,onChange:o,children:[e.jsxs("option",{value:"",children:["--",r("select"),"--"]}),(h=i.product_types)==null?void 0:h.original.data.map((t,a)=>e.jsx("option",{value:t.id,children:r(t.name_key)},a))]})]})]}),e.jsxs("div",{className:"mb-4.5 flex flex-col gap-6 xl:flex-row text-sm",children:[e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("cleared_before")}),e.jsx("input",{type:"date",name:"cleared_before",value:s.cleared_before,onChange:o,placeholder:r("Enter")+" "+r("cleared_before"),className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"})]}),e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("implemented_by")}),e.jsx("input",{type:"text",name:"implemented_by",value:s.implemented_by,onChange:o,placeholder:r("Enter")+" "+r("implemented_by"),className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"})]}),e.jsxs("div",{className:"w-full xl:w-3/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("danger")}),e.jsxs("select",{className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm",required:!0,name:"danger_id",value:s.danger_id,onChange:o,children:[e.jsxs("option",{value:"",children:["--",r("select"),"--"]}),i.danger_types&&i.danger_types.original.data.map((t,a)=>e.jsx("option",{value:t.id,children:r(t.name_key)},a))]})]})]}),e.jsxs("div",{className:"mb-4.5 flex flex-col gap-6 xl:flex-row",children:[e.jsxs("div",{className:"w-full xl:w-3/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white",children:r("section")}),e.jsxs("select",{className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm",required:!0,name:"section_id",value:s.section_id,onChange:o,children:[e.jsxs("option",{value:"",children:["--",r("select"),"--"]}),(_=i.sections)==null?void 0:_.original.data.map((t,a)=>e.jsx("option",{value:t.id,children:r(t.name_key)},a))]})]}),e.jsxs("div",{className:"w-full xl:w-3/6",children:[e.jsxs("label",{className:"mb-1 block text-black dark:text-white text-sm",children:[r("location"),"/",r("line")]}),e.jsxs("select",{className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm",required:!0,name:"location_id",value:s.location_id,onChange:o,children:[e.jsxs("option",{value:"",children:["--",r("select"),"--"]}),i.line_types&&i.line_types.original.data.map((t,a)=>e.jsx("option",{value:t.id,children:r(t.name_key)},a))]})]})]}),e.jsx("div",{className:"flex flex-row justify-center",children:i.deviation_codes&&e.jsxs("button",{type:"submit",className:"text-white bg-gradient-to-br from-cyan-600 to-cyan-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-2",children:[e.jsx(m,{}),r("save")]})})]})})]})})})};export{O as default};
