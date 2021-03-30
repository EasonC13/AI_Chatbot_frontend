<template lang="">
     <div class="col text-center">
         <p class="h1">You don't have any bot yet...</p>
        <button type="button" class='btn btn-success'
         @click="create_bot"><p class="display-4">Create Your First Bot</p></button>
    </div>
</template>
<script>
export default {
    name: 'myChatsNoBot',
    bodyClass: 'myChatsNoBot',
    components: {
    },
    mounted(){
        
    },
    data() {
      return {
      }
    },
    methods: {
        create_bot: function(){

            window.open(window.location.origin+"/#/new/bot")
        }
    }
}
</script>
<style>
    
</style>