import{u as S,S as D,a as E,R as g,r as c,f as R,j as e,h as T}from"./index-d5aa70aa.js";const A=y=>{var p,k,f,h,_;const{t:r}=S(),{setIsLoading:n,Spinner:b}=D(),m=E(t=>t.user.value),{allRequest:w}=g(),[s,q]=c.useState(y.componentData),[d,v]=c.useState([]);g();const{MessageBox:j,setFormMessage:x}=R();c.useState(!1);const{fetchApi:N}=T(),[o,u]=c.useState({reference_number:"",occurance_date:"",title:"",deviation_type_id:"",deviation_code_id:"",risk_category_id:"",product_id:"",article_no:"",batch_no:"",location_id:"",section_id:"",deviation_description:"",suggested_correction:""});c.useEffect(()=>{(async(a,l)=>{n(!0),w({event:null,action_url:a,method:"GET",formId:"",formData:null,contentType:"application/json",authentication:m.token,setIsLoading:n,setReturnData:l})})("deviation_form_related_data",v),u({reference_number:s.reference_number,occurance_date:new Date(s.occurance_date).toISOString().split("T")[0],title:s.title,deviation_type_id:s.deviation_type_id,deviation_code_id:s.deviation_code_id,risk_category_id:s.risk_category_id,product_id:s.product_id,article_no:s.article_no,batch_no:s.batch_no,location_id:s.location_id,section_id:s.section_id,deviation_description:s.deviation_description,suggested_correction:s.suggested_correction})},[]);const i=t=>{const{name:a,value:l}=t.target;u(C=>({...C,[a]:l}))};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"flex",children:e.jsxs("div",{className:"w-full",children:[e.jsx("div",{className:"border-b border-stroke py-2 dark:border-strokedark",children:e.jsx("h3",{className:"font-medium text-black dark:text-white",children:r("update")+" "+r("deviation_complaints")+" "+r("values")})}),e.jsx(j,{}),e.jsx("form",{onSubmit:t=>{t.preventDefault(),n(!0),N({url:"deviationcomplaints/"+s.id,method:"PUT",formData:o,contentType:"application/json",authentication:m.token}).then(a=>{const l=JSON.parse(a);n(!1),l.status=="1"&&(u({reference_number:"",occurance_date:"",title:"",deviation_type_id:"",deviation_code_id:"",risk_category_id:"",product_id:"",article_no:"",batch_no:"",location_id:"",section_id:"",deviation_description:"",suggested_correction:""}),x({message:l.message,status:"success"}),setTimeout(()=>{window.location.reload()},1200))}).catch(a=>{n(!1),x({message:JSON.parse(a),status:"error"})})},action:"#",id:"editDeviationComplaint",method:"POST",children:e.jsxs("div",{className:"p-0.5",children:[e.jsx(b,{}),e.jsxs("div",{className:"mb-4.5 flex flex-col gap-6 xl:flex-row",children:[e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("reference_number")}),e.jsx("input",{type:"text",name:"reference_number",value:o.reference_number,onChange:i,placeholder:"Enter Reference Number",className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"})]}),e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("title")}),e.jsx("input",{type:"text",name:"title",value:o.title,onChange:i,placeholder:"Enter Title",className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"})]}),e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("occurance_date")}),e.jsx("input",{type:"date",name:"occurance_date",value:o.occurance_date,onChange:i,placeholder:"Enter Occurance Date",className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"})]})]}),e.jsxs("div",{className:"mb-4.5 flex flex-col gap-6 xl:flex-row",children:[e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("deviation_type")}),e.jsxs("select",{className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm",required:!0,value:o.deviation_type_id,onChange:i,name:"deviation_type_id",children:[e.jsxs("option",{value:"",children:["--",r("select"),"--"]}),(p=d.deviation_types)==null?void 0:p.original.data.map((t,a)=>e.jsx("option",{value:t.id,children:r(t.name_key)},a))]})]}),e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("deviation_code")}),e.jsxs("select",{className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm",required:!0,name:"deviation_code_id",value:o.deviation_code_id,onChange:i,children:[e.jsxs("option",{value:"",children:["--",r("select"),"--"]}),(k=d.deviation_codes)==null?void 0:k.original.data.map((t,a)=>e.jsx("option",{value:t.id,children:r(t.name_key)},a))]})]}),e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("risk_category")}),e.jsxs("select",{className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm",required:!0,name:"risk_category_id",value:o.risk_category_id,onChange:i,children:[e.jsxs("option",{value:"",children:["--",r("select"),"--"]}),(f=d.risk_categories)==null?void 0:f.original.data.map((t,a)=>e.jsx("option",{value:t.id,children:t.name},a))]})]})]}),e.jsxs("div",{className:"mb-4.5 flex flex-col gap-6 xl:flex-row text-sm",children:[e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white",children:r("product_type")}),e.jsxs("select",{className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm",required:!0,name:"product_id",value:o.product_id,onChange:i,children:[e.jsxs("option",{value:"",children:["--",r("select"),"--"]}),(h=d.product_types)==null?void 0:h.original.data.map((t,a)=>e.jsx("option",{value:t.id,children:r(t.name_key)},a))]})]}),e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("article")+" "+r("number")}),e.jsx("input",{type:"text",name:"article_no",value:o.article_no,onChange:i,placeholder:"Enter Article number",className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"})]}),e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("batch_number")}),e.jsx("input",{type:"text",name:"batch_no",value:o.batch_no,onChange:i,placeholder:"Enter Batch number",className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"})]})]}),e.jsxs("div",{className:"mb-4.5 flex flex-col gap-6 xl:flex-row",children:[e.jsxs("div",{className:"w-full xl:w-3/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white",children:r("section")}),e.jsxs("select",{className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm",required:!0,name:"section_id",value:o.section_id,onChange:i,children:[e.jsxs("option",{value:"",children:["--",r("select"),"--"]}),(_=d.sections)==null?void 0:_.original.data.map((t,a)=>e.jsx("option",{value:t.id,children:r(t.name_key)},a))]})]}),e.jsxs("div",{className:"w-full xl:w-3/6",children:[e.jsxs("label",{className:"mb-1 block text-black dark:text-white text-sm",children:[r("location"),"/",r("line")]}),e.jsxs("select",{className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm",required:!0,name:"location_id",value:o.location_id,onChange:i,children:[e.jsxs("option",{value:"",children:["--",r("select"),"--"]}),d.line_types&&d.line_types.original.data.map((t,a)=>e.jsx("option",{value:t.id,children:r(t.name_key)},a))]})]})]}),e.jsxs("div",{className:"mb-4.5 flex flex-col gap-6 xl:flex-row",children:[e.jsxs("div",{className:"w-full xl:w-3/6",children:[e.jsx("label",{className:"mb-2.5 block text-black dark:text-white text-sm",children:r("deviation_description")}),e.jsx("textarea",{rows:2,name:"deviation_description",defaultValue:o.deviation_description,onChange:i,placeholder:"Type of deviation",className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"})]}),e.jsxs("div",{className:"w-full xl:w-3/6",children:[e.jsx("label",{className:"mb-2.5 block text-black dark:text-white text-sm",children:r("suggested_correction")}),e.jsx("textarea",{rows:2,placeholder:r("suggested_correction")+"/"+r("actions"),name:"suggested_correction",defaultValue:o.suggested_correction,onChange:i,className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"})]})]}),e.jsx("div",{className:"flex flex-row justify-center",children:d.deviation_codes&&e.jsxs("button",{type:"submit",className:"text-white bg-gradient-to-br from-cyan-600 to-cyan-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-2",children:[e.jsx(b,{}),r("save")]})})]})})]})})})};export{A as default};