import{u as h,A as m,a as p,r as u,j as e}from"./index-a4f9129e.js";const b=(o,c)=>o.map(t=>{const d=c.find(l=>l.day===t);return d?{...d}:{day:t}});function w(o){const c=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],{t}=h(),{ModalUIComponent:d,setOpenModal:l,setModalQueryData:n}=m(),i=p(r=>r.user.value),[a,x]=u.useState(b(c,o.componentData.data));return e.jsxs("div",{className:"",children:[e.jsx(d,{}),e.jsx("div",{className:"flex flex-row",children:e.jsx("div",{className:"w-full p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mr-2",children:e.jsx("div",{className:"relative overflow-x-auto shadow-md sm:rounded-lg",children:e.jsxs("table",{className:"w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400",children:[e.jsxs("thead",{className:"text-xs text-gray-700 uppercase dark:text-gray-400",children:[e.jsx("tr",{children:e.jsx("th",{scope:"col",colSpan:8,className:"px-3 py-4 text-center font-bold bg-gray-50 dark:bg-gray-800",children:o.componentData.key})}),e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"px-3 py-1 bg-gray-50 dark:bg-gray-800",children:t("days")}),e.jsx("th",{className:"w-10 pt-15 pb-1 pl-2 border-b border-r border-[#eee] dark:border-strokedark",children:e.jsx("div",{className:"rotate-minus-30 w-4 mt-8",children:t("number_of_hours")})}),e.jsx("th",{className:"w-10 pt-15 pb-1 pl-2 border-b border-r border-[#eee] dark:border-strokedark",children:e.jsx("div",{className:"rotate-minus-30 w-4 mt-8",children:t("total_hours")})}),e.jsx("th",{className:"w-10 pt-15 pb-1 pl-2 border-b border-r border-[#eee] dark:border-strokedark",children:e.jsx("div",{className:"rotate-minus-30 w-4 mt-8",children:t("supervisor")})}),e.jsx("th",{className:"w-10 pt-15 pb-1 pl-2 border-b border-r border-[#eee] dark:border-strokedark",children:e.jsx("div",{className:"rotate-minus-30 w-4 mt-8",children:t("control")})}),e.jsx("th",{className:"w-10 pt-15 pb-1 pl-2 border-b border-r border-[#eee] dark:border-strokedark",children:e.jsx("div",{className:"rotate-minus-30 text-center w-4 mt-8",children:t("operator")})}),e.jsx("th",{className:"w-10 pt-15 pb-1 pl-2 border-b border-r border-[#eee] dark:border-strokedark",children:e.jsx("div",{className:"rotate-minus-30 text-center w-4 mt-8",children:t("total_production")})}),e.jsx("th",{className:"w-10 pt-15 pb-1 pl-2 border-b border-r border-[#eee] dark:border-strokedark",children:e.jsx("div",{className:"rotate-minus-30 text-center w-4 mt-8",children:t("actions")})})]})]}),e.jsxs("tbody",{children:[a.map((r,s)=>e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("th",{scope:"row",className:"px-3 py-1 font-small text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800",children:t(r.day)}),e.jsx("td",{className:"w-4 text-center",children:r.weekly_total_hours_worked?r.weekly_total_hours_worked:40}),e.jsx("td",{className:"w-4 text-center",children:r.total_hours?r.total_hours:0}),e.jsx("td",{className:"w-4 text-center",children:r.supervisor?r.supervisor:0}),e.jsx("td",{className:"w-4 text-center",children:r.quality_control?r.quality_control:0}),e.jsx("td",{className:"w-4 text-center",children:r.operator_staff?r.operator_staff:0}),e.jsx("td",{className:"w-4 text-center",children:r.production_quantity?r.production_quantity:0}),e.jsx("td",{className:"border-b border-[#eee] py-2 px-1 dark:border-strokedark",children:r.total_hours&&e.jsxs("div",{className:"flex items-center space-x-3.5",children:[e.jsx("button",{onClick:()=>{l(!0),n({modalType:"form",modalSize:"xl",modalData:{form:"EditStaffingProduction",data:r}})},className:"hover:text-primary",children:e.jsx("svg",{className:"w-[18px] h-[18px] text-gray-800 dark:text-white hover:text-primary","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"none",viewBox:"0 0 22 22",children:e.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"0.5",d:"m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"})})}),e.jsx("button",{className:"hover:text-primary",onClick:()=>{l(!0),n({modalType:"delete",modalSize:"sm",modalData:{index:s,endPoint:"staffingproduction/"+r.id,action:"DELETE",token:i.token,title:r.year+"-"+t("week")+" "+r.week+"- "+t(r.day),data:a,setData:x}})},children:e.jsxs("svg",{className:"fill-current",width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z",fill:""}),e.jsx("path",{d:"M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z",fill:""}),e.jsx("path",{d:"M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z",fill:""}),e.jsx("path",{d:"M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z",fill:""})]})})]})})]},s)),e.jsxs("tr",{className:"text-center font-medium bg-gray-50 dark:bg-gray-800",children:[e.jsx("th",{colSpan:2}),e.jsx("th",{className:"text-xs",children:a.reduce((r,s)=>r+(s.total_hours||0),0)}),e.jsx("th",{className:"w-4 text-xs py-3",children:a.reduce((r,s)=>r+(s.supervisor||0),0)}),e.jsx("th",{className:"w-4 pl-1",children:a.reduce((r,s)=>r+(s.quality_control||0),0)}),e.jsx("th",{children:a.reduce((r,s)=>r+(s.operator||0),0)}),e.jsx("th",{children:a.reduce((r,s)=>r+(s.production_quantity||0),0)})]})]})]})})})})]})}export{w as default};
