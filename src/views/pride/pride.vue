<template>
    <div class="mindmap">
      <div>
        <button class="btn btn-primary" @click="$emit('close_pride')">X</button>
      </div>
      <div class="graph">
        <VueFlow
            v-model:nodes="nodeData"
            v-model:edges="edgeData"
            class="basic-flow"
            :connection-validator="connectionValidation"
            :default-viewport="{ zoom: 0.8 }"
            :min-zoom="0.2"
            :max-zoom="4"
            :node-types="nodeTypes"
            :style="{ width: '100%', height: '100vh' }"
        >
          
            <Background pattern-color="#aaa" :gap="16" />

            <MiniMap position="bottom-right"/>
            
            <Controls position="top-left">
            <ControlButton title="Reset Transform" @click="resetTransform">
                <Icon name="reset" />
            </ControlButton>

            <ControlButton title="Shuffle Node Positions" @click="updatePos">
                <Icon name="update" />
            </ControlButton>

            <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
                <Icon v-if="dark" name="sun" />
                <Icon v-else name="moon" />
            </ControlButton>

            <ControlButton title="Log `toObject`" @click="logToObject">
                <Icon name="log" />
            </ControlButton>
            </Controls>
        </VueFlow>
    </div>
    </div>
</template>


<script setup>
import {ref, onMounted} from 'vue';
import {VueFlow, useVueFlow} from '@vue-flow/core';
import {Background} from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';
import { ControlButton, Controls } from '@vue-flow/controls';
import CustomNode from '@/views/pride/Node.vue';
import nodeData from './nodes';
import edgeData from './edges';

const nodeTypes = {custom: CustomNode};

const connectionValidation= (connection) => {
  const isSourceToSource = connection.sourceHandle.includes('source') && connection.targetHandle.includes('source');
  return isSourceToSource;
}

function resetTransform() {
  setViewport({ x: 0, y: 0, zoom: 1 })
}

function updatePos() {
  nodes.value = nodes.value.map((node) => {
    return {
      ...node,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
    }
  })
}

function toggleDarkMode() {
  dark.value = !dark.value
}

function logToObject() {
  console.log(toObject())
}

</script>
<style>
.mindmap{
    display: flex;
    flex-direction: column;
    width: 80vw;
    height: 90vh;
    font-family: Georgia, 'Times New Roman', Times, serif;
    background-color: #fff;
    color: black;
    border: solid 3px #63c0f5;
    border-radius: 10px;
    margin-top: 5vh;
    padding-top: 5vh;
}

.vue-flow__pane.vue-flow__container.draggable {
  height: 120vh;
  border-radius: 10px;
}



</style>