<template lang="">
    <div>
        <div id="tables">
            <div class="row">
                <div class="col-md-12 ml-auto mr-auto">
                    <card class="card-plain">
                        <div class="row">
                            <div class="col-sm-12">
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
                                            <tr @click="trigger_add_new_bot">
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
                                
                                <b-collapse id="collapse-1" class="mt-2">
                                    <addBot @selectBot="add_bot_event" @unSelectBot="remove_bot_event"></addBot>
                                </b-collapse>
                            </div>
                        </div>
                        <div class="col text-center">
                            <button type="button" class='btn btn-primary'>Save Changes</button>
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
const axios = require('axios');
export default {
    name: 'myChats',
    bodyClass: 'myChats',
    components: {
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
            bots_list: [],
            new_bots_list: []
        }
    },
    methods:{
        gapi_user_load: async function(){
            window.axios = axios
            let user_email = window.user.getBasicProfile().getEmail()
            axios.get(`https://chatbot.eason.tw/api/v1/get/avaliable_bots?user_email=${user_email}`)
                .then(response => {
                    console.log(response.data)
                    this.bots_list = response.data
                    const event = new Event('my-chats-loaded');
                    window.dispatchEvent(event);
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


