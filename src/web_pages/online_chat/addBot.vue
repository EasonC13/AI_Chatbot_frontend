<template lang="">
    <div>
        <b-collapse id="collapse-1" class="mt-2">
            <b-card>
                <b-card-title>Avaliable Bots:</b-card-title>
                <p class="card-text">Select the bot to add them to your chats.</p>
                <div class="container">
                    <div class="row addbot_avaliable_bots">
                        <div class="col-4 col-xl-1 col-sm-3 col-md-2 col-lg-2" @click="createNewBot">
                            <img class="profile_img" 
                            src="https://i.imgur.com/cuylOpA.png" 
                            alt="Picture" />
                            <p>Create New Bot</p>
                        </div>
                        <div v-for="(item, index) in get_bots_list" :key="item['picture_url']"
                        class="col-4 col-xl-1 col-sm-3 col-md-2 col-lg-2"
                        :id="get_addBot_id(item)"
                        @click="selectBot(item)">
                            <img class="profile_img" 
                            :src="(item['picture_url'])" 
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
    props: {
        already_have_bots: Array,
        parent_new_bots_list: Array,
    },
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
    computed: {
        get_bots_list: function(){
            return this.bots_list.filter(
                obj => !this.already_have_bots.includes(obj.picture_url)
            )
        }
    },
    watch:{
        parent_new_bots_list: function(){
            this.get_bots_list.forEach(item => {
                console.log(this.get_addBot_id(item))
                let target = document.getElementById(this.get_addBot_id(item))
                if(target){
                    if(this.parent_new_bots_list.includes(item.picture_url)){
                        target.classList.add("bg-light")
                        target.classList.add("selected")
                    }else{
                        target.classList.remove("bg-light")
                        target.classList.remove("selected")
                    }
                }
            })
        }
    },
    methods:{
        my_chats_load: function(){
            console.log("LOAD")
            let user_email = window.user.getBasicProfile().getEmail()
            console.log(process.env)
            axios.get(`${process.env.VUE_APP_API_URL}/api/webchat/get/avaliable_bot?user_email=${user_email}`)
                .then(response => {
                    console.log(response.data)

                    this.bots_list = response.data
                    
                })
        },
        selectBot: function(item){
            console.log("already_have_bots", this.already_have_bots)
            let target = document.getElementById(this.get_addBot_id(item))
            if(target.classList.contains('selected')){
                this.$emit("unSelectBot", item)
                // target.classList.remove("bg-light")
                // target.classList.remove("selected")
            }else{
                this.$emit("selectBot", item)
                // target.classList.add("bg-light")
                // target.classList.add("selected")
            }
        },
        get_addBot_id(item){
            let text = "addBot_id_" + item["picture_url"] + item["create_time"]
            return text
        },
        createNewBot(){
            window.open(window.location.origin+"/online/newbot")
        }
    }
}
</script>
<style>
    .addbot_avaliable_bots{
      text-align: center;
    }
</style>