<script setup>
	const isNotLogin = localStorage.getItem('token') ? false : true
	const isLogin = !isNotLogin

	function logout() {
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		location.replace('login')
	}
</script>

<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<router-link :to="{name: 'dashboard'}" class="navbar-brand" style="padding-left: 20px">Contact App</router-link>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav ml-auto">
				<li class="nav-item" v-if="isNotLogin">
					<router-link :to="{name: 'register'}" class="nav-link" href="">Register</router-link>
				</li>
				<li class="nav-item" v-if="isNotLogin">
					<router-link :to="{name: 'login'}" class="nav-link" href="#">Login</router-link>
				</li>
				<li class="nav-item" v-if="isLogin">
					<router-link :to="{name: 'contact.index'}" class="nav-link" href="#">Contact</router-link>
				</li>
				<li v-if="isLogin" @click.prevent="logout" class="nav-item" style="cursor:pointer">
					<a class="nav-link" href="#">Logout</a>
				</li>
			</ul>
		</div>
	</nav>
	<router-view />
</template>

<style>
	body {
		background: lightgray!important;
	}
</style>