<template lang="">
    <div>
        <b-collapse id="collapse-1" class="mt-2">
            <b-card>
                <b-card-title>Avaliable Bots:</b-card-title>
                <p class="card-text">Select the bot to add them to your chats.</p>
                <div class="container">
                    <div class="row addbot_avaliable_bots">
                        <div v-for="(item, index) in bots_list" :key="item['tg_username']"
                        class="col-4 col-xl-1 col-sm-3 col-md-2 col-lg-2"
                        :id="get_addBot_id(item)"
                        @click="selectBot(item)">
                            <img class="profile_img" 
                            :src="get_b64_encoded_img(item['profile_pic'])" 
                            alt="Picture" />
                            <p>{{item["display_name"]}}</p>
                        </div>
                    </div>
                </div>

            <!-- <b-button v-b-toggle.collapse-1-inner size="sm">Toggle Inner Collapse</b-button>
            <b-collapse id="collapse-1-inner" class="mt-2">
                <b-card>Hello!</b-card>
            </b-collapse> -->
            </b-card>
        </b-collapse>
    </div>
</template>
<script>
import {Card, Button, Checkbox, Comment, FormGroupInput, Pagination} from '@/components';
import {Table, TableColumn, Tooltip, Popover} from 'element-ui';
import { BButton, BCard, BCollapse, VBToggle, BCardTitle} from 'bootstrap-vue'

const axios = require('axios');

export default {
    name: 'addBot',
    bodyClass: 'addBot',
    components: {
        BCardTitle,
        BButton,
        BCard,
        BCollapse,
        Card
    },
    directives:{
      'b-toggle': VBToggle,
    },
        created() {
        if(window.user == undefined){
            window.addEventListener('my-chats-loaded', this.my_chats_load);
        }else{
            this.my_chats_load()
        }
        
    },
    beforeDestroy() {
        window.removeEventListener('my-chats-loaded', this.my_chats_load);
    },
    data() {
      return {
          bots_list: [],
      }
    },
    methods:{
        my_chats_load: function(){
            console.log("LOAD")
            let user_email = window.user.getBasicProfile().getEmail()
            axios.get(`https://chatbot.eason.tw/api/v1/get/avaliable_bots?user_email=${user_email}`)
                .then(response => {
                    console.log(response.data)
                    this.bots_list = response.data
                })
        },
        get_b64_encoded_img: function(code){
            let b64_prefix = "data:image/png;base64, "
            return b64_prefix + code
        },
        selectBot: function(item){
            let target = document.getElementById(this.get_addBot_id(item))
            if(target.classList.contains('selected')){
                this.$emit("unSelectBot", item)
                target.classList.remove("bg-light")
                target.classList.remove("selected")
            }else{
                this.$emit("selectBot", item)
                target.classList.add("bg-light")
                target.classList.add("selected")
            }
            
        },
        get_addBot_id(item){
            return "addBot_id_" + item["tg_username"]
        }
    }
}
</script>
<style>
    .addbot_avaliable_bots{
      text-align: center;
    }
</style>