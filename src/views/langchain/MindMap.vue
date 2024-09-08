<script setup>
import { ref, onMounted } from 'vue'
import { VueFlow, useVueFlow, Handle } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ControlButton, Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

import {graphStore} from '@/stores/graph';
import CustomNode from '@/views/langchain/Node.vue';


import nodeData from '@/components/langchain/nodes.js'


const {updateNode} = useVueFlow()
defineProps(['id', 'sourcePosition', 'targetPosition', 'data'])


const graph = graphStore();
const nodeDataRef = ref([]);
nodeDataRef.value = [...nodeData];

onMounted(()=>{
  // graph.getAllNodes()
  // graph.getAllEdges()
  
})

const nodeTypes = {custom: CustomNode};

const NodeForm = ref({
  "node_id": null,
  "data": null,
  "position_x": null,
  "position_y": null,
  "children": []
})
const childrenInput = ref('');
const submitNodeForm = async() => {
  try{
    NodeForm.value.children = childrenInput.value.split(',').map((child)=>child)
    NodeForm.value.position_x = parseInt(NodeForm.value.position_x)
    NodeForm.value.position_y = parseInt(NodeForm.value.position_y)
    const res = await graph.createNewNode(NodeForm.value)
    console.log("submit node form: ", res)
  }
  catch(error){
    console.log("submit node form error: ", error)
  }
  
}

const nodeName = ref('')
const NodeInfo = ref({
  name: null,
  data: null,
  position_x: null,
  position_y: null,
})
const readNode = async()=>{
  console.log("node name: ", nodeName.value)
  const res = await graph.getNode(nodeName.value)
  console.log("read_node: ", res)
  NodeInfo.value.name = res["node_id"];
  NodeInfo.value.data = res["data"];
  NodeInfo.value.position_x = res["position_x"];
  NodeInfo.value.position_y = res["position_y"];
  console.log("NodeInfo: ", NodeInfo.value)
}
const EdgeInfo = ref({
  edge_id: null,
  source: null,
  target: null,
})

const createEdge = async()=>{
  const res = await graph.createNewEdge(EdgeInfo.value)
  EdgeInfo.value.edge_id = res["edge_id"];
  EdgeInfo.value.source = res["source_id"];
  EdgeInfo.value.target = res["target_id"];
  console.log("edgeinfo: ", EdgeInfo.value)
}

const deleteNodeInfo = ref({
  node_id: null,
  data: null,
  position_x: null,
  position_y: null,
})
const deleteNode = async () => {
  const res = graph.deleteSingleNode(deleteNodeInfo.value.data);
  console.log("deleteNode: ", res);
}

const oldNodeInfo = ref({
  node_id: null,
  data: null,
  position_x: null,
  position_y: null
})
const tempNodeInfo = ref({
  node_id: null,
  data: null,
  position_x: null,
  position_y: null
});
const findNode = async() =>{
  console.log("oldNodeInfo.value: ", oldNodeInfo.value.data)
  
  if(oldNodeInfo.value.data.length !== 0){
    const fetchOldNode = await graph.getNode(oldNodeInfo.value.data);
    console.log("fetchOldNode: ", fetchOldNode)
    oldNodeInfo.value.node_id = fetchOldNode["node_id"];
    oldNodeInfo.value.data = fetchOldNode["data"];
    oldNodeInfo.value.position_x = fetchOldNode["position_x"];
    oldNodeInfo.value.position_y = fetchOldNode["position_y"];
  }
}
const updateNodeData = async() => {
  console.log("oldNodeInfo.value: ", oldNodeInfo.value)
  if(oldNodeInfo.value.data){
    const fetchOldNode = await graph.getNode(oldNodeInfo.value.data);
    oldNodeInfo.value.node_id = fetchOldNode["node_id"];
    oldNodeInfo.value.data = fetchOldNode["data"];
    oldNodeInfo.value.position_x = fetchOldNode["position_x"];
    oldNodeInfo.value.position_y= fetchOldNode["position_y"];

    
    tempNodeInfo.value.data ||= oldNodeInfo.value.data;
    tempNodeInfo.value.position_x||= oldNodeInfo.value.position_x;
    tempNodeInfo.value.position_y ||= oldNodeInfo.value.position_y;
    
  }
  
  updateNode(oldNodeInfo.value.data, {
    data: {label: tempNodeInfo.value.data},
    position: {x: tempNodeInfo.value.position_x, y: tempNodeInfo.value.position_y}
  })
  const updateNodeInDB = graph.updateSingleNode(tempNodeInfo.value.data, tempNodeInfo.value);
  print("updateNode: ", updateNodeInDB);
}

