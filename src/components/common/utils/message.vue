<template>
<div class='message'>
    <p>{{message}}</p>
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
.message{
    color:white;
    background-color: chocolate;
    position: absolute;
    top:50%;
    left: 50%;
    width: 300px;
    height: 100px;
    transform: translate(-50%,-50%);
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>