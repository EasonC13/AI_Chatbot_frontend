<template>
    <navbar position="fixed"
            :transparent="transparent"
            :color-on-scroll="colorOnScroll"
            menu-classes="ml-auto">
        <!-- <template slot-scope="{toggle, isToggled}"> -->
        <template>
                <router-link v-popover:popover1 class="navbar-brand" to="/">
                    Accompany AI Chat
                </router-link>
                <!-- <el-popover
                        ref="popover1"
                        popper-class="popover"
                        placement="bottom"
                        width="200"
                        trigger="hover">
                    <div class="popover-body">Create by EasonC13</div>
                </el-popover> -->
        </template>
        <template slot="navbar-menu">
            <li class="nav-item">
                <nav-link class="nav-link" to="/home">
                    <i class="now-ui-icons objects_globe"></i>
                    Home
                </nav-link>
            </li>
            
            <drop-down tag="li" title="Dashboard" icon="now-ui-icons tech_tv" class="nav-item">
                <li class="nav-item">
                    <nav-link to="/online/dashboard#my_chats">
                    <i class="now-ui-icons ui-1_send"></i> My Chats
                </nav-link>
                </li>
                
                <nav-link to="/online/dashboard#my_bots">
                    <i class="now-ui-icons ui-1_send"></i> My Bots
                </nav-link>
            </drop-down>

            
        </template>

        <template slot="navbar-menu" v-if="user == undefined">
            <li class="nav-item">
                <div class="nav-link">
                    <router-link :to="'/login'" class="link footer-link">Login</router-link>
                </div>
            </li>
            <li class="nav-item">
                <div class="nav-link">
                    <router-link :to="'/signup'" class="link footer-link">Create Account</router-link>
                </div>
            </li>
        </template>
        <template slot="navbar-menu" v-if="user != undefined">
                      
            <drop-down tag="li" :title="' Welcome ' + this.userEmail"
            icon="now-ui-icons users_single-02" class="nav-item lower">
                <nav-link to="/">
                    <i class="now-ui-icons users_circle-08"></i>My Account
                </nav-link>
                <nav-link to="/">
                    <i class="now-ui-icons ui-1_settings-gear-63"></i> Perference
                </nav-link>
            </drop-down>
            <li class="nav-item">
                <div class="nav-link">
                    <a href="#" @click="onSignOut();">Sign out</a>
                </div>
            </li>
        </template>
    </navbar>
</template>
<style>
.lower{
    text-transform: none;
}
</style>
<script>
  import { DropDown, NavbarToggleButton, Navbar } from '@/components';
  import { Popover } from 'element-ui'
  import firebase from "firebase"
  import NavLink from '../components/Navbar/NavLink.vue';
  export default {
    name: 'main-navbar',
    props: {
      transparent: Boolean,
      colorOnScroll: Number,
    },
    data: function(){
        return {
            window: window,
            user: undefined,
            not_login: true,
        }
    },
    computed: {
        userEmail: function(){
            return window.fbuser.providerData[0]["email"]
            if(this.user.getEmail){
                return this.user.getEmail()
            }
            console.log("UUU",this.user)
            return ""
        }
    },
    components: {
      DropDown,
      Navbar,
      NavbarToggleButton,
      NavLink,
      [Popover.name]: Popover
    },
    mounted() {
        this.user = firebase.auth().currentUser;
        window.fbuser = firebase.auth().currentUser;
    },
    created() {
    },
    beforeDestroy() {
    },
    methods:{
        onSignOut(){
            firebase.auth().signOut().then(function() {
                location.reload()
            })
        }
    }
  }
</script>

<style scoped>

</style>
