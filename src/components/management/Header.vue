<template>
    <div class="container">
        <h2 class="title">
            <span>I</span>
            <span>n</span>
            <span>s</span>
            <span>p</span>
            <span>i</span>
            <span>r</span>
            <span>a</span>
            <span>t</span>
            <span>i</span>
            <span>o</span>
            <span>n</span>
        </h2>
        <div class="button_container">
            <button class="start-button">button
                <font-awesome-icon :icon="['fas', 'arrow-right-long']" class="start-arrow"/>
            </button>
            
        </div>
    </div>
</template>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    max-width: 1800px;
    min-height: 100vh;
    background-image: url(@/assets/square_pattern_bg.jpg);
    background-size: cover;
    position: relative;
}
.title{
    position: absolute;
    top: 50vh;
    left: 5vw;
    color: white;
    font-size: 64px;
    letter-spacing: 3px;
}
.title span:hover{
    transform: scale(1.2);
    color: #fc6161;
    background-color: transparent;
    cursor: pointer;
}
.subimage{
    content: '';
    position: absolute;
    z-index: 1;
    top: 60vh;
    right: 2vw;
    background: radial-gradient(circle, transparent, black);
    opacity: 0.7;
    pointer-events: none;
}

.button_container{
    display: flex;
    flex-direction: row;

    position: absolute;
    top: 70vh;
    left: 5vw;
    min-width: 10vw;
    min-height: 6vh;
}

.start-button{
    width: 100%;
    height: 100%;
    padding: 8px;
    background-color: #c6fc01;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 3px;
}

.start-arrow{
    color: #000;
    margin-left: 10px;
    margin-top: 2px;
    font-size: 24px;
    transition: margin-left 0.3s ease; 
}

.start-button:hover .start-arrow{
    margin-left: 20px;
}

</style>