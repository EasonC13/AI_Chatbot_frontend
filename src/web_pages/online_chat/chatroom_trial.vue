<template lang="">
    <div style="background-image: url('/img/telegram_chat_background.jpeg'); min-height: 100vh;">
        <div class="chatroom_chat_container">

        <div style="height: 10vh" 
        v-if="already_messages.length + messages.length < 12"></div>
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
            <div class="message text">
                <!-- 大頭貼 -->
                <div class="avatar">
                    <img src="https://i.imgur.com/OGPH5eF.png"/>
                </div>
                <!-- 內容 -->
                <div class="content">
                    <!-- 傳訊者 -->
                    <div class="author">
                        Eason
                    </div>
                    <!-- 文字 -->
                    <div class="text">
                        <p>您好，歡迎試用。在這裡您可以隨意與 AI 聊天機器人聊天。<br>如果想要自訂機器人或情緒，請
                            <a @click="sign_in" style="text-decoration: underline" href="#">點我登入後繼續</a>
                            <br><br>
                            使用上有任何回饋，歡迎來填寫回饋表單，填表抽現金，幫助平台持續改進！<br>
                            <a href="https://forms.gle/2kcaGhxJeLqqNWv89" style="text-decoration: underline" target="_blank">點我前往回饋表單</a>
                        </p>
                        <br><br>
                        <p>Hello, welcome to try. Here you can chat with AI chatbots.<br>
                        If you want to customize chatbots or emotions, please <a @click="sign_in" style="text-decoration: underline" href="#">click me to login</a><br>
                        <br><br>
                        If you have any feedback on the platform, welcome to fill in the feedback form, fill in the form to lottery cash, and help the platform continue to improve!<br>
                        <a href="https://forms.gle/2kcaGhxJeLqqNWv89" style="text-decoration: underline" target="_blank">Click me to the feedback form</a></p>
                    </div>
                    <!-- 中繼資料 -->
                    <div class="meta">
                        <div class="item">
                        </div>
                    </div>
                </div>
            </div>
            <div :class='message.class' v-for="(message, index) in messages" 
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
                        <p v-for="(text, index) in message.text.split('\n')">{{text}}</p>
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
            <div id="text_area">
                <div class="textarea" id="chatroom_div_text_area" role="textbox" contenteditable
                 ></div>
            </div>
            <div id="send_button" class="align-items-right" @click="send_msg">
                <i class="now-ui-icons ui-1_send"></i>
            </div>
        </div>
    </div>
</template>
<script>
const axios = require('axios');
const $ = require("jquery")
import Cookies from "js-cookie"

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

let emotion_map_to_chinese = {
    "😃 Positive":"喜歡",
    "🤗 Empathic":"悲傷",
    "🥰 Lovely":"喜歡",
    "😤 Unfriendly":"噁心",
    "😡 Angry": "憤怒",
    "😂 Laughing": "開心"
}

let API_emotion_mapping = {'其它': 0, '喜歡': 1, '悲傷': 2, '噁心': 3, '憤怒': 4, '開心': 5}


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
        let minute = currentdate.getMinutes()
        if(minute.length<2) minute = "0" + minute
        let hour = currentdate.getHours()
        if(hour.length<2) hour = "0" + hour
        this.time = hour + ":" + minute
        this.author = author
        this.author_img = author_img
        this.random_id = author_img + Math.random().toString(36).substring(7)
    }
    setClass(text) {
        this.class = text;
    }
}

