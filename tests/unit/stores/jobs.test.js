import { createPinia, setActivePinia } from "pinia";
import { useJobsStore } from "@/stores/jobs";
import axios from "axios";
import { UNIQUE_ORGANIZATIONS } from '../../../src/stores/jobs';
vi.mock("axios");
import {useUserStore} from '../../../src/stores/user';
import { expect } from 'vitest';

describe("state", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("stores job listings", () => {
        const store = useJobsStore();
        expect(store.jobs).toEqual([]);
    });
});

describe("actions", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    describe("FETCH_JOBS", () => {
        it("makes API request and stores received jobs", async () => {
            axios.get.mockResolvedValue({ data: ["Job 1", "Job 2"] });
            const store = useJobsStore();
            await store.FETCH_JOBS();
            expect(store.jobs).toEqual(["Job 1", "Job 2"]);
        });
    });
});

describe("Getters", ()=>{
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    describe("UNIQUE_ORGANIZATIONS", ()=>{
        it("Get unique organization", ()=>{
            const store = useJobsStore();
            store.jobs = [
              {organization: "Google"},
              {organization: "Amazon"},
              ];
            const result = store.UNIQUE_ORGANIZATIONS;
            expect(result).toEqual(new Set(["Google", "Amazon"]));

        });
    });

    describe("UNIQUE_JOBS_BY_TYPE", ()=>{
        it("fins unique jobType from job list", ()=>{
            const jobStore = useJobsStore();
            jobStore.jobs = [
                {jobType: "Full time"},
                {jobType: "Intern"},
                {jobType: "Intern"},
                {jobType: "Intern"},
            ];
            const results = jobStore.UNIQUE_JOB_TYPES;

            expect(results).toEqual(new Set(["Full time", "Intern"]));


        })
    });

    describe("INCLUDE_JOB_BY_ORGANIZATION", ()=>{
        describe('When user selected no organization', ()=>{
            it("includes jobs", ()=>{
                const userStore = useUserStore();
                userStore.selectedOrganizations = [];

                const jobStore = useJobsStore();
                const job =  {organization: "Google"};

                const result = jobStore.INCLUDE_JOB_BY_ORGANIZATION(job);
                expect(result).toBe(true);

            })
        });

        describe("if job is assosiated with selected organizations", ()=>{
            it("identifies if job isassosiated with given organization", ()=>{
                const userStore = useUserStore();
                userStore.selectedOrganizations = ["Google", "Microsoft"];

                const jobStore = useJobsStore();
                const job =  {organization: "Google"};

                const result = jobStore.INCLUDE_JOB_BY_ORGANIZATION(job);
                expect(result).toBe(true);
            });
            it("identifies if job is NOT assosiated with given organization", ()=>{
                const userStore = useUserStore();
                userStore.selectedOrganizations = ["Google", "Microsoft"];

                const jobStore = useJobsStore();
                const job =  {organization: "Amazon"};

                const result = jobStore.INCLUDE_JOB_BY_ORGANIZATION(job);
                expect(result).toBe(false);
            })
        })
    });

    describe("INCLUDE_JOB_BY_JOB_TYPE", ()=>{
        describe('When user selected no jobType', ()=>{
            it("includes jobs", ()=>{
                const userStore = useUserStore();
                userStore.selectedJobType = [];

                const jobStore = useJobsStore();
                const job =  {jobType: "Full-time"};

                const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job);
                expect(result).toBe(true);

            })
        });

        describe("if job is assosiated with selected job type", ()=>{
            it("identifies if job isassosiated with given job type", ()=>{
                const userStore = useUserStore();
                userStore.selectedJobType = ["Full-time", "Part-time"];

                const jobStore = useJobsStore();
                const job =  {jobType: "Full-time"};

                const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job);
                expect(result).toBe(true);
            });
            it("identifies if job is NOT assosiated with given job type", ()=>{
                const userStore = useUserStore();
                userStore.selectedJobTypes = ["Full-time", "Part-time"];

                const jobStore = useJobsStore();
                const job =  {jobType: "Intern"};

                const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job);
                expect(result).toBe(false);
            })
        })
    });



});
