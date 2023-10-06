import {useUserStore} from '../../../src/stores/user';
import {createPinia, setActivePinia} from 'pinia';
import { expect } from 'vitest'; //to test isolate pinia to register global pinia

describe("state", ()=>{
    beforeEach(()=>{
       setActivePinia(createPinia());
    });

    it("Keeps track ofifuser is logged in", ()=>{
        const store = useUserStore();
        expect(store.isLoggedIn).toBe(false)
    });
    it('stores the organization that heuser wouldlike to filter', ()=>{
        const store = useUserStore();
        expect(store.selectedOrganizations).toEqual([])
    });
    it ("stores jobtypes that user would like to filter", ()=>{
        const store = useUserStore();
        expect(store.selectedJobTypes).toEqual([]);
    })

});

describe("actions", ()=>{
    beforeEach(()=>{
        setActivePinia(createPinia());
    });
    describe("login User", ()=>{
        it('Logs the user',()=>{
            const store = useUserStore();
            store.loginUser();
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

})
