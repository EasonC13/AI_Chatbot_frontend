<template>
    <div>
        <div class="container text-center justify-content-center">
            <div style="height:20vh"></div>
            <p class="h1">
                404 Page Not Found
            </p>
            <button class="btn btn-primary" @click="go_home">
                Go To Home Page
            </button>
            <button class="btn btn-link btn-primary" @click="go_back">
                Go Back To Previous Page
            </button>
        </div>
    </div>
    
    
</template>
<script>
  export default {
    name: 'NotFound',
    bodyClass: 'NotFound',
    components: {
    },
    data() {
      return {
      }
    },
    methods: {
        go_home: function(){
            window.location.replace(window.origin)
        },
        go_back: function(){
            history.go(-1)
        }
    }
}
</script>
<style scoped>
    .starter-page {
        min-height: calc(100vh - 79px)
    }
</style>
