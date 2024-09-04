<template>
    <div class="container" ref="scrollContainer">
        <div class="blank-left"></div>
        <div class="content" >
            <div id="basic-concept" class="section">
                <h1><b>Basic Concepts</b></h1>
                <br>
                <h3><b>What is RAG?</b></h3>
                <p>Retrieval-Augmented Generation (RAG) is the process of optimizing the output of a large language model,
                    so it references an authoritative knowledge base outside of its training data before generating
    a response.</p>
            </div>
            
            <div id="challenges-of-llms" class="section">
                <h3><b>Challenges of LLMs</b></h3>
                <ul class="lh-1">
                    <li><p>presenting false information</p></li>
                    <li><p>presenting out-of-date or generic information</p></li>
                    <li><p>creating a response from non-authoritative sources</p></li>
                </ul>
            </div>
            <div id="benefits-of-rag" class="section">
                <h3><b>Benefits of Rag</b></h3>
                <ul class="lh-1">
                    <li><p>cost-effective implementation</p></li>
                    <li><p>current information</p></li>
                    <li><p>enhanced user trust</p></li>
                    <li><p>more developer control</p></li>
                </ul>
            </div>
            <div id="process-of-rag" class="section">
                <h3><b>Process of RAG</b></h3>
                <div class="mb-5">
                    <img src="@/assets/Kgil/rag_workflow.png" alt="" height="300">
                </div>
                <ul>
                    <li>
                        <span>
                        <p><b>Retrieval</b></p>
                        <p>The retrieval component efficiently searches through vast knowledge bases to identify the most pertinent information based on the input query or context. </p>
                        </span>
                    </li>
                    <li>
                        <span>
                        <p><b>Generation</b></p>
                        <p>The retrieved information is then integrated into the generative model, typically a large language model like GPT or T5, which synthesizes the relevant content into a coherent and fluent response. </p>
                        </span>
                    </li>
                </ul>
                <p>
                    Each of these features contributes to a streamlined, efficient document management and information retrieval process.
                </p>
            </div>
            <div id="develop" class="section">
                <h1><b>Develop</b></h1>
                <br>
            </div>
            <div id="motivation" class="section">
                <h3><b>Motivation</b></h3>
                <p>Enhance the database by injecting documents to efficiently expand the knowledge base. For instance, employees who previously had to go through old records can now simply upload PDF or DOCX files. These files may contain detailed information that would otherwise take a lot of time to thoroughly scan.
                </p>
            </div>
            <div id="key-features" class="section">
                <h3><b>Key Features</b></h3>
                <ul>
                    <li>
                        <p><b>Document Uploading</b></p>
                        <p>Users can easily upload documents in various formats such as PDF and DOCX files for seamless integration into the app.
                        </p>
                    </li>
                    <li>
                        <p><b>Document Splitting</b></p>
                        <p>Automatically splits uploaded documents into manageable segments, organizing the content into a vector store for efficient storage and processing.</p>
                    </li>
                    <li>
                        <p><b>Vector store Integration</b></p>
                        <p>Converts document segments into vector representations, enabling faster and more accurate information retrieval.
                        </p>
                    </li>
                    <li>
                        <p><b>Query-based Retrieval</b></p>
                        <p>Users can input queries, and the app retrieves the best-matching answers from the stored documents, providing quick and relevant responses.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="sidebar">
            <div><button class="close-btn btn btn-secondary" @click="$emit('close_expand')">X</button></div>
            <ul>
                <li :class="{active : currentSection === 'basic-concept'}">
                    <a href="#basic-concept">Basic Concepts</a>
                    <ul>
                        <li :class="{active : currentSection === 'challenges-of-llms'}"><a href="#challenges-of-llms">Challenges of LLMs</a></li>
                        <li :class="{active : currentSection === 'benefits-of-rag'}"><a href="#benefits-of-rag">Benefits of Rags</a></li>
                        <li :class="{active : currentSection === 'process-of-rag'}"><a href="#process-of-rag">Process of Rag</a></li>
                    </ul>
                </li>
                <li :class="{active : currentSection === 'research-areas'}">
                    <a href="#research-areas">Research Areas</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';

const currentSection = ref('basic-concept');
const scrollContainer = ref(null);
const expand = ref(false);

const navbar_highlight = () => {
    if (!scrollContainer.value) {
        console.log("scrollContainer is not defined or empty");
        return;
    }
    const sections = scrollContainer.value.querySelectorAll(".section");
    let currentSectionId = '';
    let closestDistance = Infinity;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distanceToTop = Math.abs(rect.top);
        if(distanceToTop < closestDistance){
            closestDistance = distanceToTop;
            currentSectionId = section.getAttribute('id');
        }
    })
    console.log("currentSectionId: ", currentSectionId)
    currentSection.value = currentSectionId;
}

const props = defineProps({
    expand: Boolean,
})

const emits = defineEmits('close_expand')


onMounted(()=>{
    setTimeout(()=>{
        if (scrollContainer.value) {
            console.log("add event listener")
            scrollContainer.value.addEventListener('scroll', navbar_highlight);
        }
    }, 0)
    
})
onBeforeUnmount(()=>{
    console.log("Component unmounting")
    if (scrollContainer.value) {
        scrollContainer.value.removeEventListener('scroll', navbar_highlight);
    }
})





</script>

<style scoped>
.container{
    display: flex;
    justify-content: flex-start;
    background: #fff;
    font-family: "Raleway";
    width: 90%;
    letter-spacing: 0.5;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    border: solid 1px #63c0f5;
    padding-top: 10px;
    z-index: 10;
}
.blank-left{
    flex: 1;
    max-width: 5%;
    border-right: solid 1px #63c0f5;;
}
.content{
    flex: 2;
    padding: 20px;
    color: white;
    max-width: 75%;
}

.sidebar{
    flex: 2;
    border-left: solid 1px #63c0f5;
    max-width: 20%;
    top: 0;
    position: sticky;
    margin: 0;
    padding: 0;
    padding-top: 40px;
    border-radius: right 10px;
}
.close-btn{
    border: none;
    position: absolute;
    right: 0;
    top: 0;
    background-color: #63c0f5;
}
.sidebar ul{
    list-style: none;
}

.sidebar ul li a{
    text-decoration: none;
    color: white;
}
.sidebar ul li.active > a{
    font-weight: bold;
    color: #63c0f5;
}

@media only screen and (max-width: 600px){
    .container{
        max-width: 500px;
    }
    .blank-left{
        max-width: 50px;
    }
    .sidebar{
        max-width: 0;
    }
    .content{
        max-width: 300px;
    }
    .content h1{
        font-size: 28px;
    }
    .content h2{
        font-size: 20px;
    }

    .content h3{
        font-size: 16px;
    }
}

</style>