import {createPinia, setActivePinia} from 'pinia'; //to test isolate pinia to register global pinia
import {useJobsStore} from "@/stores/jobs";

import axios from 'axios';
import { addStaticClass } from '@fortawesome/vue-fontawesome/src/utils';
vi.mock(axios);


describe("state", ()=>{
    beforeEach(()=>{
        setActivePinia(createPinia()); //create and register global pinia instance
    });

    it("Stores  jobs listing", ()=>{
        const store = useJobsStore();
        expect(store.jobs).toEqual([]);  //to test initial state = []
    });


});

describe("actions", ()=>{
    beforeEach(()=>{
        setActivePinia(createPinia()); //create and register global pinia instance
    });
    describe("FETCH_JOBS", ()=>{
        it("makes API reqest and stores received jobs", async ()=>{
            axios.get.mockResolvedValue({data: ["JOB1", "JOB2"]});

            const store = useJobsStore();
            await store.FETCH_JOBS();

            expect(store.jobs).toBeEqual(["JOB1", "JOB2"]);

        })
    })

})

