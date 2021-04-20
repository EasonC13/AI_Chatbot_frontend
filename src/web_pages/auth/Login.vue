<template>
    <div class="page-header header-filter" filter-color="black">
        <div class="page-header-image"
             style="background-image: url('img/artificial-intelligence-robots-cyborg-with-infinity-symbol.jpg')">
        </div>
        <div class="content">
            <div class="container">
                <div class="col-md-5 ml-auto mr-auto">
                    <card type="login" plain>
                        <!-- <div slot="header" class="logo-container">
                            <img v-lazy="'img/now-logo.png'" alt="">
                        </div> -->
                        <div slot="header">
                            <h3>Accompany AI Chat</h3>
                        </div>


                        <fg-input class="no-border input-lg"
                                  addon-left-icon="now-ui-icons users_circle-08"
                                  v-model="form.email"
                                  placeholder="Email...">
                        </fg-input>

                        <fg-input class="no-border input-lg"
                                  addon-left-icon="now-ui-icons text_caps-small"
                                  v-model="form.password"
                                  placeholder="Password..." type="password">
                        </fg-input>
                        <div class="card-footer text-center" @click="login">
                                <a href="#pablo" class="btn btn-primary btn-round btn-lg btn-block">Get Started</a>
                            </div>
                        <p class="h4">
                              Or Sign In with Google<br><br>
                              <button @click="socialLogin" class="social-button">
                                <img alt="Google Logo" src="img/google_icon.png">
                              </button>
                            </p>
                        <template slot="raw-content">
                            
                            
                            <div class="pull-left">
                                <h6>
                                    <router-link :to="'signup'" class="link footer-link">Create Account</router-link>
                                </h6>
                            </div>
                            <div class="pull-right">
                                <h6>
                                    <a href="#pablo" class="link footer-link">Need Help?</a>
                                </h6>
                            </div>
                        </template>
                        
                    </card>
                </div>
            </div>
        </div>
        <main-footer></main-footer>
    </div>
</template>
<script>
  import { Card, Button, FormGroupInput } from '@/components';
  import MainFooter from '@/layout/MainFooter';
  import firebase from 'firebase';
  export default {
    name: 'login-page',
    bodyClass: 'login-page',
    components: {
      Card,
      MainFooter,
      [Button.name]: Button,
      [FormGroupInput.name]: FormGroupInput
    },
    data() {
      return {
        form: {
            email: '',
            password: '',
        }
      }
    },
    methods: {
        login: function() {
        firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password).then(
          (user) => {
            this.$router.replace('online/dashboard')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      },
      socialLogin: function() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
          this.$router.replace('home');
        }).catch((err) => {
          alert('Oops. ' + err.message)
        });
      }
    }
  }
</script>
<style scoped>
  .social-button {
    width: 3em;
    background: white;
    padding: 10px;
    border-radius: 100%;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    outline: 0;
    border: 0;
  }
  .social-button:active {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  }
  .social-button img {
    width: 100%;
  }
</style>
