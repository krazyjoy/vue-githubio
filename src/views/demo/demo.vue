<template>
    <div class="container">
        <div class="navbar">
            <div class="logo">hotburo</div>
            <div class="dummy-info">13/1/2023 0:21 AM TORONTO</div>
            <div class="link">contact</div>
        </div>

        <div class="title-section">
            <div class="title">
                <div class="row">
                    <div class="h1">Django SSO</div>
                </div>
                <div class="row">
                    <div></div>
                    <div class="h1">Project</div>
                    <div class="span">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SIMPLE WEBSITES AND SIMPLE
                        BRANDING STAY IN THE PAST. WE ARE TACKLING BUSINESS PROBLEMS
                    </div>
                </div>
            </div>
            <div class="video">
                <video width="640" height="360" controls>
                    <source src="@/assets/SSO/SSO-ClickHomePage.mp4" type="video/mp4">
                </video>
            </div>
            
        </div>
        <div class="project-section" ref="project-section">
            <nav class="project-navbar">
                <ul class="project_nav-component">
                    <li class="project_navitem">
                        <div class="project_navitem_content">
                            <font-awesome-icon icon="fa-solid fa-thumbtack" class="pin-icon"/>    
                            <button class="project_navbtn" @click="clickViewBtns('RouterView')">Router</button>
                        </div>
                    </li>
                    <li class="project_navitem">
                        <div class="project_navitem_content">
                            <font-awesome-icon icon="fa-solid fa-thumbtack" class="pin-icon"/>
                            <button class="project_navbtn" @click="clickViewBtns('SchemaView')">Schema</button>
                        </div>
                    </li>
                </ul>
            </nav>
            <div  class="project-content" v-if="RouterView">
                <div class="router-sidebar">
                    <ul class="router-list">
                        <li :style="{backgroundColor: routerBtnBgColor.registerBtn}"> 
                            <button class="router-btn" ref="routerButton" @click="handleClickRouterBtn('registerBtn')" @mouseenter="hoverRouterBtns.registerBtn = true" @mouseleave="hoverRouterBtns.registerBtn = false">
                                Register /
                            </button>
                            <img src="@/assets/SSO/double-arrow.png" width="30" height="18"/>
                        </li>
                        <li :style="{backgroundColor: routerBtnBgColor.loginBtn}">
                            <button class="router-btn" ref="routerButton" @click="handleClickRouterBtn('loginBtn')" @mouseenter="hoverRouterBtns.loginBtn = true" @mouseleave="hoverRouterBtns.loginBtn = false">
                                Login /
                            </button>
                            <img src="@/assets/SSO/double-arrow.png"  ref="routerButton" width="30" height="18"/>
                        </li>
                        <li :style="{backgroundColor: routerBtnBgColor.updateBtn}">
                            <button class="router-btn"  ref="routerButton"@click="handleClickRouterBtn('updateBtn')" @mouseenter="hoverRouterBtns.updateBtn = true" @mouseleave="hoverRouterBtns.updateBtn = false">
                                Update /
                            </button>
                            <img src="@/assets/SSO/double-arrow.png" width="30" height="18"/>
                        </li>
                        <li :style="{backgroundColor: routerBtnBgColor.deleteBtn}">
                            <button class="router-btn" ref="routerButton" @click="handleClickRouterBtn('deleteBtn')" @mouseenter="hoverRouterBtns.deleteBtn = true" @mouseleave="hoverRouterBtns.deleteBtn = false">
                                Delete /
                            </button>
                            <img src="@/assets/SSO/double-arrow.png" width="30" height="18"/>
                        </li>
                        <li :style="{backgroundColor: routerBtnBgColor.logoutBtn}">
                            <button class="router-btn" ref="routerButton" @click="handleClickRouterBtn('logoutBtn')" @mouseenter="hoverRouterBtns.logoutBtn = true" @mouseleave="hoverRouterBtns.logoutBtn = false">
                                Logout /
                            </button>
                            <img src="@/assets/SSO/double-arrow.png" width="30" height="18" />
                        </li>
                    </ul>
                </div>
                <div class="router-workflow">
                    <div class="workflow" v-if="clickRouterBtns.registerBtn">
                        <img src="@/assets/SSO/register.png">
                    </div>
                    <div class="workflow" v-if="clickRouterBtns.loginBtn">
                        <img src="@/assets/SSO/login.png">
                    </div>
                    <div class="workflow" v-if="clickRouterBtns.updateBtn">
                        <img src="@/assets/SSO/update.png">
                    </div>
                    <div class="workflow" v-if="clickRouterBtns.deleteBtn">
                        <img src="@/assets/SSO/delete.png">
                    </div>
                    <div class="workflow" v-if="clickRouterBtns.logoutBtn">
                        <img src="@/assets/SSO/logout.png">
                    </div>
                </div>
            </div>
            <div class="schema-content" v-if="SchemaView">
                <img src="@/assets/SSO/user_schema_char.png" alt=""/>
                <img src="@/assets/SSO/user_schema_num.png" alt=""/>
                <img src="@/assets/SSO/user_schema_datetime.png" alt=""/>
            </div>
        </div>
        <!-- <div class="pre-loader">
            <div class="content">
                <div class="text">
                    Everyone uses a <span>preloader,</span>sorry :(
                </div>
                <div class="loader"></div>
            </div>
        </div> -->
    </div>
    
</template>

<script>
import {ref, onMounted} from 'vue';
import {gsap} from 'gsap';
import { RouterView } from 'vue-router';

export default{
    setup(){

        const RouterView = ref(true);
        const SchemaView = ref(false);

        const clickViewBtns = (clickView) => {
            console.log("clickView: ", clickView);
            if (clickView == 'SchemaView'){
                RouterView.value = false;
                SchemaView.value = true;
            }
            else{
                RouterView.value = true;
                SchemaView.value = false;
            }
        };

        const hoverRouterBtns = ref({
            registerBtn: false, 
            loginBtn: false, 
            updateBtn: false, 
            deleteBtn: false, 
            logoutBtn: false
        });

        const clickRouterBtns = ref({
            registerBtn: true, 
            loginBtn: false, 
            updateBtn: false, 
            deleteBtn: false, 
            logoutBtn: false
        })

        const routerBtnBgColor = ref({
            registerBtn: 'transparent',
            loginBtn: 'transparent',
            updateBtn: 'transparent',
            deleteBtn: 'transparent',
            logoutBtn: 'transparent'
        })
        const handleClickRouterBtn = (clickedBtn) => {
            for(let key in clickRouterBtns.value){
                clickRouterBtns.value[key] = false;
                routerBtnBgColor.value[key] = 'transparent';
            }

            clickRouterBtns.value[clickedBtn] = true;
            console.log(`${clickedBtn} button clicked`);
            console.log(clickRouterBtns.value);
            routerBtnBgColor.value[clickedBtn] = '#3FA2F6';
        };


        onMounted(()=>{
        });


        return{
            hoverRouterBtns,
            clickRouterBtns,
            handleClickRouterBtn,
            routerBtnBgColor,
            RouterView,
            SchemaView,
            clickViewBtns,
        }
    }
}







</script>

<style scoped>

.container{
    max-width: 1800px;
    display: flex;
    flex-direction: column;
    background-color: #000;
    font-family: "Orbitron", sans-serif;
}
.navbar{
    width: 100%;
    height: 10vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: #000;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* font-family: "Neue Montreal"; */
    text-transform: uppercase;
    padding: 0 2rem;
    z-index: 999;
}
.logo{
    padding: 0.4rem 0.8rem;
}

.link{
    border: 2px solid red;
    border-radius: 6px;
    padding: 0.4rem 0.8rem;
}
.title-section{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10vh;
    width: 100%;
    height: 80vh;
    background-color: #ffc822;
    border-radius: 1rem 1rem 0 0;
    padding: 2rem;
    position: relative;
}
.title{
    flex: 1;
    position: absolute;
    top: 20vh;
}
.video{
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    margin-right: 10vw;
    border-radius: 10
}
.row{
    width: 500px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.row .h1{
    font-size: 64px;

}
.row .span{
    width: 500px;
    margin-left: 20px;
}



.pre-loader{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background: #000;
    display:flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2vw;
}


.project-section{
    height: 150vh;
    max-width: 1800px;
    display: flex;
    flex-direction: column;
    background-color: black;
    position: relative;
}

.project-navbar{
    display: flex;
    position: absolute;
    top: 13vh;
    
}
.project_nav-component{
    display: flex;
    position: row;
    width: 50vw;
    
}
.project-navbar ul{
    margin-left: 30px;
    
}
.project_navitem{

    list-style: none;
    padding: 0;
    margin: 0;
    width: 300px;
    gap: 10px;
    
}

.pin-icon{
    font-size: 20px;
    color: #FFD43B;
    margin-right: 20px;
}
.project_navbtn{
    background-color: transparent;
    color: white;
    font-size: 28px;
    border: none;
}
.project_navbtn:hover{
    border-bottom: solid 2px #FFD43B;
    color: #FFD43B;
}
.project-content{
    display: flex;
    flex-direction: row;
    max-width: 1800px;
    height: 80vh;
    margin-top: 20vh;
    margin-left: 4vw;
    margin-right: 4vw;
    flex-wrap: nowrap;
    overflow: hidden;
    gap: 30px;
    border: solid 1px #3FA2F6;
    justify-content: center;
    align-content: center;
    align-items: center;
}
.schema-content{
    display: flex;
    flex-direction: row;
    overflow: hidden;
    max-width: 1800px;
    height: auto;
    max-height: 80vh;
    margin-top: 20vh;
    margin-left: 4vw;
    margin-right: 4vw;
    padding: 5vw;
    border: solid 1px #3FA2F6;
    gap: 3vw;
    
}
.schema-content img{
    width: auto; /* Let the width adjust automatically */
    height: auto; /* Let the height adjust automatically */
    max-width: 100%; /* Prevents large images from exceeding container width */
    max-height: 80vh; /* Set a max height for large images */
    min-width: 10vw; /* Set a minimum width for small images */
    min-height: 40vh; /* Set a minimum height for small images */
}


.router-workflow{
    display: flex;
    flex-direction: column;
    width: 80%;
}
.workflow{
    display: flex;
    overflow: hidden;
    justify-content: center;
    width: 50vw;
    height: auto; /* keep image in ratio and container */
    max-height: 75vh; /* keep image in ratio and container */
}
.workflow img{
    object-fit: contain; /* keep image in ratio and container */
    object-position: center;
}


.router-sidebar{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 15%;
    border: solid 1px #3FA2F6;
    padding-left: 0;
}

.router-list{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: space-between;
    margin-top: 10px;  
    padding-left: 2px;
}
.router-list li{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-bottom: solid 2px #3FA2F6;
        
}
.router-list li:first-child{
    border-top: solid 2px #3FA2F6;
}
.router-list li img{
    transition: transform 0.3s ease;
}


.router-btn{
    font-size: 24px;
    padding: 5px 8px;
    color: #fff;
    border: none;
    background-color: transparent;

}



</style>