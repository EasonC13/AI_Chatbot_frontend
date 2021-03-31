<template lang="">
    <div>
        <div id="tables">
            <div class="row">
                <div class="col-md-12 ml-auto mr-auto">
                    <card class="card-plain">
                        <div class="row">
                            <div class="col-sm-12">
                                <myChatsNoBot v-if="no_bot" v-show="receiver_bot==undefined"></myChatsNoBot>
                                <div class="table-responsive" id="myChats_table">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                            <th scope="col">Picture</th>
                                            <th scope="col">Display Name</th>
                                            <!-- <th scope="col">Username</th> -->
                                            <th scope="col">Handle</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in bots_list" :key="index">
                                                
                                                <th scope="row">
                                                    <img class="profile_img" 
                                                    :src="item['picture_url']" 
                                                    alt="Picture" />
                                                </th>
                                                <td>{{item["display_name"]}}</td>
                                                <!-- <td>{{item["tg_username"]}}</td> -->
                                                <td>
                                                    <el-tooltip content="More Info"
                                                                :open-delay="300"
                                                                placement="top" effect="white">
                                                        <n-button type="info" size="sm" icon @click.native="Hi">
                                                            <i class="now-ui-icons users_single-02" ></i>
                                                        </n-button>
                                                    </el-tooltip>


                                                    <el-tooltip content="Settings"
                                                                :open-delay="300"
                                                                placement="top" effect="white">
                                                        <n-button type="success" size="sm" icon>
                                                            <i class="now-ui-icons ui-2_settings-90"></i>
                                                        </n-button>
                                                    </el-tooltip>

                                                    <el-tooltip content="Remove"
                                                                :open-delay="300"
                                                                placement="top" effect="white">
                                                        <n-button type="danger" size="sm" icon
                                                         @click.native="remove_bot_from_table_bots_list(item)">
                                                            <i class="now-ui-icons ui-1_simple-remove"></i>
                                                        </n-button>
                                                    </el-tooltip>
                                                </td>
                                            </tr>
                                            <tr v-for="(item, index) in new_bots_list" :key="'newbot'+index"
                                             class="bg-light">
                                                <th scope="row">
                                                    <img class="profile_img" 
                                                    :src="item['picture_url']" 
                                                    alt="Picture" />
                                                </th>
                                                <td>{{item["display_name"]}}</td>
                                                <!-- <td>{{item["tg_username"]}}</td> -->
                                                <td>
                                                    <el-tooltip content="More Info"
                                                                :open-delay="300"
                                                                placement="top" effect="white">
                                                        <n-button type="info" size="sm" icon @click.native="Hi">
                                                            <i class="now-ui-icons users_single-02" ></i>
                                                        </n-button>
                                                    </el-tooltip>


                                                    <el-tooltip content="Settings"
                                                                :open-delay="300"
                                                                placement="top" effect="white">
                                                        <n-button type="success" size="sm" icon>
                                                            <i class="now-ui-icons ui-2_settings-90"></i>
                                                        </n-button>
                                                    </el-tooltip>

                                                    <el-tooltip content="Remove"
                                                                :open-delay="300"
                                                                placement="top" effect="white">
                                                        <n-button type="danger" size="sm" icon
                                                         @click.native="remove_bot_from_table_new_bots_list(item)">
                                                            <i class="now-ui-icons ui-1_simple-remove"></i>
                                                        </n-button>
                                                    </el-tooltip>
                                                </td>
                                            </tr>
                                            <tr @click="trigger_add_new_bot" v-show="can_add_bot">
                                                <td>-</td>
                                                <td>-</td>
                                                <td>
                                                    <div>
                                                        <div>
                                                            <b-button
                                                                v-b-toggle.collapse-1
                                                                variant="success"
                                                                id="add_new_bot_button" v-show="false"></b-button>
                                                            <button class="btn btn-success">Add Bot</button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                                <b-collapse id="collapse-1" class="mt-2" v-show="can_add_bot">
                                    <addBot 
                                    @selectBot="add_bot_event" 
                                    @unSelectBot="remove_bot_event"
                                    :already_have_bots="get_bots_username_list"
                                    :parent_new_bots_list="get_new_bots_list"></addBot>
                                </b-collapse>
                            </div>
                        </div>
                        <div class="col text-center">
                            <button type="button" class='btn btn-primary' @click="save_changes_click">Save Changes</button>
                            <button type="button" class='btn btn-primary' @click="start_chat">Start Chat</button>
                            <button type="button" class='btn btn-link' @click="cancel">Cancel</button>
                        </div>
                        
                    </card>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import {Card, Button, Checkbox, Comment, FormGroupInput, Pagination} from '@/components';
