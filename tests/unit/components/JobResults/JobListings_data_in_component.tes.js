import {render, screen} from "@testing-library/vue";
import {RouterLinkStub} from "@vue/test-utils";
import JobListings from '../../../../src/components/JobResults/JobListings.vue';

import axios from 'axios';
import { expect } from 'vitest';
vi.mock('axios'); //to mock axios library

describe("JobListings", ()=>{
    const createRoute = (queryParams = {}) =>({  //givedefoault valueofempty obj
            query : {
                page:5,
                ...queryParams
            }
    });
    const renderJobListings = ($route) =>{
        render(JobListings, {
            global:{
                stubs:{
                    'router-link': RouterLinkStub,
                },
                mocks:{
                    $route
                }
            }
        });
    };
    it("Fetches jobs", ()=>{
        axios.get.mockResolvedValue({data: []}); //to simulate async funtion with the resolved data

        const $route = createRoute();
        renderJobListings($route);

        expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/jobs");
    });

    it("It desplays max 10 jobs", async()=>{
        axios.get.mockResolvedValue({data: Array(15).fill({})}); //to simulate async funtion with the resolved data of Array with 15 elements

        const queryParam = {page: "1"};
        const $route = createRoute(queryParam);
        renderJobListings($route);

        const jobListings = await screen.findAllByRole('listitem'); //getByRole is sync, while findAllByRole is async //thus whole func has to beasync
        expect(jobListings).toHaveLength(10)
    });

    describe("When params exclude page number" , ()=>{
        it("Displays page number 1", ()=>{
            const queryParams = { page : undefined};
            const $route = createRoute(queryParams);
            renderJobListings($route);

            expect(screen.getByText("Page 1")).toBeInTheDocument();

        })
    });

    describe("When params include page number" , ()=>{
        it("Displays page number 3", ()=>{
            const queryParams = { page : 3};
            const $route = createRoute(queryParams);
            renderJobListings($route);

            expect(screen.getByText("Page 3")).toBeInTheDocument();
        });
    });

    describe("When user is on first page",  ()=>{
        it('Does not show link to previous page', async()=>{
            axios.get.mockResolvedValue({data: Array(15).fill({})});
            const queryParams = {page: 1};
            const $route = createRoute(queryParams);
            renderJobListings($route);

            await screen.findAllByRole('listitem');

            const prevLink =screen.queryByRole("link", {name: /Previous/i});
            expect(prevLink).not.toBeInTheDocument();

        });

        it('It show link to next page', async()=>{
            axios.get.mockResolvedValue({data: Array(15).fill({})});
            const queryParams = {page: "1"};
            const $route = createRoute(queryParams);
            renderJobListings($route);

            await screen.findAllByRole('listitem');

            const nextLink =screen.queryByRole("link", {name: /Next/i});
            expect(nextLink).toBeInTheDocument();

        });
    });

    describe("When the user is on the last page", ()=>{
        it('Does not show link to next page', async()=>{
            axios.get.mockResolvedValue({data: Array(15).fill({})});
            const queryParams = {page: "2"};
            const $route = createRoute(queryParams);
            renderJobListings($route);

            await screen.findAllByRole('listitem');
            const nextLink =screen.queryByRole("link", {name: /Next/i});
            expect(nextLink).not.toBeInTheDocument();
        });

        it('It shows link to next page', async()=>{
            axios.get.mockResolvedValue({data: Array(15).fill({})});
            const queryParams = {page: "2"};
            const $route = createRoute(queryParams);
            renderJobListings($route);

            await screen.findAllByRole('listitem');
            const nextLink =screen.queryByRole("link", {name: /Previous/i});
            expect(nextLink).toBeInTheDocument();
        });
    })


});
