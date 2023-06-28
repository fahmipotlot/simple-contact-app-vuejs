<script setup>
    import { reactive, ref } from 'vue'
    import api from '../../api'

    const user = reactive({
        email: '',
        password: '',
    })
    const validation = ref([])
    const loginFailed = ref(null)

    function login() {
        let email = user.email
        let password = user.password
        api.post('login', {
            email,
            password,
        })
        .then(response => {
            if(response.data.token) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data))
                location.replace('dashboard')
            }
        }).catch(error => {
            loginFailed.value = true
            validation.value = error.response?.data?.errors
        })
    }
</script>

<template>
    <div class="container-fluid mt-5">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div v-if="loginFailed" class="alert alert-danger">
                    Email atau Password Anda salah.
                </div>
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>LOGIN</h4>
                        <hr>
                        <form @submit.prevent="login">
                            <div class="form-group">
                                <label>Email address</label>
                                <br>
                                <input type="email" v-model="user.email" class="form-control" placeholder="Email Address">
                            </div>
                            <div v-if="validation.email" class="mt-2 alert alert-danger">
                                {{ validation.email[0] }}
                            </div>

                            <div class="form-group">
                                <label>Password</label>
                                <br>
                                <input type="password" v-model="user.password" class="form-control" placeholder="Password">
                            </div>
                            <div v-if="validation.password" class="mt-2 alert alert-danger">
                                {{ validation.password[0] }}
                            </div>
                            <br>
                            <button type="submit" class="btn btn-primary btn-block">LOGIN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
