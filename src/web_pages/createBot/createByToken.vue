<template lang="">
    <div class="container">
        <br>
        <div class="card" v-if="step=='submit_token'">
            <div class="card-body">
                
                <div>
                    <label>Your Token</label>
                    <input type="text" class="form-control" v-model="bot_token" placeholder="Paste your token here...">
                    <small id="" class="form-text text-muted">We will never share your token to anyone else. <a href="#">How to get token?</a></small>
                </div>
                <button class="btn" id="createByTokenSubmitToken"
                @click="submt_token" disabled>Submit</button>
            
            </div>
        </div>
        <div class="card" v-else-if="step=='confirm_add'">
            <div class="card-body">
                <p>Are you want to add this bot?</p>
                <div class="">
                    <div v-if="bot['can_join_groups'] == false"
                    class="alert alert-danger">
                        <div class="container">[warning] Please enable your bot to join groups by BotFather. Then try again. <a href="#">How?</a></div>
                    </div>
                    <div v-if="bot['can_read_all_group_messages'] == false"
                    class="alert alert-danger">
                        <div class="container">Please enable your bot to read all group messages by BotFather. Then try again. <a href="#">How?</a></div>
                    </div>
                    <div>
                        <img class="createByToken_profile_img" 
                        :src="get_b64_encoded_img(bot['profile_pic'])" 
                        alt="Picture" />
                    </div>
                    <br>
                    <div>
                        <p>Name: {{bot["first_name"]}}</p>
                    </div>
                    <div>
                        <p>ID: @{{bot["username"]}}</p>
                    </div>
                    <badge type="default">Is Public: </badge>
                    <n-switch v-model="is_public" 
                    on-text="Yes" off-text="No"></n-switch>
                    <small><a href="#">What is the different of public or not?</a></small>
                </div>
                
                <button class="btn btn-success" id="createByTokenSubmitToken"
                @click="confirm_add_bot" >Confirm</button>
                <button class="btn btn-default" id="createByTokenSubmitToken"
                @click="cancel_add_bot" >Cancel</button>
            </div>
        </div>
    </div>
</template>
<script>
import {Switch} from '@/components';
const axios = require('axios');
export default {
    name: 'createByToken',
    bodyClass: 'createByToken',
    components: {
        [Switch.name]: Switch,
    },
    data() {
      return {
          bot_token: "",
          step: "submit_token",
          bot: undefined,
          is_public: false,
      }
    },
    watch: {
        bot_token: function(){
            let target = document.getElementById("createByTokenSubmitToken")
            if(this.bot_token.length > 40){
                target.classList.add("btn-primary")
                target.disabled = false
                target.focus()
            }else{
                target.classList.remove("btn-primary")
                target.disabled = true
            }
        }
    },
    methods: {
        submt_token: function(e){
            let data = JSON.stringify({
                "bot_token": this.bot_token
            })
            axios({
                method: "post",
                url: `https://chatbot.eason.tw/api/v1/get_bot_data_by_token/`, 
                header: {
                    "accept": "application/json",
                    'Content-Type': 'application/json'
                },
                data: data,
            }).then(response => {
                    console.log(response)
                    if(response.data.message.includes("success")){
                        this.bot = response.data.data
                        this.step = "confirm_add"
                    }else{
                        alert(response.data.message)
                    }
                    // location.reload()
                })
        },
        get_b64_encoded_img: function(code){
            let b64_prefix = "data:image/png;base64, "
            return b64_prefix + code
        },
        confirm_add_bot: function(){
            let user_email = window.user.getBasicProfile().getEmail()
            let data = JSON.stringify({
                "creator": user_email,
                "bot_token": this.bot_token,
                "is_public": this.is_public
            })
            axios({
                method: "post",
                url: `https://chatbot.eason.tw/api/v1/add_bot`, 
                header: {
                    "accept": "application/json",
                    'Content-Type': 'application/json'
                },
                data: data,
            }).then(response => {
                    console.log(response)
                    if(response.data.message.toLowerCase().includes("success")){
                        window.onunload = refreshParent;
                        function refreshParent() {
                            window.opener.location.reload();
                        }
                        window.close()
                    }else{
                        alert(response.data.message)
                    }
                    // location.reload()
                })
        },
        cancel_add_bot: function(){
            window.close()
        }
    },
}
</script>
<style>
    .createByToken_profile_img{
        height: 5em;
        border-radius: 50%;
    }
</style>