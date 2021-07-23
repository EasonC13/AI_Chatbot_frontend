<template>
    <footer class="footer"
            :class="{[`footer-${type}`]: type}"
            :data-background-color="backgroundColor">
        <div class="container">
            <nav>
                <ul>
                    <li>
                        <a href="https://forms.gle/2kcaGhxJeLqqNWv89">
                            Feedback 使用回饋
                        </a>
                    </li>
                    <li>
                        <a href="https://tsraise.com">
                            Eason Chen
                        </a>
                    </li>
                    <li>
                        <a href="https://tsraise.com">
                            About Author
                        </a>
                    </li>
                    <li>
                        <a href="https://tsraise.com">
                            Blog
                        </a>
                    </li>
                    <!-- <li>
                        <a href="https://www.creative-tim.com/license">
                            License
                        </a>
                    </li> -->
                </ul>
            </nav>
            <div class="copyright">
                &copy; {{year}}, Designed by
                <a>Now UI Kit Pro</a>. Coded by
                <a href="https://github.com/EasonC13" target="_blank">Eason Chen (EasonC13)</a>
            </div>
        </div>
    </footer>
</template>
<script>
  export default {
    props: {
      backgroundColor: String,
      type: String
    },
    data(){
      return {
        year: new Date().getFullYear()
      }
    }
  }
</script>
<style>
</style>
