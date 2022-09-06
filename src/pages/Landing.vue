<template>
    <div class="landing landing-container">
        <div class="landing-layout">
            <!-- Whitespace on the left -->
            <div class="landing-division landing-whitespace"></div>
            <div class="landing-division landing-text">
                <div class="landing-img-container">
                    <!-- Landing Logo -->
                    <img id="landing-logo" src="../assets/logo.svg" alt="">

                    <!-- landing titles -->
                    <div id="landing-title-container">
                        <img class="landing-title-outline" src="../assets/landing-title-outline.svg" alt="">  
                        <img class="landing-title-outline" src="../assets/landing-title-outline.svg" alt="">  
                        <img class="landing-title" src="../assets/landing-title-solid.svg" alt="Apheleia">  
                    </div>
                </div>

                <!-- Login button -->
                <input id="landing-login" type="button" name="landing-login" value="Login" @click="login()">
            </div>

            <!-- Gradient banner -->
            <div class="landing-division landing-banner"></div>
            <div class="landing-division landing-whitespace"></div>
        </div>
    </div>
</template>

<style scoped>
    .landing-layout {
        display: grid;
        grid-template: 100vh / 10% 50% 10% 40%;
        justify-content: center;
        align-items: center;
        bottom: 0;
    }
    .landing-division {
        padding: 0 4em;
    }
    .landing-text {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: flex-end;
    }
    .landing-img-container {
        width: 80%;
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-end;
        justify-content: space-between;
        padding-top: 20%;
    }
    #landing-logo {
        
    }
    #landing-title-container {
        display: flex;
        flex-flow: column nowrap;
        width: 77%;
        height: 100%;
    }
    .landing-title .landing-title-outline {
        width: 100%;
    }
    .landing-title-outline {
        padding-bottom: 0px;
        transition: 0.2s;
    }
    .landing-title-outline:hover {
        padding-bottom: 10px;
        transition: 0.2s;
    }
    #landing-logo {
        width: 18%;
    }
    #landing-login {
        width: 20%;
        height: 4em;
        border: 0.25em solid var(--aph-purple);
        border-radius: 0.4em;
        background-color: transparent;
        font-family: "Montserrat";
        font-size: 0.7vw;
        margin-top: 1em;
        transition: 0.1s
    }
    #landing-login:hover {
        background-color: var(--aph-purple);
        border-radius: 1.2em;
        color: white;
        transition: 0.2s;
    }
    .landing-banner {
        background-image: linear-gradient(to top, var(--aph-purple-light) 10%, var(--aph-pink) 120%);
        height: 100%;
        width: 90%;
        margin: 0 auto;
        transition: 0.5s;
    }
    .landing-banner:hover {
        width: 100%;
        transition: 1.0s;
    }
    @media screen and (max-width: 1200px) {
        .landing-layout {
            grid-template: 100vh / 10% 70% 10% 20%;
        }
        #landing-login {
            font-size: 1.2vw;
        }
    }
    @media screen and (max-width: 800px) {
        .landing-layout {
            grid-template: 100vh / 0% 80% 20% 0%;
        }
        .landing-img-container {
            width: 100%;
        }
    
        #landing-login {
            font-size: 1.5vw;
            width: 30%;
        }
    }
</style>

<script>
    import { defineComponent, ref } from 'vue'
    import { login, auth_setup } from "../scripts/auth.js"

    export default defineComponent({
        name: 'Landing',

        setup () {
            auth_setup();
            return {
                login
            }
        }
    })
</script>