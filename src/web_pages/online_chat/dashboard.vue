<template>
    <div class="wrapper dashboard-page">
        <div class="page-header dashboard-header">
            <parallax class="page-header-image"
                style="background-image: url('/img/artificial-intelligence-robots-cyborg-with-infinity-symbol.jpg')">
            </parallax>
            <div class="content-center">
                <h1 class="title">Dashboard</h1>
                <h3>Manage Your Chatroom and Chatbot</h3>
            </div>
        </div>
        <div>
            <div class="overview-block container align-items-center">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-4">
                        <div class="card badge-block">
                            <i class="fas fa-list"></i>
                            <p class="badge-block__title">Messages Recieve</p>
                            <p v-text="'2560'"></p>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-4">
                        <div class="card badge-block">
                            <i class="fas fa-check-square"></i>
                            <p class="badge-block__title">Messages Send</p>
                            <p v-text="'521'"></p>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-4">
                        <div class="card badge-block">
                            <i class="far fa-calendar-alt"></i>
                            <p class="badge-block__title">Own Bots</p>
                            <p v-text="'5'"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <ul role="tablist" class="nav justify-content-center row" id="dashboard-nav">
                    <li class="nav-item"><a href="#my_chats" role="tab" class="nav-link">My Chats</a></li>
                    <li class="nav-item"><a href="#my_bots" role="tab" class="nav-link">My Bots</a></li>
                </ul>
                <myChats v-if="$route.hash=='#my_chats' | $route.hash==''"></myChats>
                <myBots v-if="$route.hash=='#my_bots'"></myBots>
            </div>
        </div>
        
    </div>
</template>

<script>
  import { Card, Button, FormGroupInput, Tabs, TabPane } from '@/components';
  import myBots from "./myBots.vue"
  import myChats from "./myChats.vue"
  export default {
    name: 'dashboard',
    bodyClass: 'dashboard',
    components: {
      Card,
      Tabs,
      TabPane,
      [Button.name]: Button,
      [FormGroupInput.name]: FormGroupInput,
      myBots, myChats
    },
    data() {
      return {
        form: {
          firstName: '',
          email: '',
          message: ''
        }
      }
    },
    methods: {
        check: function(){
            console.log(this.$route)
        }
    },
  }
</script>
<style>
/* .body{
    background-color: #f7f9fb;
} */
#dashboard-nav > li > a {
    font-size: 200%;
    display:inline-table;
    color: black;
}
.overview-block{
    margin:30px auto;
}
.badge-block{
    -webkit-border-radius:6px;
    -moz-border-radius:6px;
    border-radius:6px;
    box-shadow:0 3px 6px 0 rgba(0,0,0,.1);
    background:#fff;
    border:1px solid transparent;
    text-align:center;word-break:break-word;vertical-align:top;padding:24px;font-size:30px}
.badge-block:hover{background:#fff;border:1px solid #0059a9}
.badge-block .badge-block__title{
    font-size:18px;
    margin-top:8px
    }

    
</style>