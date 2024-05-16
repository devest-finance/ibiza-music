<template>
    <div v-if="visible" class="cookie_banner">
        <div class="cookie_content">
            <p>We use cookies to improve your experience on our site. By using our site, you consent to cookies.</p>
            <button @click="acceptCookies">Accept</button>
        </div>
    </div>
</template>
  
<script setup>
    import { ref, onMounted } from 'vue';
  
    const visible = ref(true);
  
    function acceptCookies()  {
        document.cookie = "acceptedCookies=true; max-age=31536000";
        visible.value = false;
    };
  
    onMounted(() => {
        if (document.cookie.split(';').some((item) => item.trim().startsWith('acceptedCookies='))) {
            visible.value = false;
        }
    });
  
</script>
  
<style scoped>
    .cookie_banner {
        display: flex;
        width: 100%;
        justify-content: center;
    }
    .cookie_banner p {
        color: white;
        margin-left: 20px;
    }
    .cookie_content {
        display: flex;
        justify-content: space-between;
        width: 75%;
        border: 1px solid rgba(250,250,250,0.8);
        border-radius: 10px;
        background-color: #5C4AB699;
    }
    .cookie_content button {
        background-color: transparent;
        border: 1px solid rgba(250, 250, 250, 0.8);
        padding: 5px 10px;
        color: white;
        border-radius: 10rem;
        height: 35px;
        justify-self: center;
        align-self: center;
        cursor: pointer;
        margin-right: 20px
    }
    .cookie_content button:hover {
        background-color: #ec0868;
        border: 1px solid #ec0868;
    }
</style>