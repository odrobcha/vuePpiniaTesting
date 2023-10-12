import type {Mock} from "vitest";
import {createPinia, setActivePinia} from "pinia";
import {useDegreesStore} from "@/stores/degrees";

import axios from "axios";

vi.mock('axios');
const axiosGetMock = axios.get as Mock;

import {CreateDegree} from '../../utils/createDegree'

describe("state", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    it('stores all degrees that jobs may require', () => {
        const store = useDegreesStore();
        expect(store.degrees).toEqual([]);
    });


})

describe("actions", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    describe("FETCH_DEGREES", () => {
        it("makes API request and stores received degrees", async() => {
            axiosGetMock.mockResolvedValue({
                data: [{
                    id: 1,
                    degree: "Bachelor's"
                }]
            })

            const store = useDegreesStore();
            await store.FETCH_DEGREES();
            expect(store.degrees).toEqual([{
                id: 1,
                degree: "Bachelor's"
            }])

        })
    })
})
describe("getters", ()=>{
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    describe("UNIQUE_DEGREES", ()=>{
        it("finds unique degrees from collecton of degrees", ()=>{
            const store = useDegreesStore();
            store.degrees = [
                CreateDegree({degree: "Master's"}),
                CreateDegree({degree: "Bachelor's"}),
            ]

            const result = store.UNIQUE_DEGREES;
            expect(result).toEqual(["Master's", "Bachelor's"]);

        })
    })
})