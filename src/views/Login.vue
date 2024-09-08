<template>
    <div class="login ">
        <div class="grid">
            <div class="row">
                <div class="form col-1">
                    <div class="form-title">
                        Sign In
                    </div>
                    <div class="form-group col-1">
                        <span class="form-group-text mr-20">account </span>
                        <input class="form-group-input" type="email" placeholder=" email">
                    </div>
                    <div class="form-group col-1">
                        <span class="form-group-text mr-10">password  </span>
                        <input class="form-group-input" type="password" placeholder=" password">
                    </div>
                    <div class="mb-5">
                        <button class="submit-button" type="button">Sign In</button>
                        <div class="split-line">
                            <span>OR</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
*{
    font-family: system-ui, -apple-system;
}
.login{
    display: flex;
    
}

.grid{
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 10;
    padding: 2px;
}
.col-1 { grid-column: span 1; }
.col-2 { grid-column: span 2; }
.col-3 { grid-column: span 3; }
.col-4 { grid-column: span 4; }
.col-5 { grid-column: span 5; }
.col-6 { grid-column: span 6; }
.col-7 { grid-column: span 7; }
.col-8 { grid-column: span 8; }
.col-9 { grid-column: span 9; }
.col-10 { grid-column: span 10; }
.col-11 { grid-column: span 11; }
.col-12 { grid-column: span 12; }

.form{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    min-width: 25vw;
    min-height: 60vh;
    margin: 10px;
    padding: 6px;
    border: solid 1px #000;
    border-radius: 4px;
}

.form-group{
    background-color: beige;
    background-color: rgba(rgb(136, 136, 136), 0);
    margin-top: 5px;
    margin-bottom: 20px;
    padding: 10px 15px;
    border: solid 1px #000;
    border-radius: 4px;
    width: 90%;
    max-width: 300px;
}

.form-group-text{
    
    width: 120px;
    padding: 5px;
    margin: 4px;
    font-weight: 600;
    font-size: 18px;
}

.form-group-input{
    width: 100%;
    max-width: 150px;
    min-height: 30px;
}
.mr-10{
    margin-right: 10px;
}
.mr-20{
    margin-right: 20px;
}


.form-title{
    font-size: 40px;
    margin-bottom: 25px;
}

.mb-5{
    margin-bottom: 5px;
}


.submit-button{
    position: relative;
    top: 100px;
    margin-bottom: 5px;
    background-color: #00367C;
    color: #fff;
    padding: 6px 8px;
    border-radius: 5px;
    letter-spacing: 1px;
    font-size: 18px;
}

.split-line{
    display: flex;
    justify-content: center;
    text-align: center;
}

.split-line::before, .split-line::after{
    content: '';
    position: relative;
    flex: 1;
    margin: 0 5px;
    width: 50px;
    border: solid 1px #000;
    top: -9px;
}

.split-line span{
    white-space: nowrap;
    margin: 0 4px;
}

</style>