import {Table, TableColumn, Tooltip, Popover} from 'element-ui';
import { BButton, BCard, BCollapse, VBToggle} from 'bootstrap-vue'
import addBot from "./addBot"
import myChatsNoBot from "./myChatsNoBot"

import Cookies from "js-cookie"
window.cookie = Cookies

const axios = require('axios');
export default {
    name: 'myChats',
    bodyClass: 'myChats',
    components: {
        myChatsNoBot,
        addBot,
        BButton,
        BCard,
        BCollapse,
        Card,
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Tooltip.name]: Tooltip,
        [Checkbox.name]: Checkbox,
        [Popover.name]: Popover,
        [Button.name]: Button,
        [FormGroupInput.name]: FormGroupInput,
        [Pagination.name]: Pagination,
        Comment
        },
    directives:{
      'b-toggle': VBToggle,
    },
    created() {
        if(window.user == undefined){
            window.addEventListener('gapi-user-loaded', this.gapi_user_load);
        }else{
            this.gapi_user_load()
        }
        
    },
    beforeDestroy() {
        window.removeEventListener('gapi-user-loaded', this.gapi_user_load);
    },
    mounted: function(){
        let bots_str = Cookies.get("bots")
        this.bots_list = JSON.parse(bots_str)
    },
    data() {
        return {
            receiver_bot: undefined,
            bots_list: [],
            new_bots_list: [],
            no_bot: undefined,
        }
    },
    computed: {
        get_bots_username_list: function(){
            let out = [];
            this.bots_list.forEach((el) => out.push(el.picture_url))
            return out
        },
        get_new_bots_list: function(){
            let out = [];
            this.new_bots_list.forEach((el) => out.push(el.picture_url))
            return out
        },
        can_add_bot: function(){
            let total_len = this.bots_list.length + this.new_bots_list.length
            console.log("total_len", total_len)
            return (total_len <= 4)
        }
    },
    methods:{
        gapi_user_load: async function(){
            window.axios = axios
            let user_email = window.user.getBasicProfile().getEmail()
            const event = new Event('my-chats-loaded');
            window.dispatchEvent(event);
                    
            // axios.get(`https://chatbot.eason.tw/api/webchat/get/avaliable_bot?user_email=${user_email}`)
            //     .then(response => {
            //         if(response.data.message == "fail, not found a receiver bot."){
            //             this.no_bot = true;
            //             console.log(response.data.message)
            //         }else{
            //             console.log(response)
            //             this.bots_list = response.data
            //             const event = new Event('my-chats-loaded');
            //             window.dispatchEvent(event);
            //         }
                    
            //     })

        },
        trigger_add_new_bot: function(){
            document.getElementById("add_new_bot_button").click()
        },
        get_b64_encoded_img: function(code){
            let b64_prefix = "data:image/png;base64, "
            return b64_prefix + code
        },
        add_bot_event: function(item){
            console.log("ADD BOT EVENT " , item)
            this.new_bots_list.push(item)
        },
        remove_bot_event: function(item){
            console.log("Remove BOT EVENT " , item)
            this.new_bots_list = this.new_bots_list.filter(function(obj){
                return obj["picture_url"] != item["picture_url"]
            })
        },
        remove_bot_from_table_bots_list: function(item){
            this.bots_list = this.bots_list.filter(function(obj){
                return obj["picture_url"] != item["picture_url"]
            })
        },
        remove_bot_from_table_new_bots_list: function(item){
            this.new_bots_list = this.new_bots_list.filter(function(obj){
                return obj["tg_username"] != item["tg_username"]
            })
        },
        save_changes_click: function(){
            let out = this.new_bots_list
            out = out.concat(this.bots_list)
            Cookies.set("bots", out, { expires: 777 })
        },
        cancel: function(){
            window.reload()
        },
        start_chat: function(){
            let bots_str = Cookies.get("bots")
            let bots_list = JSON.parse(bots_str)
            if(bots_list.length>0){
                window.open(window.location.origin+"/#/online/chatroom/")
            }
            
        }
    }
}
</script>
<style>
.draw_share_atooltip{
    color: red;
}
.profile_img{
    height: 3em;
    border-radius: 50%;
}
#myChats_table{
    margin-bottom: 0px !important;
}
</style>


