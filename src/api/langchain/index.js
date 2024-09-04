import request from "@/server/request";

const PREFIX = "langchain"

export const getNodeByName = (node_name) => {
    console.log("inside getNodeByName")
    const req = request({
        url: `/${PREFIX}/node/${node_name}`,
        method: "get",
        // params: {node_name: node_name}
    });
    return req;
};

export const getEdgesBySource = (node_id) => {
    return request({
        url: `/${PREFIX}/edges/${node_id}`,
        method: "get",
        
    });
}
export const getNodes = () => {
    const res = request({
        url: `/${PREFIX}/nodes/`,
        method: "get",
    })

    return res;
}

export const getEdges = () => {
    return request({
        url: `/${PREFIX}/edges/`,
        method: "get",
    })
}

export const createNode = (data) => {
    return request({
        url: `/${PREFIX}/nodes/`,
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        data: data,

    })
}

export const createEdge = (data) => {
    return request({
        url: `/${PREFIX}/edges/`,
        method: "post",
        headers:{
            'Content-Type': 'application/json'
        },
        data: data
    })
}

export const deleteNode = (node_name) => {
    return request({
        url: `/${PREFIX}/node/${node_name}/delete`,
        method: "delete"
    })
}

export const updateANode = (node_name, data) => {
    return request({
        url: `/${PREFIX}/node/${node_name}/update`,
        method: "put",
        headers:{
            'Content-Type': 'application/json'
        },
        data: data
    })
}