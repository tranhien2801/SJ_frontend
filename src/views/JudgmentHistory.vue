<template>
    <main>
     <div class="container-fluid">
       <div class="page-header min-height-300" style="background-image: url('https://anle.toaan.gov.vn/services/anlenew/images/slide.jpg');
                   margin-right: -24px;
                   margin-left: -34%;
                 ">
         <span class="mask bg-gradient-success opacity-6"></span>
       </div>
     </div>
     <div class="mt-n11 py-4 container-fluid">
       <div class="row">
       <judgment-history-card :response="response" />
     </div>
 </div>
 </main>
 </template>
 
 <script>
 import JudgmentHistoryCard from "./components/JudgmentHistoryCard.vue";
 
 export default {
   name: "JudgmentHistory",
   components: {
    JudgmentHistoryCard,
   },
   data() {
     return {
     };
   },
   created() {
     this.$store.state.showSidenav = false;
   },
   mounted() {
     this.$store.state.isAbsolute = true;
   },
   beforeUnmount() {
     this.$store.state.hideConfigButton = false;
     this.$store.state.showSidenav = true;
   },
 };
 </script>
 