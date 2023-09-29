import {useUserStore} from '../../../src/stores/user';
import {createPinia, setActivePinia} from 'pinia'; //to test isolate pinia to register global pinia

describe("state", ()=>{
    beforeEach(()=>{
       setActivePinia(createPinia());
    });

    it("Keeps track ofifuser is logged in", ()=>{
        const store = useUserStore();
        expect(store.isLoggedIn).toBe(false)
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

})
