<template>
    <navbar position="fixed"
            :transparent="transparent"
            :color-on-scroll="colorOnScroll"
            menu-classes="ml-auto">
        <template slot-scope="{toggle, isToggled}">
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
                <a class="nav-link" href="/home">
                <i class="now-ui-icons objects_globe"></i>
                <p>Home</p>
                </a>
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

        <template slot="navbar-menu">
            <!-- <li class="nav-item">
                <div class="g-signin2 nav-link" data-onsuccess="onSignIn">
                    <p>Login</p>
                </div>
            </li> -->
            <li class="nav-item" v-show="user == undefined">
                <div id="google-signin-btn" class="nav-link">
                </div>
            </li>
        </template>
        <template slot="navbar-menu" v-if="user != undefined">
                      
            <drop-down tag="li" :title="' Welcome '+this.user.getBasicProfile().getEmail()"
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
  import { DropDown, NavbarToggleButton, Navbar, NavLink } from '@/components';
  import { Popover } from 'element-ui'
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
        
    },
    created() {
        window.addEventListener('gapi-loaded', this.mount_google_sign_in);
    },
    beforeDestroy() {
        window.removeEventListener('gapi-loaded', this.mount_google_sign_in);
    },
    methods:{
        mount_google_sign_in(){
            gapi.signin2.render('google-signin-btn', { // this is the button "id"
                onsuccess: this.onSignIn // note, no "()" here
            })
        },
        Hi(){
            console.log(gapi)
            
        },
        onSignIn(googleUser){
            window.user = googleUser
            this.user = googleUser
            console.log(this.not_login)
            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
            const event = new Event('gapi-user-loaded');
            window.dispatchEvent(event);
        },
        onSignOut(){
            var auth2 = gapi.auth2.getAuthInstance();
            this.user = undefined;
            window.user = undefined;
            auth2.signOut().then(function () {
            console.log('User signed out.');
            });
        }
    }
  }
</script>

<style scoped>

</style>
