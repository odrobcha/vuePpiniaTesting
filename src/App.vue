<template>
	<div class="m-2">
		<MainNav></MainNav>
	</div>
	<router-view>
	</router-view>

</template>

<script setup lang="ts">
  import MainNav from './components/Navigation/MainNav.vue';

</script>
