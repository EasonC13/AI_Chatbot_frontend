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
        <div class="container" v-show="step==1">
            <br>
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Create New Bot</h5>
                            <div>
                                <label>Name: </label>
                                <input type="text" class="form-control" v-model="newBotName" placeholder="what is this bot's name?">
                                <small id="" class="form-text text-muted">We will never share your token to anyone else. <a href="#">How to get token?</a></small>
                            </div>
                            <div>
                                <label>Bot Photo: </label>
                                <input type="file" class="form-control"
                                id="createBotOnlineUploadPhoto" name="img" accept="image/*">
                                <br>
                            </div>
                            <div>
                                <label type="">Is Public: </label>
                                <n-switch v-model="is_public" 
                                on-text="Yes" off-text="No"></n-switch>
                                <small><a href="#">What is the different of public or not?</a></small>
                            </div>
                            
                            <button class="btn btn-primary"
                            @click="create_bot">Next</button>
                            <button class="btn btn-link"
                            @click="closeWindow">Cancel</button>
                        </div>
                    </div>
                </div>
                <div class="col-0 col-md-1"></div>
            </div>
        </div>
        <div class="container" v-show="step==2">
            <br>
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div>
                                <img :src="picture" class="profile_img" />
                            </div>
                            <div>
                                <p class="h5">{{newBotName}}</p>
                            </div>
                            <div>
                                <p>{{upload_status}}</p>
                            </div>
                            
                            
                            <button class="btn btn-primary"
                            @click="finish">Finish</button>
                            <button class="btn btn-default"
                            @click="back">back</button>
                            <button class="btn btn-link"
                            @click="closeWindow">Cancel</button>
                        </div>
                    </div>
                </div>
                <div class="col-0 col-md-1"></div>
            </div>
        </div>
    </div>
</template>
<script>
import {Switch} from '@/components';
import firebase from "firebase";
const axios = require('axios');
export default {
    name: 'createBotOnline',
    bodyClass: 'createBotOnline',
    components: {
        [Switch.name]: Switch,
    },
    data() {
      return {
          status: 'Please Fill This Form',
          step: 1,
          picture: undefined,
          newBotName: undefined,
          is_public: false,
          upload_status: "",
      }
    },
    methods: {
        create_bot: function(){

            
            let target = document.getElementById("createBotOnlineUploadPhoto")
            if(target.files && target.files[0]){
                var reader = new FileReader();
                let vue = this
                reader.onload = function(e) {
                    console.log("THIS", this)
                    vue.picture = e.target.result;
                }

                reader.readAsDataURL(target.files[0]); // convert to base64 string
            }
            
            

            this.status = "Check Bot's Info"
            this.step+=1
        },
        closeWindow: function(){
            window.close()
        },
        finish: function(){
            let vm = this
            vm.upload_status = "uploading the image, this might take a while..."
            var apiUrl = 'https://api.imgur.com/3/image';
            var apiKey = '78fd8589c7beb81';
            var formData = new FormData();
            let target = document.getElementById("createBotOnlineUploadPhoto")
            formData.append('image', target.files[0]);
            let headers =  {
            "Authorization": 'Client-ID ' + apiKey,
            "Accept": 'application/json',
            }
            console.log(headers)
            axios({
                method: "POST",
                url: apiUrl, 
                headers: headers,
                data: formData,
            }).then(response => {
                vm.upload_status = "upload to server..."
                let image_url = response.data.data.link
                let user_email = ""
                try{
                    user_email = firebase.auth().currentUser.email
                }catch(e){
                    user_email = "undefined"
                }
                let data = {
                    "creator": user_email,
                    "display_name": vm.newBotName,
                    "is_public": vm.is_public,
                    "picture_url": image_url
                }
                axios({
                    method: "post",
                    url: `${process.env.VUE_APP_API_URL}/api/webchat/add/newbot`, 
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
            })

        },
        back: function(){
            this.step -= 1;
        }
    }
}
</script>
<style>
    
</style>
