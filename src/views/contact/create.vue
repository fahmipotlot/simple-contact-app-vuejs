<script setup>
    import { ref, onMounted } from "vue"
    import { useRouter } from 'vue-router'
    import api from "../../api"

    const router = useRouter();
    const name = ref("");
    const email = ref("");
    const phone = ref("");
    const message = ref("");
    const errors = ref([]);
    const token = localStorage.getItem('token')

    onMounted(() => {
        if(!token) {
            return router.push({
                name: 'login'
            })
        }
    })

    const storecontact = async () => {
        let formData = new FormData();
        formData.append("name", name.value);
        formData.append("email", email.value);
        formData.append("phone", phone.value);

        await api.post('contact', formData)
        .then(() => {
            router.push({ path: "/contact" });
        })
        .catch((error) => {
            message.value = error.response.data.message;
            errors.value = error.response.data.errors;
        });
    };
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div v-if="message" class="alert alert-danger mt-2">
                            <span>{{ message }}</span>
                        </div>
                        <form @submit.prevent="storecontact()">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Name</label>
                                <input type="text" class="form-control" v-model="name" placeholder="Name">
                                <div v-if="errors.name" class="alert alert-danger mt-2">
                                    <span>{{ errors.name[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Email</label>
                                <input type="text" class="form-control" v-model="email" placeholder="email">
                                <div v-if="errors.email" class="alert alert-danger mt-2">
                                    <span>{{ errors.email[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Phone</label>
                                <input type="text" class="form-control" v-model="phone" placeholder="phone">
                                <div v-if="errors.phone" class="alert alert-danger mt-2">
                                    <span>{{ errors.phone[0] }}</span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>