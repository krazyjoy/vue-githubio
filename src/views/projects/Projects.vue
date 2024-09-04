<template>
    <div class="section-container lh-sm">
        <!-- <span class="title">Latest Projects</span> -->
       
            <div v-for="(slide, index) in slides" :key="index">
                <span class="title">{{slide.title}}</span>
                <div class="slide-container p-3">
                    <div class="slide-content" v-if="!isExpanded[slide.title]">
                        <span class="slide-title mb-5 gs_reveal fromLeft" data-delay-sec="0.2" >{{slide.title}}</span>
                        <span class="gs_reveal fromLeft" data-delay-sec="0.4">
                            {{ slide.description }}
                        </span>
                        <span class="mt-3 gs_reveal fromLeft" data-delay-sec="0.6">
                            <a :href="slide.github" class="icon_link">
                                <img src="@/assets/github_icon-removebg-preview.png" class="icon"/>
                            </a>
                            <a role="button" :href="slide.graph" class="p-2 btn learn-more-btn gs_reveal fromLeft"  data-delay-sec="0.6" @click="clickRag(slide.title)">LEARN MORE</a>
                        </span>
                    </div>
                    
                    <img :src="slide.image" :alt="slide.image" class="slide-image gs_reveal fromRight" data-delay-sec="0.6" @click="hoverImg(slide.title)" v-if="!isExpanded[slide.title] || currSlide != slide.title"/>
                    
                    <RagComponent class="child-component component" v-if="isExpanded['Internal AI Mentor'] && slide.title ==='Internal AI Mentor'" :expand="isExpanded['Internal AI Mentor']" @close_expand="toggleExpand('Internal AI Mentor')" />
                    
                </div>
            </div>
            <MindMap v-if="isRag"/>
            
    </div>
        
</template>
<script setup>
import {onBeforeMount, onMounted, ref} from 'vue';
import kgilImage from '@/assets/projects/rag_profile.png';
import djangoSSO from '@/assets/projects/django-third-party-login.png';
import iaasImage from '@/assets/projects/iaas-elastic-app.jpg';
import aiCupImage from '@/assets/projects/voice-disease-analysis.png';
import gsap from 'gsap';
import MindMap from '../langchain/MindMap.vue';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import RagComponent from '@/components/project/RagComponent.vue';

const slides = [
    {
        title: 'Internal AI Mentor', 
        image: kgilImage,
        description: 'A comprehensive course training management platform meticulously designed to empower a company’s workforce with the specialized knowledge and skills essential for each department’s success. This website serves as an invaluable resource, offering tailored training programs that ensure employees are well-equipped to excel in their respective roles, fostering both individual growth and overall organizational excellence.',
        github: 'https://github.com/krazyjoy/project-management',
        graph: "/vue-githubio/rag"
    },
    {
        title: 'IaaS Elastic Face Recognition App', 
        image: iaasImage,
        description: 'An advanced EC2 web tier eagerly awaits users to upload images, seamlessly queuing them in an SQS Queue for processing. Leveraging the robust capabilities of the elastic image recognition FaceNet model, the system meticulously interprets each image, delivering insightful expression analysis back to the application tier, ensuring a responsive and intelligent user experience.',
        github: 'https://github.com/krazyjoy/Elastic_Face_Recognition_MultiTier_Web_Application',
        graph: "#"
    },
    {
        title: 'Django SSO App',
        image: djangoSSO,
        description: 'A login web application supports Google/Facebook third party login method using Django backend and React framework.',
        github: 'https://github.com/krazyjoy/Login_System_third_party',
        graph: "#"
    },
    {
        title: 'Voice Disease Analysis',
        image: aiCupImage,
        description: '',
        github: 'https://github.com/krazyjoy/AI_CUP',
        graph: "#"
    }
];

const isScrolling = ref(false);
const currSlide = ref('');
const isRag = ref(false);
const isExpanded = ref({});



const toggleExpand = (title) => {
    isExpanded.value[title] = !isExpanded.value[title];
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
        isExpanded.value[slide.title] = false;
        
    })
    console.log("isExpanded: ", isExpanded.value)

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
const imagePaths = {
    'Internal AI Mentor': kgilImage,
    'IaaS Elastic Face Recognition App': iaasImage,
    'Django SSO App': djangoSSO,
    'Voice Disease Analysis': aiCupImage
};




const imgFlipped = ref({
    'Internal AI Mentor': false,
    'IaaS Elastic Face Recognition App': false,
    'Django SSO App': false,
    'Voice Disease Analysis': false
});
const hoverImg = (image_name) => {
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
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    overflow: hidden;
    height: 80vh;
    margin-right: 20px;
    box-sizing: border-box;
    position: relative;
    margin-left: 20px;
    justify-content: center;
    margin-top: 20px;
}
.slide-content{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-family: "Popins", sans-serif;
    width: 40%;
    z-index: 1;
    box-sizing: border-box;
    margin-right: 10px;
    padding-right: 20px;
    position: relative;
    z-index: 1;
   
}

.slide-image{

    width: 40%;
    max-height: 50vh;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 10px;
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