<template>
    <div class="container">
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <a class="navbar-brand mx-2 p-2" href="#">DjangoApp</a>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item me-3">
                        <a @click.prevent="clickHome" role="button" class="nav-link" href="#">Home</a>
                    </li>
                    <li class="nav-item me-3">
                        <a @click="clickChangeEmail" role="button" class="nav-link" href="#">Change Email</a>
                    </li>
                    <li class="nav-item me-3">
                        <a class="nav-link" href="#">Sign Out</a>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="HomeSection" v-if="displayHome">
            <div class="title-section">
                <div class="line"><hr></div>
                <div class="title">Home</div>
                <div class="line"><hr></div>
            </div>
           
            <div class="content">
                <span>Daniel, Welcome to your homepage.</span>
            </div>
        </div>

        <div class="ChangeEmailSection" v-if="displayChangeEmail">
            <div class="title-section">
                <div class="line"><hr></div>
                <div class="title">Change Email</div>
                <div class="line"><hr></div>
            </div>
            <div class="form-container">
                <form>
                    <div class="input-group">
                        <span>Original Email: </span>
                        <div class="email-verify">
                            <input type="email" class="input-group-input"/>
                            <button class="verify-btn">Send Code</button>
                        </div>
                        
                    </div>
                    <div class="input-group">
                        <span>New Email: </span>
                        <input type="email" class="input-group-input"/>
                    </div>
                </form>
            </div>
            
        </div>
    </div>
</template>
<script>
import {ref} from 'vue';
export default{
    setup(){
            

        const displayHome = ref(false);
        const displayChangeEmail = ref(false);
        const title = ref('');


        const clickHome = (event) => {
            displayHome.value = !displayHome.value;
            title.value = 'Home';
            console.log("displayHome: ", displayHome.value);

        };

        const clickChangeEmail = (event) => {
            displayChangeEmail.value = !displayChangeEmail.value;
            console.log("display Change Email: ", displayChangeEmail.value)

        }

        return {
            displayHome,
            displayChangeEmail,
            title,
            clickHome, // Make sure clickHome is returned here
            clickChangeEmail, 
        };
    }
}

</script>
<style scoped>
.container{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.navbar-brand:hover{
    background-color: #fff;
    color: #000;
    border-radius: 10px;
}
.nav-item:hover{
    background-color: #fff;
    border-radius: 10px;
}
.nav-link:hover{
    background-color: transparent;
    color: #000;
}
.nav-link:active{
    font-weight: bold;
}

.HomeSection, .ChangeEmailSection{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20vh;
}

.title-section{
    display: flex;
    flex-direction: row;
}
.line{
    
    padding-top: 5vh;
    width: 20vw;
    
    font-size: 32px;
    margin: 0 10px;
}
hr{
    height: 5px;
    color: black;
    font-weight: bold;
}
.title{
    color: #000;
    font-size: 64px;
    display: inline-block;
    margin-bottom: 5vw;
}

.form-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    
}

.input-group{
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    margin: 5px 0;
    font-family: Arial, Helvetica, sans-serif;
    width: 50vw;
    margin: 0 -30px 0 0;

}
.email-verify{
    display: flex;
    flex-direction: row;
    max-height: 8vh;
    justify-content: space-between;
}
.email-verify input{
    max-width: 25vw;
}
.verify-btn{
    margin-right: 12vw;
    margin-bottom: 2vh;
    background-color: #7FA1C3;
    color: #fff;
    border: #7FA1C3;
    border-radius: 5px;
    width: 10vw;

}
.input-group-input{
    margin-bottom: 20px;
    width: 30vw;
    border: solid 1px #000;
    border-radius: 10px;
}
</style>

