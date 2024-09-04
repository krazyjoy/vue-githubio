<template>
    <div class="container">
        <div class="title">
            <span class="title-text">Project Gallery</span>
            <span class="subtitle-text">I strive to provide the best services</span>
        </div>
        <div class="gallery">
            <div class="row">
                <div class="col">
                    <img src="@/assets/projects/kgil-website-design.jpg" alt="kgil-frontend"/>
                    <div class="overlay">
                        <span class="project-name mb-3" type="text">KGIL-FRONTEND</span>
                        <a class="btn btn-secondary" href="https://www.4gamers.com.tw/news/detail/66713/honkai-star-rail-jiaoqiu-guide" role="button" onclick="return false;">Learn more</a>
                    </div>
                </div>
                <div class="col">
                    <img src="@/assets/projects/django-third-party-login.png" alt="django-sso"/>
                    <div class="overlay">
                        <span class="project-name mb-3" type="text">DJANGO-SSO</span>
                        <a class="btn btn-secondary" href="#" role="button">Learn more</a>
                    </div>
                </div>
                <div class="col">
                    <img src="@/assets/projects/iaas-elastic-app.jpg" alt="aws-iaas-service"/>
                    <div class="overlay">
                        <span class="project-name mb-3" type="text">AWS-IAAS-SERVICE</span>
                        <a class="btn btn-secondary" href="#" role="button">Learn more</a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <img src="@/assets/projects/blank-img.jpeg" alt="blank"/>
                    <div class="overlay">
                        <span class="project-name mb-3" type="text">DJANGO-SSO</span>
                        <a class="btn btn-secondary" href="#" role="button">Learn more</a>
                    </div>
                </div>
                <div class="col">
                    <img src="@/assets/projects/blank-img.jpeg" alt="blank"/>
                </div>
                <div class="col">
                    <img src="@/assets/projects/blank-img.jpeg" alt="blank"/>
                </div>

            </div>
            

        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';


</script>

<style scoped>
.container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    
}

.title{
    display: flex;
    flex-direction: column;
    color: #000;
    margin-top: 10px;
    padding: 4px;
}

.title-text{
    font-weight: 900;
    font-size: 40px;

    margin-bottom: 10px;
    font-family: "Bebas Neue", sans-serif;
    letter-spacing: 2px;
}

.subtitle-text{
    margin-left: 10px;
    padding-left: 20px;
}


.gallery{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 100vw;
    max-height: 150vh;
    border: solid 3px #000;
    padding: 10px;
    box-sizing: border-box;
}
.row{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 50px;
}

.col{
    flex: 1 1 calc(33.3%-10px);
    min-height: 30vh;
    padding: 5px;
    box-sizing: border-box;
    border: solid 1px #000;
    border-radius: 5px;
    position: relative;
    overflow: hidden;

}

.col:not(:last-child){
    margin-right: 20px;
}

.col img{
    width: 100%;
    padding: 2px;
    height: auto;
    display: block;
    object-fit: contain; 
    transition: transform 0.3s ease;
    border: solid 1px #000;
    z-index: 1; /* place image on top */
}  

.col:hover img{
    transform: scale(1.2);
    z-index: 2; /* bring image to the front */
}

.overlay{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: hsla(0, 0%, 0%, 0.6);
    
    /* button & title */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    
    transition: opacity 0.3s ease;
    /* hide overlay */
    opacity: 0;
    z-index: 0; /* place overlay behind image */
}

.col:hover .overlay{
    opacity: 1;
    z-index: 1; /* overlay moves up but stays behind hover image */
}

.project-name{
    font-weight: 500;
    font-size: large;
    text-decoration: uppercase; /* not taking effect */

}
@media (max-width: 768px){
    .row{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }
    .col{
        flex: 1 1 calc(50% - 10px);
        padding: 5px;
        box-sizing: border-box;
        border: solid 1px #000;
    }
    .col img{
        width: 100%;
        height: auto;
        display: block;
        object-fit: cover; 
    }
}

@media(max-width: 480px){
    .row{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }
    .col{
        flex: 1 1 calc(100% - 10px);
        padding: 5px;
        box-sizing: border-box;
        border: solid 1px #000;
    }
    .col img{
        width: 100%;
        height: auto;
        display: block;
        object-fit: cover; 
    }
}



</style>