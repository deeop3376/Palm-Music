<template>
<div class='singer-category'>
    <div v-for="(value,key) of singerCategory" :key="key" class="px-3">
        <ul class="d-flex text-gray2 text-xs flex-wrap">
            <li 
                v-for="(category,index) of value" 
                :key="category.id" 
                class="p-1 m-2"
                :class="{ 'singer-active':activeIndex[key] === index }" 
                @click="categoryClick(key,index)"   
            >
                {{category.name}}
            </li>
        </ul>
    </div>
</div>
</template>

<script>

export default { 
name:'',
components: {},
data() {
return {
    activeIndex:{
        sex:0,
        genre:0,
        area:0
    }
}
},
props:{
    singerCategory:{
        type:Object,
        required:true
    }
},
methods: {
    categoryClick(key,index){
        this.activeIndex[key]=index
       const params={}
       for(let key in this.activeIndex){
           params[key] = this.singerCategory[key][this.activeIndex[key]].id
       }
       this.$emit('category-click',params)
    }
},

}
</script>
<style scoped>

</style>