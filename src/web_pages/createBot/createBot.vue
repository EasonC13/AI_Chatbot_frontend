<template>
    <div class="wrapper dashboard-page">
        <div class="page-header dashboard-header">
            <parallax class="page-header-image"
                style="background-image: url('img/artificial-intelligence-robots-cyborg-with-infinity-symbol.jpg')">
            </parallax>
            <div class="content-center">
                <h1 class="title">Add New Bot</h1>
                <p class="h3">{{status}}</p>
            </div>
        </div>
        <div class="container" v-if="method==undefined">
            <br>
            <h2>You can choose one of the following way:</h2>
            <div class="row">
                <div class="col-0 col-md-1"></div>
                <div class="col-12 col-md-5">
                    <div class="card hoverable-card">
                        <img class="card-img-top" width="90%"
                        src='img/artificial-intelligence-robots-cyborg-with-infinity-symbol.jpg' alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">Add New Bot By Token</h5>
                            <p class="card-text">
                                Follow the instruction to get Telegram bot's Token from Bot Father.
                                Then paste it to the system.
                            </p>
                            <button class="btn btn-primary"
                             @click="create_by_token">Add By Token</button>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-5">
                    <div class="card hoverable-card">
                        <img class="card-img-top" src='img/artificial-intelligence-robots-cyborg-with-infinity-symbol.jpg' alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">Create New Bot By One Click</h5>
                            <p class="card-text">System will use your Telegram account by user-bot api to create your bot.
                                You need to provide login code to done this. All process is secure and open source at 
                                <a class="font-italic">Github</a>.
                            </p>
                            <button class="btn btn-default"
                            @click="create_bot_by_one_click">Create By one-click</button>
                        </div>
                    </div>
                </div>
                <div class="col-0 col-md-1"></div>
            </div>
        </div>
        <div v-if="method=='create_by_token'">
            <createByToken></createByToken>   
        </div>
    </div>
</template>
<script>
import createByToken from "./createByToken.vue"

export default {
    name: 'createBot',
    bodyClass: 'createBot',
    components: {
        createByToken,
    },
    data() {
      return {
          method: undefined,
          status: "Choose Your Method"
      }
    },
    methods: {
        create_by_token: function(){
            this.method = "create_by_token"
            this.status = "Create Bot By Token"
        },
        create_bot_by_one_click: function(){
            alert("Sorry, this method is not avaliable yet.\nComing soon...")
        }
    }
}
</script>
<style>
    .hoverable-card:hover{background:#fff;border:1px solid #0059a9}
</style>