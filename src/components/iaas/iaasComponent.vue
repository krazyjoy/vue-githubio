<template>
    <div class="container" ref="IasSScrollContainer">
        <div class="blank-left"></div>
        <div class="content" >
            <div id="web-tier" class="section">
                <h1><b>Web Tier</b></h1>
                <br>
                <h3><b>Thread1-Queue Listener</b></h3>
                
                <p>- queue received&#9;&#8594;&#9;message body&#9;&#8594; add to global dictionary &#9;&#8594; filename output {} &#8594; delete message</p>
                <p style="padding-left:5vw;">&#9;- message body structure</p>
                <p style="padding-left:10vw">&#9; - filename</p>
                <p style="padding-left:10vw">&#9; - output</p>
                 <div class="mb-5">
                    <!-- <img class="ms-2 rounded" src="@/assets/Kgil/rag_breakdown.png" alt="" height="300"> -->
                </div>
            </div>
            
            <div id="thread2" class="section">
                <h3><b>Thread2-AutoScaling Controller</b></h3>
                <p>START</p>
                <p>try x 3 &#8594; Get Length &#8594; == 0: &#8594; sleep</p>
                <p style="padding-left:18vw;">&#8594; otherwise: &#8594;start instance(# of messages) &#8594; new instance ids</p>
                <p>STOP</p>
                <p>try x 10 &#8594; resp queue not empty && req queue not empty</p>
                <p>&#8594; sleep</p>
                <p>&#8594; otherwise: stop in running states instances</p>
            </div>
            <div id="thread3" class="section">
                <h3><b>Thread 3-Recognize Image</b></h3>
                <p>Args: inputFile: UploadFile</p>
                <p>convert: image &#8594; image bytes</p>
                <p>post message: </p>
                <p style="padding-left: 5vw;">&#9; - key: filename</p>
                <p style="padding-left: 5vw;">&#9; - value: image bytes</p>
                <p>&#8594; send message by POST &#8594; fetch output from filename_output_map {} &#8594; output</p>
                <p>&#8594; plain text response (filename: output)</p>
            </div>
            <div id="facenet" class="section">
                <h3><b>Facenet Model</b></h3>
                <div class="mb-5">
                    <img style="border-radius: 10px; background-color: #fff" s="ps-3 rounded-2" src="@/assets/projects/facenet.png" alt="" height="300">
                </div>
            </div>
            <div id="apptier" class="section">
                <h1><b>App Tier</b></h1>
                <br>
                <h5><b>IMAGE FOLDER</b></h5>
                <h5><b>CKPT</b></h5>
                <p>SQS &#8594; Receive Message &#8594; Message Body: filename, content &#8594; face match</p>
                <p style="padding-left: 3vw;">- face match: image (filepath) &#8594; mtcnn &#8594; face, prob</p>
                <p style="padding-left: 30vw">&#8595; &#8594; resnet (load CKPT)</p>
                <p style="padding-left: 30vw">&#8594; embedding</p>
                <p style="padding-left: 30vw"> &#8594;find min distance from ckpt</p>
                <p style="padding-left: 30vw">&#8594; identify person</p> 
            </div>
        </div>
        <div class="sidebar">
            <div><button class="close-btn btn btn-secondary" @click="$emit('close_expand')">X</button></div>
            <ul>
                <li :class="{active : currentSection === 'web-tier'}">
                    <a href="#web-tier">Web Tier</a>
                    <ul>
                        <li :class="{active : currentSection === 'thread2'}"><a href="#thread2">Thread2</a></li>
                        <li :class="{active : currentSection === 'thread3'}"><a href="#thread3">Thread3</a></li>
                    </ul>
                </li>
                <li :class="{active : currentSection === 'facenet'}">
                    <a href="#facenet">Facenet</a>
                </li>
                <li :class="{active : currentSection === 'apptier'}">
                    <a href="#apptier">App Tier</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';

const currentSection = ref('web-tier');
const IasSScrollContainer = ref(null);
const expand = ref(false);

const navbar_highlight = () => {
    if (!IasSScrollContainer.value) {
        console.log("scrollContainer is not defined or empty");
        return;
    }
    const sections = IasSScrollContainer.value.querySelectorAll(".section");
    console.log("sections: ", sections)
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
        if (IasSScrollContainer.value) {
            console.log("add event listener")
            IasSScrollContainer.value.addEventListener('scroll', navbar_highlight);
        }
    }, 0)
    
})
onBeforeUnmount(()=>{
    console.log("Component unmounting")
    if (IasSScrollContainer.value) {
        IasSScrollContainer.value.removeEventListener('scroll', navbar_highlight);
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
    margin-top: 20vh;
    letter-spacing: 0.5;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    border: solid 3px #63c0f5;
    padding-top: 10px;
    z-index: 10;
    
}
.blank-left{
    flex: 1;
    max-width: 5%;
    border-right: solid 2px #63c0f5;;
}
.content{
    flex: 2;
    padding: 20px;
    color: white;
    max-width: 75%;
    margin-bottom: 5vh;
}

.sidebar{
    flex: 2;
    border-left: solid 2px #63c0f5;
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
    img{
        max-width: 300px;
        max-height: 200px;
    }
}
@media only screen and (min-width: 601px) and (max-width: 1024px){
    img{
        max-width: 300px;
        max-height: 200px;
    }
}
</style>