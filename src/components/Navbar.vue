<template>
    <div class="navbar">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle Navigation">
                <span class="navar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarToggler">
                <a class="navbar-brand mx-3" href="#">Brand</a>
                <ul class="navbar-nav m-2 p-2">
                    <li class="nav-item">
                        <a class="navlink" href="#">About Me</a>
                    </li>
                    <li class="nav-item">
                        <a class="navlink" href="#">Tech Stack</a>
                    </li>
                    <li class="nav-item">
                        <a class="navlink" href="#">Latest Projects</a>
                    </li>
                </ul>
                
            </div>
        </nav>
    </div>
</template>




<style scoped>
.navbar{
    width: 100%;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    max-width: 1800px;
    margin: 0;
    max-height: 20vh;
    border-bottom: solid 1px #fff;
    z-index: 1000;
}

.navlink{
    display: block;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.55);
    line-height: 24px;
    letter-spacing: 2px;
    padding: 8px;
    transition: transform 0.3s ease;
    margin-right: 10px;
}

.navbar-brand{
    font-size: 42px;
    margin-left: 20px;
    padding: 5px 10px;
}

.navbar-brand:hover, .navlink:hover{
    transform: scale(1.2);
    color: #c6fc01;
    background-color: transparent;
}
</style>