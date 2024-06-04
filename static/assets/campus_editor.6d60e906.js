import{m as s,C as o}from"./index.f5e56c02.js";window.alpine=s;window.CTFd=o;s.data("CampusList",()=>({campuses:[],async init(){let e=await o.fetch(`/api/v1/campuses?type=${o.config.userMode}`,{method:"GET"});if(!e.ok){Toastify({text:"Failed to load campuses",duration:3e3,gravity:"bottom",position:"center",backgroundColor:"red"}).showToast();return}const a=await e.json();this.campuses=a.data,Toastify({text:"Campuses loaded",duration:3e3,gravity:"bottom",position:"center",backgroundColor:"green"}).showToast()},async saveCampus(e){var a="Campus saved",t="green";if(e.newly_created===!0){var i=await o.fetch("/api/v1/campuses",{method:"POST",credentials:"same-origin",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)});i.ok?(delete e.newly_created,e.id=(await i.json()).data.id):(a="Failed to save campus",t="red")}else{var i=await o.fetch(`/api/v1/campuses/${e.id}`,{method:"PATCH",credentials:"same-origin",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)});i.ok||(a="Failed to save campus",t="red")}Toastify({text:a,backgroundColor:t,duration:3e3,gravity:"bottom",position:"center"}).showToast()},async addCampus(){this.campuses.push({id:null,name:"",description:"",slug:"",type:"users",newly_created:!0})},async deleteCampus(e){if(confirm("Are you sure you'd like to delete this campus?")){var a="Campus deleted",t="green";if(e.newly_created===void 0){var i=await o.fetch(`/api/v1/campuses/${e.id}`,{method:"DELETE",credentials:"same-origin",headers:{Accept:"application/json","Content-Type":"application/json"}});i.ok||(a="Failed to delete campus",t="red")}this.campuses=this.campuses.filter(n=>n.id!==e.id),Toastify({text:a,backgroundColor:t,duration:3e3,gravity:"bottom",position:"center"}).showToast()}}}));s.start();
