import {defineStore} from 'pinia';
export const ADD_SELECTED_ORGANIZATIONS = "ADD_SELECTED_ORGANIZATIONS";
export const ADD_SELECTED_JOB_TYPES = "ADD_SELECTED_JOB_TYPES";

export const useUserStore = defineStore("user", { //first argument is let say the name(id) of this store, second = config object
    state: ()=>({
        isLoggedIn: false,
        selectedOrganizations: [],
        selectedJobTypes : [],
    }),

    actions: {
        loginUser(){
            this.isLoggedIn = true;
        },
        [ADD_SELECTED_ORGANIZATIONS](organizations){
            this.selectedOrganizations = organizations;
        },
        [ADD_SELECTED_JOB_TYPES](types){
            this.selectedJobTypes = types;
        }


    }
});
