import {ADD_SELECTED_DEGREES, useUserStore} from '../../../src/stores/user';
import {createPinia, setActivePinia} from 'pinia'; //to test isolate pinia to register global pinia
import { expect } from 'vitest';

describe("state", ()=>{
    beforeEach(()=>{
       setActivePinia(createPinia());
    });

    it("Keeps track ofifuser is logged in", ()=>{
        const store = useUserStore();
        expect(store.isLoggedIn).toBe(false)
    });
    it('stores the organization that heuser would like to filter', ()=>{
        const store = useUserStore();
        expect(store.selectedOrganizations).toEqual([])
    });
    it ("stores jobtypes that user would like to filter", ()=>{
        const store = useUserStore();
        expect(store.selectedJobTypes).toEqual([]);
    })
    it("stored degrees that user would like to filter", ()=>{
        const store = useUserStore();
        expect(store.selectedDegrees).toEqual([]);
    })
    it("stores users search term for skills", ()=>{
        const store = useUserStore();
        expect(store.skillsSearchTerm).toBe("");

    })

});

describe("actions", ()=>{
    beforeEach(()=>{
        setActivePinia(createPinia());
    });
    describe("login User", ()=>{
        it('Logs the user',()=>{
            const store = useUserStore();
            store.LOGIN_USER();
            expect(store.isLoggedIn).toBe(true);
        })
    })

    describe('ADD_SELECTED_ORGANIZATIONS', ()=>{
        it('updates organization, that user has selected to filter jobs by', ()=>{
            const store = useUserStore();
            store.ADD_SELECTED_ORGANIZATIONS(['Org1', 'Org2']);
            expect(store.selectedOrganizations).toEqual(['Org1', 'Org2']);
        });


    });

    describe("ADD_SELECTED_JOB_TYPES" , ()=>{
        it("update job type,  that user has selected to filter jobs by", ()=>{
            const store = useUserStore();
            store.ADD_SELECTED_JOB_TYPES(["type1", "type2"]);

            expect(store.selectedJobTypes).toEqual(["type1", "type2"]);
        })
    })

    describe("ADD_SELECTED_DEGREES", ()=>{
        it("update degrees user has chosen", ()=>{
            const store = useUserStore();
            store.ADD_SELECTED_DEGREES(["Bachelor's", "Master's"]);

            expect(store.selectedDegrees).toEqual(["Bachelor's", "Master's"]);
        })
    })
    describe("UPDATE_SKILLS_SEARCH_TERM", ()=>{
        it("receives search term for skills the user has entered", ()=>{
            const store = useUserStore();
            store.skillsSearchTerm = '';

            store.UPDATE_SKILLS_SEARCH_TERM("test");
            expect(store.skillsSearchTerm).toBe("test");
        })

    })
    describe("CLEAR_USER_JOB_FILTER_SELECTIONS", ()=>{
        it("removes all finters that user has chosen", ()=>{
            const store = useUserStore();
            store.selectedOrganizations = ["test"];
            store.selectedJobTypes = ["test"];
            store.selectedDegrees = ["test"];
            store.skillsSearchTerm = ["test"];

            store.CLEAR_USER_JOB_FILTER_SELECTIONS();

            expect(store.selectedOrganizations).toEqual([]);
            expect(store.selectedJobTypes).toEqual([]);
            expect(store.selectedDegrees).toEqual([]);
            expect(store.skillsSearchTerm).toBe('');
        })
    })



})
