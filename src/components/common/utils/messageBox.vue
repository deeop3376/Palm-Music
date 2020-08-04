<template>
<div class='messageBox'>
    <p>{{title}}</p>
    <p>{{content}}</p>
    <button @click="messageTest">dianji</button>
</div>
</template>

<script>

export default {
name:'',
components: {},
data() {
return {

}
},
computed: {},
watch: {},
methods: {

},
}
</script>
<style scoped>
.messageBox{width:50%;height: 50%;background-color: cadetblue;margin:0 auto;position: absolute;top:0;left:0;}
</style>