export default {
    name: 'chatroom',
    bodyClass: 'chatroom',
    components: {
    },
    mounted() {
        let vm = this
        document.getElementById("chatroom_div_text_area").focus()
        $("#chatroom_div_text_area").keypress(function(e){
            if(e.which == 13 && e.shiftKey){
                
            }else if(e.which == 13){
                e.preventDefault()
                vm.send_msg()
            }
        })
    },
    data() {
      return {
          already_messages: [],
          messages: [],
          pending_msg: 0
      }
    },
    computed: {
        username: function(){
            try{
                var profile = window.user.getBasicProfile();
                return profile.getName()
            }catch(e){
                return "試用者"
            }
        },
        user_img: function(){
            try{
                var profile = window.user.getBasicProfile();
                return profile.getImageUrl()
            }catch(e){
                return "https://i.imgur.com/pqrLeJW.png"
            }
        },
        user_email: function(){
            try{
                var profile = window.user.getBasicProfile();
                return profile.getEmail()
            }catch(e){
                return "trial_user"
            }
        },
        bots: function(){
            let bots_str = "[{\"display_name\":\"Annie\",\"picture_url\":\"https://i.imgur.com/3pNwzLd.jpg\",\"create_time\":\"2021-03-31T17:33:08.646000\",\"last_update\":\"2021-03-31T17:33:08.646000\",\"usage_count\":0,\"custom_response\":[],\"emotion\":\"😃 Positive\",\"is_new_bot\":false},{\"display_name\":\"Reiner\",\"picture_url\":\"https://i.imgur.com/ub1Dik7.png\",\"create_time\":\"2021-03-31T16:39:25.018000\",\"last_update\":\"2021-03-31T16:39:25.018000\",\"usage_count\":0,\"custom_response\":[],\"emotion\":\"😃 Positive\",\"is_new_bot\":false},{\"display_name\":\"米卡莎\",\"picture_url\":\"https://i.imgur.com/JV3K1bS.png\",\"create_time\":\"2021-05-16T05:47:00.109000\",\"last_update\":\"2021-05-16T05:47:00.109000\",\"usage_count\":0,\"custom_response\":[],\"emotion\":\"😃 Positive\",\"is_new_bot\":false},{\"display_name\":\"Armin\",\"picture_url\":\"https://i.imgur.com/8DwxCJE.png\",\"create_time\":\"2021-05-15T21:44:00.063000\",\"last_update\":\"2021-05-15T21:44:00.063000\",\"usage_count\":0,\"custom_response\":[],\"emotion\":\"😃 Positive\",\"is_new_bot\":false},{\"display_name\":\"Eren\",\"picture_url\":\"https://i.imgur.com/xOPQh09.png\",\"create_time\":\"2021-03-31T16:41:18.871000\",\"last_update\":\"2021-03-31T16:41:18.871000\",\"usage_count\":0,\"custom_response\":[],\"emotion\":\"😃 Positive\",\"is_new_bot\":false}]"
            return JSON.parse(bots_str)
        }
    },
    methods: {
        send_msg: function(){
            let target = document.getElementById("chatroom_div_text_area")
            let out_text = target.innerText
            if(out_text.length == 0){
                return 0
            }

            var enter = String.fromCharCode(10);
            if(this.pending_msg > 0){
                alert("請等收到訊息後再發出訊息。如有錯誤請重新整理頁面\nPlease wait until you receive responses before sending the next message.\nOr try refreash the window if you encounter error.")
                return 0
            }
            out_text = replaceAll(out_text, enter, "\n")

            target.innerText = ""
            console.log("SEND", out_text)
            
            let sended_message = new Message(out_text, this.username, this.user_img)
            sended_message.setClass("message text right")
            this.messages.push(sended_message)
            this.scroll_to_msg(sended_message)

            shuffle(this.bots)

            this.bots.forEach(bot => {
                console.log("EEE", bot)

                let emotion_code = API_emotion_mapping[emotion_map_to_chinese[bot.emotion]] || 1
                this.pending_msg += 1
                
                axios({
                        method: "POST",
                        url: `${process.env.VUE_APP_API_URL}/api/webchat/generate_response`, 
                        headers: {
                                "accept": "application/json",
                                'Content-Type': 'application/json'
                        },
                        data: {
                            email: this.user_email,
                            text: out_text,
                            emotion: emotion_code,
                            response_count: 1
                        },
                    }).then(response => {
                        
                        let text = response.data.responses[0]
                        let message = new Message(text, bot.display_name, bot.picture_url)
                        message.setClass("message text")
                        sended_message.setClass("message text right read")
                        
                        setTimeout(()=> {
                            this.messages.push(message)
                            this.scroll_to_msg(message)
                            this.pending_msg -= 1
                        }, Math.random()*3500)
                    })
            });
        },
        scroll_to_msg(message){
            setTimeout(()=> {
                let target = document.getElementById(message.random_id)
                target.scrollIntoView({behavior: "smooth"})
            }, 300)
        },
        sign_in(){
            var btn = document.getElementById("google-signin-btn")
            btn.getElementsByTagName("div")[0].click()
            this.$router.replace("/online/dashboard")
        }
    }
}
</script>
<style>
    #chatroom{
        height: 100%;
        padding-bottom: 11vh;
    }
    #chatroom_div_text_area{
        padding-top: 5px;
        min-height: 2em;
        line-height: 1.1;
    }
    #input_area{
        position: fixed;
        bottom: 0px;
        width: 100%;
        background-color: white;
    }
    #input_area > #text_area{
        width: 100%;
        min-height: 10vh;
        font-size: 2em;
    }
    #input_area > #text_area > br{
        padding-top: 1em;
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
            padding-top: 1vh;
            font-size: 200%;
            height: 9vh
        }
    }

    @media screen and (max-width: 1025px) {
     /* start of phone styles */
     /* It's possible to hide the image if the screen becomes too small */
        #chatroom {
        padding-bottom: 20%;
        }
        .textarea {
            padding-top: 1vh;
            font-size: 200%;
            height: 9vh
        }
    }
</style>
