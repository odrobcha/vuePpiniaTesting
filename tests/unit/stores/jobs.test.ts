import type {Mock} from 'vitest';
import {createPinia, setActivePinia} from "pinia";

import axios from "axios";
vi.mock("axios");
const axiosGetMock = axios.get as Mock; //to makeTS interpreted axios.get as Mock

import {useUserStore} from '../../../src/stores/user';

import {useJobsStore} from "@/stores/jobs";
import {UNIQUE_ORGANIZATIONS} from '../../../src/stores/jobs';
import {createJob} from "../../utils/createJob";


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
            axiosGetMock.mockResolvedValue({data: ["Job 1", "Job 2"]});
            const store = useJobsStore();
            await store.FETCH_JOBS();
            expect(store.jobs).toEqual(["Job 1", "Job 2"]);
        });
    });
});

describe("Getters", () => {

    beforeEach(() => {
        setActivePinia(createPinia());
    });
    describe("UNIQUE_ORGANIZATIONS", () => {
        it("Get unique organization", () => {
            const store = useJobsStore();
            store.jobs = [
                createJob({organization: "Google"}),
                createJob({organization: "Amazon"}),
                createJob({organization: "Amazon"}),
            ];
            const result = store.UNIQUE_ORGANIZATIONS;
            expect(result).toEqual(new Set(["Google", "Amazon"]));

        });
    });

    describe("UNIQUE_JOBS_BY_TYPE", () => {
        it("fins unique jobType from job list", () => {
            const jobStore = useJobsStore();
            jobStore.jobs = [
                createJob({jobType: "Full time"}),
                createJob({jobType: "Intern"}),
                createJob({jobType: "Intern"}),
                createJob({jobType: "Intern"}),
            ];
            const results = jobStore.UNIQUE_JOB_TYPES;

            expect(results).toEqual(new Set(["Full time", "Intern"]));


        })
    });

    describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
        describe('When user selected no organization', () => {
            it("includes jobs", () => {
                const userStore = useUserStore();
                userStore.selectedOrganizations = [];

                const jobStore = useJobsStore();
                const job = {organization: "Google"} as Job;

                const result = jobStore.INCLUDE_JOB_BY_ORGANIZATION(job);
                expect(result).toBe(true);

            })
        });

        describe("if job is assosiated with selected organizations", () => {
            it("identifies if job isassosiated with given organization", () => {
                const userStore = useUserStore();
                userStore.selectedOrganizations = ["Google", "Microsoft"];

                const jobStore = useJobsStore();
                const job = {organization: "Google"} as Job;

                const result = jobStore.INCLUDE_JOB_BY_ORGANIZATION(job);
                expect(result).toBe(true);
            });
            it("identifies if job is NOT assosiated with given organization", () => {
                const userStore = useUserStore();
                userStore.selectedOrganizations = ["Google", "Microsoft"];

                const jobStore = useJobsStore();
                const job = {organization: "Amazon"} as Job[];

                const result = jobStore.INCLUDE_JOB_BY_ORGANIZATION(job);
                expect(result).toBe(false);
            })
        })
    });

    describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
        describe('When user selected no jobType', () => {
            it("includes jobs", () => {
                const userStore = useUserStore();
                userStore.selectedJobType = [];

                const jobStore = useJobsStore();
                const job = {jobType: "Full-time"} as Job;

                const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job);
                expect(result).toBe(true);

            })
        });

        describe("if job is assosiated with selected job type", () => {
            it("identifies if job isassosiated with given job type", () => {
                const userStore = useUserStore();
                userStore.selectedJobType = ["Full-time", "Part-time"];

                const jobStore = useJobsStore();
                const job = {jobType: "Full-time"} as Job;

                const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job);
                expect(result).toBe(true);
            });
            it("identifies if job is NOT assosiated with given job type", () => {
                const userStore = useUserStore();
                userStore.selectedJobTypes = ["Full-time", "Part-time"];

                const jobStore = useJobsStore();
                const job = {jobType: "Intern"} as Job[];

                const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job);
                expect(result).toBe(false);
            })
        })
    });

    describe("INCLUDE_JOB_BY_DEGREE", () => {
        describe('When user selected no degree', () => {
            it("includes jobs", () => {
                const userStore = useUserStore();
                userStore.selectedDegrees = [];

                const jobStore = useJobsStore();
                const job = createJob();

                const result = jobStore.INCLUDE_JOB_BY_DEGREE(job);
                expect(result).toBe(true);

            })
        });

        describe("if job is assosiated with selected job type", () => {
            it("identifies if job isassosiated with given job type", () => {
                const userStore = useUserStore();
                userStore.selectedDegrees = ["Master's"];
                const store = useJobsStore();
                const job = createJob({ degree: "Master's" });

                const result = store.INCLUDE_JOB_BY_DEGREE(job);

                expect(result).toBe(true);
            });
            it(" identifies if job is NOT assosiated with given job type", () => {
                const userStore = useUserStore();
                userStore.selectedDegrees = ["Master's"];

                const jobStore = useJobsStore();
                const job = createJob({degree: "Master"});

                const result = jobStore.INCLUDE_JOB_BY_DEGREE(job);
                expect(result).toBe(false);
            })
        })
    });

    describe("INCLUDE_JOB_BY_SKILL", ()=>{
        it("identifies if job  matches users term", ()=>{
            const userStore = useUserStore();
            userStore.skillsSearchTerm = "test skill";

            const jobStore = useJobsStore();
            const job = createJob({title: "test skill"});

            const result = jobStore.INCLUDE_JOB_BY_SKILL(job);
            expect(result).toBe(true);

        })

        it("identifies if job DOES NOT  match users term", ()=>{
            const userStore = useUserStore();
            userStore.skillsSearchTerm = "somthing";

            const jobStore = useJobsStore();
            const job = createJob({title: "test skill"});

            const result = jobStore.INCLUDE_JOB_BY_SKILL(job);
            expect(result).toBe(false);
        })

        it("handles inconsistent character casing", ()=>{
            const userStore = useUserStore();
            userStore.skillsSearchTerm = "TeSt";

            const jobStore = useJobsStore();
            const job = createJob({title: "test"});

            const result = jobStore.INCLUDE_JOB_BY_SKILL(job);
            expect(result).toBe(true);

        })

        describe("when user do not enter anything",()=>{
            it.only("should return all jobs", ()=>{
                const userStore = useUserStore();
                userStore.skillsSearchTerm = "";

                const jobStore = useJobsStore();
                const job = createJob({title: "test"});

                const result = jobStore.INCLUDE_JOB_BY_SKILL(job);
                expect(result).toBe(true);
            })
        })



    })

});
