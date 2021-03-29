<template lang="">
    <div>
        <div id="tables">
            <div class="row">
                <div class="col-md-12 ml-auto mr-auto">
                    <card class="card-plain">
                        <div class="row">
                            <div class="col-sm-12">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Picture</th>
                                        <th scope="col">Display Name</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in bots_list" :key="index">
                                            <th scope="row">{{index}}</th>
                                            <th scope="row">
                                                <img class="profile_img" 
                                                :src="get_b64_encoded_img(item['profile_pic'])" 
                                                alt="Picture" />
                                            </th>
                                            <td>{{item["display_name"]}}</td>
                                            <td>{{item["tg_username"]}}</td>
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
                                                    <n-button type="danger" size="sm" icon>
                                                        <i class="now-ui-icons ui-1_simple-remove"></i>
                                                    </n-button>
                                                </el-tooltip>
                                            </td>
                                        </tr>
                                        <tr @click="trigger_add_new_bot">
                                            <th scope="row">-</th>
                                            <td>-</td>
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
                                <b-collapse id="collapse-1" class="mt-2">
                                    <b-card>
                                    <p class="card-text">Collapse contents Here</p>
                                    <b-button v-b-toggle.collapse-1-inner size="sm">Toggle Inner Collapse</b-button>
                                    <b-collapse id="collapse-1-inner" class="mt-2">
                                        <b-card>Hello!</b-card>
                                    </b-collapse>
                                    </b-card>
                                </b-collapse>
                            </div>
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
const axios = require('axios');
export default {
    name: 'myChats',
    bodyClass: 'myChats',
    components: {
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
            bots_list: []
        }
    },
    methods:{
        gapi_user_load: async function(){
            console.log("WINDOW", window)
            console.log("USER", window.user)
            window.axios = axios
            let user_email = window.user.getBasicProfile().getEmail()
            console.log("EMEMEM" , user_email)
            axios.get(`https://chatbot.eason.tw/api/v1/get/avaliable_bots?user_email=${user_email}`)
                .then(response => {
                    console.log(response.data)
                    this.bots_list = response.data
                    
                })

        },
        trigger_add_new_bot: function(){
            document.getElementById("add_new_bot_button").click()
        },
        get_b64_encoded_img: function(code){
            let b64_prefix = "data:image/png;base64, "
            return b64_prefix + code
        }
    }
}
</script>
<style>
.draw_share_atooltip{
    color: red;
}

.profile_img{
    height: 3em
}
</style>


