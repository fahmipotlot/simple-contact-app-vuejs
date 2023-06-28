<script setup>
    import { onMounted, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import api from '../../api'

    const router = useRouter()
    const user = ref('')

    onMounted(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            return router.push({
                name: 'login'
            })
        }
        
        user.value = JSON.parse(localStorage.getItem('user'))
        if (!user.value) {
            api.get('profile')
                .then(response => {
                    user.value = response.data
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        }
    })
</script>

<template>
    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        DASHBOARD
                        <hr>
                        Selamat Datang <strong>{{ user.name }}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>