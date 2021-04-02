<template>
  <component class="dropdown"
             :is="tag"
             :class="[{show: isOpen}, {'dropdown': direction === 'down'}, {'dropup': direction ==='up'}]"
             aria-haspopup="true"
             :aria-expanded="isOpen"
             @click="clickDropDown" 
             @mouseenter="mouseOnDropDown" @mouseleave="mouseLeaveDropDown"
             v-click-outside="closeDropDown">

    <slot name="title">
      <a class="dropdown-toggle nav-link"
         :class="{'no-caret': hideArrow}"
         data-toggle="dropdown">
        <i :class="icon"></i>
        <span class="no-icon">{{title}}</span>
      </a>
    </slot>
    <ul class="dropdown-menu"
        :class="[{'dropdown-menu-right': position === 'right'}, {show: isOpen}]">
      <slot></slot>
    </ul>
  </component>
</template>
<script>
  export default {
    name: 'drop-down',
    props: {
      direction: {
        type: String,
        default: 'down'
      },
      title: String,
      icon: String,
      position: String,
      hideArrow: Boolean,
      link: {
        type: String,
        default: ''
      },
      tag: {
        type: String,
        default: 'li'
      }
    },
    data() {
      return {
        isOpen: false,
        mouse_is_on: false,
      }
    },
    provide() {
      return {
        closeDropDown: this.closeDropDown
      }
    },
    methods: {
      clickDropDown() {
        this.isOpen = !this.isOpen
        this.$emit('change', this.isOpen)
      },
      closeDropDown() {
        this.isOpen = false
        this.$emit('change', this.isOpen)
      },
      mouseOnDropDown() {
        this.mouse_is_on = true
        this.isOpen = true
        this.$emit('change', this.isOpen)
      },
      mouseLeaveDropDown() {
        this.mouse_is_on = false
        setTimeout(() => {
          if(!this.mouse_is_on){
            this.isOpen = false
            this.$emit('change', this.isOpen)
          }
        }, 1000)
      }
    }
  }
</script>
<style>
  .dropdown {
    list-style-type: none;
  }

  .dropdown .dropdown-toggle {
    cursor: pointer;
  }
</style>
