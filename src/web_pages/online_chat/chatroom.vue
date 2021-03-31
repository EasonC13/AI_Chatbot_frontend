<template lang="">
    <div>
        <div class="chatroom_chat_container"
        style="background-image: url('img/telegram_chat_background.jpeg')">

        <div style="height: 100vh" 
        v-if="already_messages.length + messages.length < 8"></div>
        <!-- 使用 Telegram 樣式 -->
        <div class="cu chat" data-style="telegram" id="chatroom">
            <div class="message text" v-for="(item, index) in already_messages" :key="'test'+index">
                <!-- 大頭貼 -->
                <div class="avatar">
                    <img src="https://i.pinimg.com/originals/26/26/0d/26260d6850d544d5d488bfe64f84ef38.jpg"/>
                </div>
                <!-- 內容 -->
                <div class="content">
                    <!-- 傳訊者 -->
                    <div class="author">
                        熊貓貓
                    </div>
                    <!-- 文字 -->
                    <div class="text">
                        <p>尼好，世界</p>
                    </div>
                    <!-- 中繼資料 -->
                    <div class="meta">
                        <div class="item">
                            13:20
                        </div>
                    </div>
                </div>
            </div>
            <div class="message text" v-for="(message, index) in messages" 
             :key="index" :id='message.random_id'>
                <!-- 大頭貼 -->
                <div class="avatar">
                    <img :src="message.author_img"/>
                </div>
                <!-- 內容 -->
                <div class="content">
                    <!-- 傳訊者 -->
                    <div class="author">
                        {{message.author}}
                    </div>
                    <!-- 文字 -->
                    <div class="text">
                        <p>{{message.text}}</p>
                    </div>
                    <!-- 中繼資料 -->
                    <div class="meta">
                        <div class="item">
                            {{message.time}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div id="input_area">
            <div>
                <span class="textarea" id="chatroom_span_text_area" role="textbox" contenteditable
                 v-on:keyup.enter="send_msg" v-model="input_text"></span>
            </div>
            <div id="send_button" @click="send_msg">
                <i class="now-ui-icons ui-1_send"></i>
            </div>
        </div>
    </div>
</template>
<script>
const axios = require('axios');
import Cookies from "js-cookie"

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class Message{
    constructor(text, author, author_img) {
        this.text = text
        var currentdate = new Date();
        this.time = currentdate.getHours() + ":" + currentdate.getMinutes()
        this.author = author
        this.author_img = author_img
        this.random_id = author_img + Math.random().toString(36).substring(7)
    }
}

export default {
    name: 'chatroom',
    bodyClass: 'chatroom',
    components: {
    },
    data() {
      return {
          already_messages: [],
          messages: [],
          input_text: ""
      }
    },
    computed: {
        username: function(){
            var profile = window.user.getBasicProfile();
            return profile.getName()
        },
        bots: function(){
            let bots_str = Cookies.get("bots")
            return JSON.parse(bots_str)
        }
    },
    methods: {
        send_msg: function(){
            let target = document.getElementById("chatroom_span_text_area")
            let out_text = target.textContent
            if(out_text.length == 0){
                return 0
            }
            target.textContent = ""
            console.log("SEND", out_text)
            
            var profile = window.user.getBasicProfile();
            let message = new Message(out_text, profile.getName(), profile.getImageUrl())
            this.messages.push(message)
            setTimeout(()=> {
                target = document.getElementById(message.random_id)
                target.scrollIntoView({behavior: "smooth"})
            }, 300)
            axios({
                method: "POST",
                url: "https://chatbot.eason.tw/api/webchat/generate_response", 
                headers: {
                        "accept": "application/json",
                        'Content-Type': 'application/json'
                },
                data: {
                    email: window.user.getBasicProfile().getEmail(),
                    text: out_text,
                    emotion: 1,
                    response_count: this.bots.length
                },
            }).then(response => {
                console.log(response.data)
                let bots = JSON.parse(Cookies.get("bots"))
                shuffle(bots)
                console.log(response.data)
                for(let i in response.data.responses){
                    console.log(i)
                    let text = response.data.responses[i]
                    console.log(text, bots[i].display_name, bots[i].picture_url)
                    let message = new Message(text, bots[i].display_name, bots[i].picture_url)
                    this.messages.push(message)
                }
                setTimeout(()=> {
                target = document.getElementById(message.random_id)
                target.scrollIntoView({behavior: "smooth"})
                }, 300)
            })
        }
    }
}
</script>
<style>
    #chatroom{
        height: 100%;
        padding-bottom: 11vh;
    }
    #input_area{
        position: fixed;
        bottom: 0px;
        width: 100%;
        background-color: white;
    }
    #input_area > span{

        width: 100%;
        height: 10vh;
        font-size: 2em;
    }
    #input_area > #send_button{
        position: absolute;
        right: 0px;
        top: 0px;
        height: 100%;
    }
    #input_area > #send_button > i{
        font-size: 3em;
    }
    #chatroom_chat_container{
        height:90vh;
        overflow-x:scroll;
    }
    .input,
    .textarea {
    border: 1px solid #ccc;
    font-family: inherit;
    font-size: inherit;
    padding: 1px 6px;
    }
    .textarea {
        display: block;
        width: 100%;
        overflow: hidden;
        resize: both;
        min-height: 40px;
        line-height: 20px;
        padding-right: 10%;
    }

    .textarea[contenteditable]:empty::before {
    content: "type something...";
    color: gray;
    }

    @media screen and (max-width: 479px) {
     /* start of phone styles */
     /* It's possible to hide the image if the screen becomes too small */
        #chatroom {
        padding-bottom: 20%;
        }
        .textarea {
            font-size: 200%;
        }
    }
</style>
