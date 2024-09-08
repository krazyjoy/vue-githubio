<template>
    <div class="section-container lh-sm">
            <div v-for="(slide, index) in slides" :key="index">
                <span class="title">{{slide.title}}</span>
                    <div class="slide-container p-3">
                        <div class="slide-content"  v-if="!learnMoreFlag[slide.id] && !isExpanded[slide.id]">
                            <span class="slide-title mb-5 gs_reveal fromLeft" data-delay-sec="0.2" >{{slide.title}}</span>
                            <span class="gs_reveal fromLeft" data-delay-sec="0.4">
                                {{ slide.description }}
                            </span>
                            <span class="mt-3 gs_reveal fromLeft" data-delay-sec="0.6">
                                <a :href="slide.github" class="icon_link">
                                    <img src="@/assets/github_icon-removebg-preview.png" class="icon"/>
                                </a>
                                <button type="button" class="p-2 btn learn-more-btn gs_reveal fromLeft"  data-delay-sec="0.6" @click="learnMore(slide.id)">LEARN MORE</button>
                            </span>
                        </div>
                        <div class="slide-image" v-if="!isExpanded[slide.id] && !learnMoreFlag[slide.id]">
                            <img :src="slide.image" :alt="slide.image" class="gs_reveal fromRight" data-delay-sec="0.6" @click="clickImg(slide.id)" style="max-width: 40vw; max-height: 50vh; object-fit: cover; border-radius: 10px; margin-right: 10px;"/>
                        </div>
                        <div class="child-component component">
                            <MindMap @close_mindmap="toggleMindMap" v-if="learnMoreFlag['RAG'] && slide.id==='RAG'"/>
                        </div>
                        <div class="child-component component">
                            <Pride @close_pride="togglePride" v-if="learnMoreFlag['PRIDE']  && slide.id==='PRIDE'"/>
                        </div>
                        <div class="child-component component">
                            <RagComponent  v-if="isExpanded['RAG'] && slide.id==='RAG'" :expand="isExpanded['RAG']" @close_expand="toggleExpand('RAG')" />
                        </div>
                        <div class="child-component component">
                            <PrideComponent  v-if="isExpanded['PRIDE'] && slide.id==='PRIDE'" :expand="isExpanded['PRIDE']" @close_expand="toggleExpand('PRIDE')" />
                        </div>
                        <div class="child-component component">
                            <iaasComponent  v-if="isExpanded['AWS'] && slide.id==='AWS'" :expand="isExpanded['AWS']" @close_expand="toggleExpand('AWS')" />
                        </div>
                    </div>
                    
<!--                     
                </div> -->
            </div>
            
    </div>
        
</template>
<script setup>
import {onMounted, ref} from 'vue';
import kgilImage from '@/assets/projects/rag_profile.png';
import djangoSSO from '@/assets/projects/django-third-party-login.png';
import iaasImage from '@/assets/projects/iaas-elastic-app.jpg';
import aiCupImage from '@/assets/projects/voice-disease-analysis.png';
import prideImage from '@/assets/projects/learning_diagram_v3.png';
import gsap from 'gsap';
import MindMap from '../langchain/MindMap.vue';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import RagComponent from '@/components/project/RagComponent.vue';
import PrideComponent from '@/components/project/Pride.vue'
import Pride from '@/views/pride/pride.vue';
import iaasComponent from '@/components/iaas/iaasComponent.vue';


const slides = [
    {
        id: 'RAG',
        title: 'Internal AI Mentor', 
        image: kgilImage,
        description: 'A comprehensive course training management platform meticulously designed to empower a company’s workforce with the specialized knowledge and skills essential for each department’s success. This website serves as an invaluable resource, offering tailored training programs that ensure employees are well-equipped to excel in their respective roles, fostering both individual growth and overall organizational excellence.',
        github: 'https://github.com/krazyjoy/project-management',
        graph: "/vue-githubio/rag"
    },
    {
        id: 'PRIDE',
        title: 'PRIDE-multimodal early depression detection system',
        image: prideImage,
        description: 'A cloud eployed system running on edge devices for inferencing user depression level',
        github: 'https://github.com/krazyjoy/PRIDE-Depression-Detection-Transformer-Based-System',
        graph: '#'
    },
    {
        id: 'AWS',
        title: 'IaaS Elastic Face Recognition App', 
        image: iaasImage,
        description: 'An advanced EC2 web tier eagerly awaits users to upload images, seamlessly queuing them in an SQS Queue for processing. Leveraging the robust capabilities of the elastic image recognition FaceNet model, the system meticulously interprets each image, delivering insightful expression analysis back to the application tier, ensuring a responsive and intelligent user experience.',
        github: 'https://github.com/krazyjoy/Elastic_Face_Recognition_MultiTier_Web_Application',
        graph: "#"
    },
    {
        id: 'DJANGO',
        title: 'Django SSO App',
        image: djangoSSO,
        description: 'A login web application supports Google/Facebook third party login method using Django backend and React framework.',
        github: 'https://github.com/krazyjoy/Login_System_third_party',
        graph: "#"
    },
    {
        id: 'AICUP',
        title: 'Voice Disease Analysis',
        image: aiCupImage,
        description: '',
        github: 'https://github.com/krazyjoy/AI_CUP',
        graph: "#"
    }
];


