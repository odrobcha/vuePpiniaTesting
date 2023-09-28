<template>
	<div class="m-2">
		<MainNav></MainNav>
	</div>
	<router-view>
	</router-view>

</template>

<script>
  import MainNav from './components/Navigation/MainNav.vue';


    export default {
        name: 'App',
        components: {MainNav},
    };
</script>
