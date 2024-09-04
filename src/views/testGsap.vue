<template>
    <div id="box" class="box"></div>
</template>

<script>
import { gsap, Back } from 'gsap'
export default {
    mounted() {
        gsap.timeline().from("#box", {duration: 5, opacity: 0})

    }
}
</script>

<style>
.box{
    height: 60px;
    width: 60px;
    background-color: red;
}
</style>