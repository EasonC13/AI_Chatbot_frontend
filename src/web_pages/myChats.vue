<template lang="">
    <div>
        <div id="tables">
            <div class="row">
                <div class="col-md-12 ml-auto mr-auto">
                    <card class="card-plain">
                        <div class="row">
                            <div class="col-sm-12">
                                <myChatsNoBot v-if="not_login">
                                    Not Login
                                </myChatsNoBot>
                                <div class="table-responsive" id="myChats_table" v-if="receiver_bot">
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
                                            <tr>
                                                <th scope="row">
                                                    <img class="profile_img" 
                                                    :src="get_b64_encoded_img(receiver_bot['profile_pic'])" 
                                                    alt="Picture" />
                                                </th>
                                                <td>
                                                    {{receiver_bot["display_name"]}}
                                                </td>
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
                                                </td>
                                            </tr>
                                            <tr v-for="(item, index) in bots_list" :key="index">
                                                
                                                <th scope="row">
                                                    <img class="profile_img" 
                                                    :src="get_b64_encoded_img(item['profile_pic'])" 
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
                                                    :src="get_b64_encoded_img(item['profile_pic'])" 
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
                                            <tr @click="trigger_add_new_bot" v-show="can_add_bot" v-if="receiver_bot">
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
                        <div class="col text-center" v-if="receiver_bot">
                            <button type="button" class='btn btn-primary' @click="save_changes_click">Save Changes</button>
                            <button type="button" class='btn btn-link'>Cancel</button>
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
    mounted: async function(){
    },
    data() {
        return {
            receiver_bot: undefined,
            bots_list: [],
            new_bots_list: [],
            not_login: undefined,
        }
    },
    computed: {
        get_bots_username_list: function(){
            let out = [];
            this.bots_list.forEach((el) => out.push(el.tg_username))
            return out
        },
        get_new_bots_list: function(){
            let out = [];
            this.new_bots_list.forEach((el) => out.push(el.tg_username))
            return out
        },
        can_add_bot: function(){
            let total_len = this.bots_list.length + this.new_bots_list.length
            console.log("total_len", total_len)
            return (total_len <= 3)
        }
    },
    methods:{
        gapi_user_load: async function(){
            window.axios = axios
            let user_email = window.user.getBasicProfile().getEmail()
            axios.get(`https://chatbot.eason.tw/api/v1/get/myChats?user_email=${user_email}`)
                .then(response => {
                    if(response.data.message == "fail, not found a receiver bot."){
                        this.not_login = true;
                        console.log(response.data.message)
                    }else{
                        this.receiver_bot = response.data.receivers[0].receiver_bot
                        this.bots_list = response.data.receivers[0].other_bots
                        const event = new Event('my-chats-loaded');
                        window.dispatchEvent(event);
                    }
                    
                })

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
                return obj["tg_username"] != item["tg_username"]
            })
        },
        remove_bot_from_table_bots_list: function(item){
            console.log("QQQQ")
            this.bots_list = this.bots_list.filter(function(obj){
                return obj["tg_username"] != item["tg_username"]
            })
        },
        remove_bot_from_table_new_bots_list: function(item){
            this.new_bots_list = this.new_bots_list.filter(function(obj){
                return obj["tg_username"] != item["tg_username"]
            })
        },
        save_changes_click: function(){
            let user_email = window.user.getBasicProfile().getEmail()
            let response_bots_username = this.get_bots_username_list
            response_bots_username = response_bots_username.concat(this.get_new_bots_list)
            let data = JSON.stringify({
                    "user_email": user_email,
                    "target_bot_username": this.receiver_bot["tg_username"],
                    "response_bots_username": response_bots_username
                })
            axios({
                method: "post",
                url: `https://chatbot.eason.tw/api/v1/set/receiver`, 
                header: {
                    "accept": "application/json",
                    'Content-Type': 'application/json'
                },
                data: data,
            }).then(response => {
                    console.log(response)
                    if(response.data.message.includes("success")){
                        location.reload()
                    }else{
                        alert(response.data.message)
                    }
                    // location.reload()
                })
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


