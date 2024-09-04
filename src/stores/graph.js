import { defineStore } from "pinia";
import {ref, computed} from 'vue';
import {MarkerType} from '@vue-flow/core';
import { getNodeByName, getNodes, getEdges, getEdgesBySource, createNode, createEdge, deleteNode, updateANode } from "@/api/langchain/index.js";
import {marked} from 'marked';

export const graphStore = defineStore('graph', ()=>{
    const nodes = ref([]);
    const edges = ref([]);

    const getNode = async(node_name)=>{
        let res = await getNodeByName(node_name)
        console.log("type of res: ",typeof res)
        if (Array.isArray(res)) {
            res = res.map((node) => {
                return {
                    id: node.node_id,
                    data: { label: node.data },
                    type: 'custom',
                    position: { x: node.position_x, y: node.position_y },
                    class: 'light',
                };
            });
        } else if (res && typeof res === 'object') {
            // If it's a single object, wrap it in an array
            res = [{
                id: res.node_id,
                data: { label: res.data },
                type: 'custom',
                position: { x: res.position_x, y: res.position_y },
                class: 'light',
            }];
        }else {
            // Handle the case where res is not an array
            console.error("Expected an array but got:", res);
            res = []; // Or handle appropriately
        }
        return res;
    }

    const getSourceNodeEdges  = async(node_id) => {
        const res = await getEdgesBySource(node_id)
        return res;
    }
    const getAllNodes = async() => {
        let res = await getNodes()

        
        res = res.map((node) => {
            const labelMarkdown = node.data.replace(/\\n/g, '\n').replace(/\n/g, '<br>').replace(/\\t/g, '\t').replace(/~/g, '\\~');
            return {
                id: node.node_id,
                data: {label: marked(labelMarkdown)},
                type: 'custom',
                position: {x: node.position_x, y: node.position_y},
                class: 'light'

            };
        });
        console.log("get_all_nodes: \n", res)
        nodes.value = res
        return res
    }

    const getAllEdges = async ()=>{
        let res = await getEdges()
        res  = res.map((edge) => {
            return {
                id: edge.edge_id,
                source: edge.source_id,
                target: edge.target_id,
                markerEnd: MarkerType.ArrowClosed
            }
        });
        console.log("get_all_edges: \n", res)
        edges.value = res;
        return res
    }

    const createNewNode = async (data) => {
        try{
            console.log("data: ", data)
            const res = await createNode(data)
            console.log("newNode: ", res)
            return res;
        }
        catch(error){
            console.log("create new node error: ", error)
        }
        
    }
    
    const createNewEdge = async(data) =>{
        try{
            const res = await createEdge(data)
            console.log("new edge: ", res)
            return res;
        }
        catch(error){
            console.log("create new edge fail: ", error)
        }
    }
    
    const deleteSingleNode = async (node_name) => {
        try{
            const res = await deleteNode(node_name)
            console.log("delete node: ", res);
            return res;
        }
        catch(error){
            console.log("delete node fail: ", error)
        }
    }

    const updateSingleNode = async (node_name, data) => {
        const res = await updateANode(node_name, data);
        return res;
    }

    return {
        nodes,
        edges,
        getNode,
        getSourceNodeEdges,
        createNewNode,
        createNewEdge,
        deleteSingleNode,
        updateSingleNode,
        getAllNodes,
        getAllEdges
    }
});

export default graphStore;