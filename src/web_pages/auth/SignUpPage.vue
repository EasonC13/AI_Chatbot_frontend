<template>
    <div class="page-header header-filter" filter-color="black">
        <div class="page-header-image"
             style="background-image: url('img/artificial-intelligence-robots-cyborg-with-infinity-symbol.jpg')">
        </div>
        <div class="content">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 ml-auto mr-auto">
                        <div class="info info-horizontal">
                            <div class="icon icon-primary">
                                <i class="now-ui-icons media-2_sound-wave"></i>
                            </div>
                            <div class="description">
                                <h5 class="info-title">Marketing</h5>
                                <p class="description">
                                    We've created the marketing campaign of the website. It was a very interesting
                                    collaboration.
                                </p>
                            </div>
                        </div>
                        <div class="info info-horizontal">
                            <div class="icon icon-primary">
                                <i class="now-ui-icons media-1_button-pause"></i>
                            </div>
                            <div class="description">
                                <h5 class="info-title">Fully Coded in HTML5</h5>
                                <p class="description">
                                    We've developed the website with HTML5 and CSS3. The client has access to the code
                                    using GitHub.
                                </p>
                            </div>
                        </div>
                        <div class="info info-horizontal">
                            <div class="icon icon-info">
                                <i class="now-ui-icons users_single-02"></i>
                            </div>
                            <div class="description">
                                <h5 class="info-title">Built Audience</h5>
                                <p class="description">
                                    There is also a Fully Customizable CMS Admin Dashboard for this product.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mr-auto">
                        <div class="card card-signup">
                            <div class="card-body">
                                <h4 class="card-title text-center">Register By Social Media</h4>
                                <div class="social text-center">
                                    <n-button round icon class="btn-twitter">
                                        <i class="fab fa-twitter"></i>
                                    </n-button>
                                    <n-button round icon class="btn-dribbble">
                                        <i class="fab fa-dribbble"></i>
                                    </n-button>
                                    <n-button round icon class="btn-facebook">
                                        <i class="fab fa-facebook"> </i>
                                    </n-button>
                                    <h5 class="card-description"> or register </h5>
                                </div>
                                <fg-input addon-left-icon="now-ui-icons ui-1_email-85"
                                          v-model="form.email"
                                          placeholder="Your Email...">
                                </fg-input>

                                <fg-input addon-left-icon="now-ui-icons text_caps-small"
                                          v-model="form.password"
                                          placeholder="Password..." type="password">
                                </fg-input>

                                <fg-input addon-left-icon="now-ui-icons text_caps-small"
                                          v-model="form.confirm_password"
                                          placeholder="Confirm Password..." type="password">
                                </fg-input>

                                <!-- <n-checkbox v-model="form.agree">
                                    I agree to the terms and
                                    <a href="#something">conditions</a>.
                                </n-checkbox> -->
                                <div class="card-footer text-center">
                                    <button class="btn btn-primary btn-round btn-lg" @click="signUp">Get Started</button>
                                </div>
                                <div class="pull-right text-right">
                                    <p class="h5">
                                        <router-link :to="'login'" class="link footer-link">Already have an account?<br> Click me to Login</router-link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <main-footer></main-footer>
    </div>
</template>
<script>
  import { Card, Button, FormGroupInput, Checkbox } from '@/components';
  import MainFooter from '@/layout/MainFooter';
  import firebase from 'firebase';

  export default {
    name: 'signup-page',
    bodyClass: 'signup-page',
    components: {
      Card,
      MainFooter,
      [Button.name]: Button,
      [Checkbox.name]: Checkbox,
      [FormGroupInput.name]: FormGroupInput
    },
    data() {
      return {
        form: {
            email: '',
            password: '',
            confirm_password: ''
        }
      }
    },
    methods: {
      signUp: function() {
        if(this.form.password != this.form.confirm_password){
          alert("Password must be same.")
          return 0
        }else if(this.form.password == ""){
          alert("Password Can't be empty")
          return 0
        }
        firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password).then(
          (user) => {
            alert("register success.")
            this.$router.replace('home')
            //Welcome Page TBD.
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    }
  }
</script>
<style>
</style>
