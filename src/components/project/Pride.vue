<template>
    <div class="container" ref="scrollContainer">
        <button class="btn btn-secondary" @click="$emit('close_expand')">
            X
        </button>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const scrollContainer = ref(null);

const emits = defineEmits('close_expand');

onMounted(()=>{
    // setTimeout(()=>{
    //     scrollContainer.value.addEventListener('scroll', )
    // })
})
</script>

<style scoped>
.container{
    display: flex;
    justify-content: flex-start;
    background: #fff;
    font-family: "Raleway";
    width: 90%;

}

</style>