const currSlide = ref('');

const isExpanded = ref({});
const learnMoreFlag = ref({});


const toggleExpand = (title) => {
    isExpanded.value[title] = !isExpanded.value[title];

}
const toggleMindMap = () => {
    learnMoreFlag.value['RAG'] = false;
}
const togglePride = () => {
    learnMoreFlag.value['PRIDE'] = false;
}
/* gsap */
gsap.registerPlugin(ScrollTrigger);

const hide = (elem) => {
    gsap.set(elem, {autoAlpha: 0});
}
onMounted(()=>{
    const gs_elements = gsap.utils.toArray('.gs_reveal');
    // console.log(gs_elements)
    gs_elements.forEach((elem) => {
        hide(elem);
        ScrollTrigger.create({
            trigger: elem,
            start: `top bottom`,
            end: `bottom top`,
            onEnter: ()=>{
                animateFrom(elem)
            },
            onEnterBack: ()=>{
                animateFrom(elem, -1)
            },
            onLeave: ()=>{
                hide(elem)
            }
        })
    })
    slides.forEach((slide)=>{
        isExpanded.value[slide.id] = false;
        
    })
    console.log("onMounted Expand status: ", isExpanded.value);
    slides.forEach((slide)=>{
        learnMoreFlag.value[slide.id] = false;
    })

});

const deltaX = ref(0);
const deltaY = ref(0);
const delay =  ref(0);

const animateFrom = (elem, direction=1)=>{
    direction = direction || 1;
    deltaX.value = 0;
    deltaY.value = direction * 100,
    delay.value = 0;

    if(elem.hasAttribute('data-delay-sec')){
        delay.value = parseFloat(elem.getAttribute('data-delay-sec'))
    }

    if(elem.classList.contains("fromLeft")){
        deltaX.value = -100;
        deltaY.value = 0;
    }
    else if(elem.classList.contains("fromRight")){
        deltaX.value = 100;
        deltaY.value = 0;
    }

    gsap.fromTo(elem, 
        {x: deltaX.value, y: deltaY.value, autoAlpha: 0},
        {
            duration: 1.25,
            x: 0,
            y: 0,
            autoAlpha: 1,
            ease: "expo",
            overwrite: "auto",
            delay: delay.value
        }
    )
}



const imgFlipped = ref({
    'RAG': false,
    'AWS': false,
    'DJANGO': false,
    'AICUP': false,
    'PRIDE': false,
});
const clickImg = (image_name) => {
    if(imgFlipped.value.hasOwnProperty(image_name)){
        console.log("image is hovered")
        imgFlipped.value[image_name] = true;
        currSlide.value = image_name;
        isExpanded.value[image_name] = true;

    }
    else{
        console.log("imgFlipped does not have attribute: ", image_name)
    }
}


const learnMore = (title) => {
    console.log("learn more button");
    learnMoreFlag.value[title] = !learnMoreFlag.value[title];
    console.log(title);
    console.log(learnMoreFlag.value[title]);
}


</script>
<style scoped>
.section-container{
    padding-top: 10vh;
    height: 400vh;
    max-width: 1800px;
    color: white;
    background-color: #000;
    border: solid 1px #c6fc01;
    box-sizing: border-box;
    overflow: hidden;
    line-height: 1;
    margin: 0;
    padding: 0;
    padding-top: 20px;
}
.title{
    font-family: "Raleway", sans-serif;
    display: block;
    font-size: 64px;
    color: white;
    margin-left: 20px;
    padding-left: 20px;
    line-height: 1;
    -webkit-text-stroke:2px #63c0f5;
}

.slide-container{
    display: flex;
    width: 80%;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    overflow: hidden;
    height: 80vh;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;

    justify-content: center;
    margin-top: 20px;
}
.slide-content{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-family: "Popins", sans-serif;
    flex: 1;
    box-sizing: border-box;
    margin-right: 10px;
    padding-right: 20px;
    position: relative;
    z-index: 1;
   
}

.slide-image{
    display: flex;
    flex: 1;
    cursor: pointer;
    justify-content: center;
    
}


.child-component{
    position: absolute;
    z-index: 10;
}
.slide-title{
    font-size: 45px;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    color: #000;
    padding-right: 50px;
    -webkit-text-stroke:2px #c6fc01;
}

.icon_link{
    text-decoration: none;
    color: inherit; /*Inherit the text color from the parent */
    display: inline;
    background-color: transparent;
}

.icon{
    width: 80px;
    height: 80px;
    z-index: 3;
    cursor: pointer;

}
.icon_link .icon:hover{
    border: solid 1px #c6fc01;
    color: inherit;
}

.learn-more-btn{
    border: solid 2px #c6fc01;
    width: 10vw;
    padding: 2px 20px;
    margin-left: 10vw;
    color: white;
}
.learn-more-btn:active, .learn-more-btn:hover{
    background-color: #c6fc01;
    color: black;
}


.component{
    max-height: 100vh;
    overflow-y: auto;
}

</style>