import{S as w,a as g,f as j,R as v,r as u,u as N,j as e,h as _}from"./index-a4f9129e.js";function q(m){const{setIsLoading:l,Spinner:c}=w(),x=g(t=>t.user.value),{MessageBox:p,setFormMessage:n}=j();v();const{fetchApi:f}=_(),[k,V]=u.useState(2024),[o,d]=u.useState(m.componentData),[h,y]=u.useState(o.total_hours),{t:r}=N();r("staffing_of_production");const i=(t,a)=>{d(s=>{const b={...s};return b[a]=parseInt(t.target.value),b})};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-[100%] gap-4",children:e.jsxs("div",{className:"rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark",children:[e.jsx("div",{className:"flex border-b justify-between  border-stroke py-2 px-3 dark:border-strokedark",children:e.jsx("h3",{className:"text-md left-content uppercase text-black dark:text-white items-start",children:r("staffing_of_production")})}),e.jsx("div",{className:"",children:e.jsxs("form",{onSubmit:t=>{t.preventDefault(),l(!0),f({url:"staffingproduction/"+o.id,method:"PUT",formData:o,contentType:"application/json",authentication:x.token}).then(a=>{console.log(a);const s=JSON.parse(a);l(!1),s.status=="1"?(d([]),n({message:s.message,status:"success"}),setTimeout(()=>{window.location.reload()},1500)):n({message:s.message,status:"error"})}).catch(a=>{l(!1),n({message:JSON.parse(a),status:"error"})})},action:"#",id:"editStaffingProduction",method:"POST",children:[e.jsx(p,{}),e.jsxs("div",{className:"px-6.5",children:[e.jsx(c,{}),e.jsxs("div",{className:"mb-4.5 flex flex-col gap-6 xl:flex-row",children:[e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("year")}),e.jsx("input",{type:"number",min:"1900",max:"2099",name:"year",defaultValue:k,required:!0,placeholder:r("year"),className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"})]}),e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("week")}),e.jsxs("select",{className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm",required:!0,name:"week",defaultValue:o.week,onChange:t=>d(a=>{const s={...a};return s.week=parseInt(t.target.value),s}),children:[e.jsxs("option",{value:"",children:["--",r("select"),"--"]}),Array.from({length:52},(t,a)=>e.jsx("option",{value:a+1,children:r(`Week ${a+1}`)},a))]})]}),e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("day")}),e.jsxs("select",{className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm",defaultValue:o.day,onChange:t=>d(a=>{const s={...a};return s.day=t.target.value,s}),required:!0,name:"day",children:[e.jsxs("option",{value:"",children:["--",r("select"),"--"]}),e.jsx("option",{value:"monday",children:r("monday")}),e.jsx("option",{value:"tuesday",children:r("tuesday")}),e.jsx("option",{value:"wednesday",children:r("wednesday")}),e.jsx("option",{value:"thursday",children:r("thursday")}),e.jsx("option",{value:"friday",children:r("friday")}),e.jsx("option",{value:"saturday",children:r("saturday")}),e.jsx("option",{value:"sunday",children:r("sunday")})]})]})]}),e.jsxs("div",{className:"mb-4.5 flex flex-col gap-6 xl:flex-row text-sm",children:[e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("weekly_total_hours_worked")}),e.jsx("input",{type:"number",defaultValue:o.weekly_total_hours_worked,onChange:t=>d(a=>{const s={...a};return s.weekly_total_hours_worked=parseInt(t.target.value),s}),min:"0",name:"weekly_total_hours_worked",placeholder:r("hours_worked"),className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"})]}),e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("supervisor")}),e.jsx("input",{type:"number",name:"supervisor",defaultValue:o.supervisor,placeholder:r("supervisor"),onChange:t=>i(t,"supervisor"),className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"})]}),e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white text-sm",children:r("control")}),e.jsx("input",{type:"number",name:"quality_control",defaultValue:o.quality_control,placeholder:r("control"),onChange:t=>i(t,"quality_control"),className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"})]})]}),e.jsxs("div",{className:"mb-4.5 flex flex-col gap-6 xl:flex-row text-sm",children:[e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white",children:r("operator")}),e.jsx("input",{type:"number",name:"operator_staff",defaultValue:o.operator_staff,placeholder:r("operator_staff"),onChange:t=>i(t,"operator_staff"),className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"})]}),e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white",children:r("total_hours")}),e.jsx("input",{type:"number",value:h,onChange:t=>{y(t.target.value),d(a=>{const s={...a};return s.total_hours=parseInt(t.target.value),s})},name:"total_hours",placeholder:r("total_hours"),className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"})]}),e.jsxs("div",{className:"w-full xl:w-2/6",children:[e.jsx("label",{className:"mb-1 block text-black dark:text-white",children:r("production_quantity")}),e.jsx("input",{type:"number",defaultValue:o.production_quantity,onChange:t=>{d(a=>{const s={...a};return s.production_quantity=parseInt(t.target.value),s})},name:"production_quantity",placeholder:r("production_quantity"),className:"w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"})]})]}),e.jsx("div",{className:"flex flex-row justify-center",children:e.jsxs("button",{type:"submit",className:"text-white bg-gradient-to-br from-cyan-600 to-cyan-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-2",children:[e.jsx(c,{}),r("save")]})})]})]})})]})})})}export{q as default};
