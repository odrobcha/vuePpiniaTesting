import {defineStore} from 'pinia';
import {ref} from 'vue';

export const ADD_SELECTED_ORGANIZATIONS = "ADD_SELECTED_ORGANIZATIONS";
export const ADD_SELECTED_JOB_TYPES = "ADD_SELECTED_JOB_TYPES";
export const ADD_SELECTED_DEGREES = "ADD_SELECTED_DEGREES";
export const CLEAR_USER_JOB_FILTER_SELECTIONS = "CLEAR_USER_JOB_FILTER_SELECTIONS";
export const UPDATE_SKILLS_SEARCH_TERM = "UPDATE_SKILLS_SEARCH_TERM"


export const useUserStore = defineStore("user", () => {
    const isLoggedIn = ref(false);
    const selectedOrganizations = ref<string[]>([]);
    const selectedJobTypes = ref<string[]>([]);
    const selectedDegrees = ref<string[]>([]);
    const skillsSearchTerm = ref<string>('');

    const LOGIN_USER = () => {
        isLoggedIn.value = true;
    }
    const ADD_SELECTED_ORGANIZATIONS = (organizations: string[]) => {
        selectedOrganizations.value = organizations;
    }
    const ADD_SELECTED_JOB_TYPES = (types: string[]) => {
        selectedJobTypes.value = types;
    };
    const ADD_SELECTED_DEGREES = (degrees: string[]) => {
        selectedDegrees.value = degrees;
    };
    const CLEAR_USER_JOB_FILTER_SELECTIONS = () => {
        selectedOrganizations.value = [];
        selectedJobTypes.value = [];
        selectedDegrees.value = [];
        skillsSearchTerm.value = ''
    };

    const UPDATE_SKILLS_SEARCH_TERM = (term:string)=>{

        skillsSearchTerm.value=term;
    }

    return {
        isLoggedIn,
        selectedOrganizations,
        selectedJobTypes,
        selectedDegrees,
        skillsSearchTerm,
        LOGIN_USER,
        ADD_SELECTED_ORGANIZATIONS,
        ADD_SELECTED_JOB_TYPES,
        ADD_SELECTED_DEGREES,
        CLEAR_USER_JOB_FILTER_SELECTIONS,
        UPDATE_SKILLS_SEARCH_TERM
    }
})


// export interface UserState {
//     isLoggedIn: boolean,
//     selectedOrganizations: string[],
//     selectedJobTypes: string[],
//     selectedDegrees: string[],
// }
//
// export const useUserStore = defineStore("user", { //first argument is let say the name(id) of this store, second = config object
//     state: ():UserState =>({
//         isLoggedIn: false,
//         selectedOrganizations: [],
//         selectedJobTypes : [],
//         selectedDegrees: []
//     }),
//
//     actions: {
//         loginUser(){
//             this.isLoggedIn = true;
//         },
//         [ADD_SELECTED_ORGANIZATIONS](organizations:string[]){
//             this.selectedOrganizations = organizations;
//         },
//         [ADD_SELECTED_JOB_TYPES](types:string[]){
//             this.selectedJobTypes = types;
//         },
//         [ADD_SELECTED_DEGREES](degrees:string[]){
//             this.selectedDegrees = degrees;
//         },
//         [CLEAR_USER_JOB_FILTER_SELECTIONS](){
//             this.selectedOrganizations = [];
//             this.selectedJobTypes = [];
//             this.selectedDegrees = [];
//         }
//     }
// });
