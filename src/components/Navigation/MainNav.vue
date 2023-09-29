<template>
	<header :class="['w-full', 'text-sm', headerHeightClass]">
		<div class="fixed left-0 top-0 h-16 w-full bg-white">
			<div
					class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
			>
				<router-link :to="{name: 'Home'}" class="flex h-full items-center text-xl">Company</router-link>

				<nav class="ml-12 h-full">
					<ul class="flex h-full list-none">
						<li
								v-for="menuItem in menuItems"
								:key="menuItem.text"
								class="ml-9 h-full first:ml-0"
						>
							<router-link :to="menuItem.url" class="flex h-full items-center py-2.5">
								{{menuItem.text}}
							</router-link>
						</li>
					</ul>
				</nav>

				<div class="ml-auto flex h-full items-center">
					<profile-image v-if="isLoggedIn"/>
					<action-button v-else text="Sign in" @click="loginUser"/>
				</div>
			</div>

			<the-subnav v-if="isLoggedIn"/>
		</div>
	</header>
</template>

<script>
    import ActionButton from '@/components/Shared/ActionButton.vue';
    import ProfileImage from '@/components/Navigation/ProfileImage.vue';
    import TheSubnav from '@/components/Navigation/TheSubnav.vue';
    import { mapStores } from 'pinia';  //is used in combination of useUserStore

	import {mapActions, mapState} from 'pinia';

    import {useUserStore} from '../../stores/user';

    export default {
        name: 'MainNav',
        components: {
            ActionButton,
            ProfileImage,
            TheSubnav,
        },
        data () {
            return {
                menuItems: [
                    { text: 'Teams', url: '/' },
                    { text: 'Locations', url: '/' },
                    { text: 'Life at Bobo Corp', url: '/' },
                    { text: 'How we hire', url: '/' },
                    { text: 'Students', url: '/' },
                    { text: 'Jobs', url: '/jobs/results' },
                ],

            };
        },
        computed: {
            // ...mapStores(useUserStore), //all stores wichare neededinthe component,should to be pass to  mapStore/// it concantinate the the given name of store(user) with "Store" word =>userStore
			// 							// store is accessible  under this.userStore

			...mapState(useUserStore, ["isLoggedIn"]), // can be refered this.isLoggedIn /1 arg - storeName, 2 - array of properties,that we need to extract

            headerHeightClass () {
                return {
                    'h-16': !this.isLoggedIn,
                    'h-32': this.isLoggedIn,
                };
            },
        },
        methods: {
            ...mapActions(useUserStore, ['loginUser']),
            // loginUser () {
            //     this.userStore.loginUser();
            // },
        },
    };
</script>
