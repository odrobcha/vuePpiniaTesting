import {defineStore} from 'pinia';

export const useUserStore = defineStore("user", { //first argument is let say the name(id) of this store, second = config object
    state: ()=>({
        isLoggedIn: false
    }),

    actions: {
        loginUser(){
            this.isLoggedIn = true;
        }
    }
});
