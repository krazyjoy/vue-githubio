<template>
    <div class="style-node">
        <Handle type="source" position="right" />
        <Handle type="target" position="left" />
        <div class="node-label" v-html="parseMarkdown(data.label)"></div>

    </div>
</template>

<script setup>
import {computed} from 'vue'
import {Handle} from '@vue-flow/core'
import {marked} from 'marked'

const props = defineProps({
    id: String,
    data: Object,
    position: String,
});

const {data, position} = props;

const label = computed(()=> data.label || 'Default Text');

const parseMarkdown = (text) => {
  return marked(text);
}
</script>
<style>
.style-node{
    display: block;
    width: 50vw;
    padding: 10px;
    border: 1px solid #000;
    border-radius: 4px;
    background-color: transparent;
    word-break: break-word;
    white-space: wrap;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
}
.node-label{
    white-space: pre-wrap; /* process \n */
}

</style>