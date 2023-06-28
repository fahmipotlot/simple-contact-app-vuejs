<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import api from '../../api'

    const contacts = ref([]);
    const q = ref("");

    const filter = async () => {
        let dataSearch = [];
        q?.value ? dataSearch.push(['q', q?.value]) : ''
        const params = new URLSearchParams(dataSearch);
        
        await api.get('contact', { params })
        .then(response => {
            contacts.value = response.data
        });
    }

    const clearFilter = async () => {
        q.value = ""
        
        await api.get('contact')
        .then(response => {
            contacts.value = response.data
        });
    }

    const fetchDataContact = async () => {
        await api.get('contact')
        .then(response => {
            contacts.value = response.data
        });
    }
    
    const router = useRouter()
    const token = localStorage.getItem('token')

    onMounted(() => {
        if(!token) {
            return router.push({
                name: 'login'
            })
        }
        fetchDataContact();
    });

    const deleteContact = async (id) => {
        await api.delete(`contact/${id}`)
        .then(() => {
            fetchDataContact();
        })
    };
</script>

<template>
    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div class="col-md-12">
                            Contact List
                            <hr>
                            <router-link :to="{ name: 'contact.create' }" class="btn btn-md btn-success rounded shadow border-0 mb-3">Add contact</router-link>
                            <div class="row mb-3">
                                <div class="col-md-3 mb-3"></div>
                                <div class="col-md-3 mb-3"></div>
                                <div class="col-md-3 mb-3">
                                    <input type="text" v-model="q" class="form-control" placeholder="Search">
                                </div>
                                <div class="col-md-3">
                                    <button @click="filter" class="btn btn-md btn-primary rounded-sm shadow border-0 me-2">Filter</button>
                                    <button @click="clearFilter" class="btn btn-md btn-primary rounded-sm shadow border-0">Clear Filter</button>
                                </div>
                            </div>
                            <div class="card border-0 rounded shadow">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered">
                                            <thead class="bg-dark text-white">
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Phone</th>
                                                    <th scope="col" style="width:15%">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-if="contacts.length == 0">
                                                    <td colspan="4" class="text-center">
                                                        <div class="alert alert-danger mb-0">
                                                            Data Not Found!
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-else v-for="(contact, index) in contacts" :key="index">
                                                    <td>{{ contact.name }}</td>
                                                    <td>{{ contact.email }}</td>
                                                    <td>{{ contact.phone }}</td>
                                                    <td class="text-center">
                                                        <router-link :to="{ name: 'contact.edit', params:{id: contact.id} }" class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</router-link>
                                                        <button @click.prevent="deleteContact(contact.id)" class="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>