const { onInit, onNodeDragStop, onConnect, addEdges, setViewport, toObject } = useVueFlow()



// our dark mode toggle flag
const dark = ref(false)


onInit((vueFlowInstance) => {
  // instance is the same as the return of `useVueFlow`
  vueFlowInstance.fitView()
})


onNodeDragStop(({ event, nodes, node }) => {
  console.log('Node Drag Stop', { event, nodes, node })
})


onConnect((connection) => {
  addEdges(connection)
})


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


function logToObject() {
  console.log(toObject())
}

function resetTransform() {
  setViewport({ x: 0, y: 0, zoom: 1 })
}

function toggleDarkMode() {
  dark.value = !dark.value
}


const connectionValidation= (connection) => {
  // Allow connections only from source to source
  const isSourceToSource = connection.sourceHandle.includes('source') && connection.targetHandle.includes('source');
  return isSourceToSource;
}
</script>

<template>
    <div class="mindmap">
      <div>
        <button class="btn btn-primary" @click="$emit('close_mindmap')">X</button>
      </div>
      <div class="graph">
        <VueFlow
            v-model:nodes="nodeDataRef"
            v-model:edges="edges"
            class="basic-flow"
            :connection-validator="connectionValidation"
            :default-viewport="{ zoom: 1.5 }"
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
        
        <div class="usercontrol">
          <div class="user-input">
              
              <form @submit.prevent="submitNodeForm">
                <span class="user-input-item text-center" style="font-size: 32px;">Create Node</span>
                <div class="user-input-group">
                  <label class="user-input-item" for="formGroupNodeNameInput">Node</label>
                  <input class="user-input-item ms-2"type="text" id="formGroupNodeNameInput" v-model="NodeForm.node_id" placeholder="Node Name">
                </div>
                <div class="user-input-group">
                  <label class="user-input-group" for="formGroupNodeData">Value</label>
                  <input class="user-input-group ms-2" type="text" id="formGroupNodeData" v-model="NodeForm.data">
                </div>
                <div class="user-input-group">
                  <label class="user-input-group" for="formGroupPositionX">Position X</label>
                  <input class="user-input-group ms-2" type="number" id="formGroupPositionX" v-model.number="NodeForm.position_x" placeholder="( Integer )">
                </div>
                <div class="user-input-group">
                  <label class="user-input-group" for="formGroupPositionY">Position Y</label>
                  <input class="user-input-group ms-2" type="number" id="formGroupPositionY" v-model.number="NodeForm.position_y" placeholder="( Integer )">
                </div>
            
                <div class="text-align">
                  <button type="submit" class="btn btn-primary m-4">Create</button>
                </div>
            </form>
          </div>
          <div class="user-input">
            <div class="user-input-group">
              <span class="user-input-item" style="font-size: 32px;">Read Node</span>
            
            <form @submit.prevent="readNode">
              <div class="user-input-group">
                <label class="user-input-item" for="formGroupNodeNameInput">Node</label>
                <input  class="user-input-item ms-2" type="text" id="formGroupNodeNameInput" v-model="nodeName" placeholder="Node Name">
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary m-4">Read</button>
              </div>
            </form>
          </div>
            <div class="form-group node-group" v-if="NodeInfo.name">
                <span type="text">name: {{ NodeInfo.name }}</span>
            </div>
            <div class="form-group node-group" v-if="NodeInfo.data">
                <span type="text">data: {{ NodeInfo.data }}</span>
            </div>
            <div class="form-group node-group" v-if="NodeInfo.position_x">
                <span type="text">positionX: {{ NodeInfo.position_x }}</span>
            </div>
            <div class="form-group node-group" v-if="NodeInfo.position_y">
                <span type="text">positionY: {{ NodeInfo.position_y }}</span>
            </div>
          </div>
          <div class="user-input">
            <form @submit.prevent="createEdge">
              <span class="user-input-group" style="font-size: 32px;">Create Edge</span>
              <div class="user-input-group">
                <label class="user-input-item" for="formGroupEdgeNameInput">Edge name</label>
                <input class="user-input-item ms-2" type="text" id="formGroupEdgeNameInput" v-model="EdgeInfo.edge_id" placeholder="Edge Name">
              </div>
              <div class="user-input-group">
                <label class="user-input-item" for="formGroupEdgeSourceInput">source</label>
                <input class="user-input-item ms-2" type="text" id="formGroupEdgeSourceInput" v-model="EdgeInfo.source">
              </div>
              <div class="user-input-group">
                <label class="user-input-item" for="formGroupEdgeTargetInput">target</label>
                <input class="user-input-item ms-2" type="text" id="formGroupEdgeTargetInput" v-model="EdgeInfo.target">
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary m-4">Create</button>
              </div>
              
            </form>
            <div class="form-group node-group" v-if="EdgeInfo.edge_id">
                <span type="text">name: {{ EdgeInfo.edge_id }}</span>
            </div>
            <div class="form-group node-group" v-if="EdgeInfo.source">
                <span type="text">data: {{ EdgeInfo.source }}</span>
            </div>
            <div class="form-group node-group" v-if="EdgeInfo.target">
                <span type="text">positionX: {{ EdgeInfo.target }}</span>
            </div>
            </div>
          <div class="user-input">
            <div class="user-input-group">
            <span class="text-center" style="font-size: 32px;">Delete Node</span>
              <form @submit.prevent="deleteNode">
              
                <label class="user-input-item" for="formGroupNodeNameInput">Node name</label>
                <input class="user-input-item ms-2" type="text" id="formGroupNodeNameInput" v-model="deleteNodeInfo.data" placeholder="Node Name">
                
                <button type="submit" class="btn btn-primary m-4">Delete</button>
              </form>
            </div>
            <div class="form-group node-group" v-if="deleteNodeInfo.node_name">
                <span type="text">name: {{ deleteNodeInfo.node_name }}</span>
            </div>
          </div>
          
          <div class="user-input">
            <div class="user-input-group">
              <span class="text-center" style="font-size: 32px;">Update Node</span>
            </div>
            
            <div class="user-input-group">
              <label class="user-input-item" for="formGroupNodeNameInput">Old Name</label>
              <input class="user-input-item" type="text" id="formGroupNodeNameInput" v-model="oldNodeInfo.data" placeholder="Old Name">
              <div class="user-input-item form-btn">
                <button class="btn btn-primary" @click="findNode(oldNodeInfo)">Find Node</button>
              </div>
            </div>
            <form class="" @submit.prevent="updateNodeData">
              <div class="user-input-group">
                <label for="formGroupNodeNameInput" class="mr-2">New Name</label>
                <input type="text" id="formGroupNodeNameInput" v-model="tempNodeInfo.data" placeholder="New Name">
              </div>
              
              <div class="user-input-group">
                <label for="formGroupNodeNameInput">PositionX</label>
                <span class="form-span">{{ oldNodeInfo.position_x}}</span>
                <span class="form-span"> &#8608;</span>
                <input type="number" id="formGroupNodeNameInput" v-model.number="tempNodeInfo.position_x" placeholder="new x">
              </div>
              <div class="user-input-group">
                <label for="formGroupNodeNameInput">PositionY</label>
                <span class="">{{ oldNodeInfo.position_y }}</span>
                <span class=""> &#8608;</span>
                <input type="number" id="formGroupNodeNameInput" v-model.number="tempNodeInfo.position_y" placeholder="new y">
              </div>
              <div class="user-input-group form-btn">
                <button type="submit" class="btn btn-primary ">Update</button>
              </div>
              
            </form>
            <table class="table table-bordered m-2 p-2">
              <thead>
                <tr>
                  <th scope="col">TimeLine</th>
                  <th scope="col">Data</th>
                  <th scope="col">Position X</th>
                  <th scope="col">Position Y</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Old</th>
                  <td>{{ oldNodeInfo.data }}</td>
                  <td>{{ oldNodeInfo.position_x }}</td>
                  <td>{{ oldNodeInfo.position_y }}</td>
                </tr>
                <tr>
                  <th scope="row">New</th>
                  <td>{{ tempNodeInfo.data }}</td>
                  <td>{{ tempNodeInfo.position_x }}</td>
                  <td>{{ tempNodeInfo.position_y }}</td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>
    
</template>

<style>
.mindmap{
    display: flex;
    flex-direction: column;
    width: 80%;
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

.usercontrol{
  display: flex;
  margin-top: 120vh;
  flex-direction: row;
  flex-wrap: wrap;
}
.user-input{
  display: flex;
  border: solid 1px #000;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
}
.user-input-group{
  padding: 10px;
}

.user-input-item{
  margin-bottom: 10px;
}

.form-btn{
  justify-content: center;
  text-align: center;
}
</style>