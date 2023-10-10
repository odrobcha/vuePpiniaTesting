import {Mock} from "vitest";
import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';
import JobListings from '../../../../src/components/JobResults/JobListings.vue';
import { createTestingPinia } from '@pinia/testing'; //to test testing pinia to register global pinia
import { expect } from 'vitest';
import { useJobsStore } from '../../../../src/stores/jobs';
import { useRoute } from "vue-router";
vi.mock("vue-router");

const useRouteMock = useRoute as Mock;

describe('JobListings', () => {

    const renderJobListings = () => {
        const pinia = createTestingPinia();

        const jobsStore = useJobsStore();
        jobsStore.FILTERED_JOBS = Array(15).fill({});
        render(JobListings, {
            global: {
                plugins: [pinia],
                stubs: {
                    RouterLink: RouterLinkStub,
                },
            },
        });

        return { jobsStore };
    };
    it('Fetches jobs', () => {
        useRouteMock.mockReturnValue({ query: {} });
        const { jobsStore } = renderJobListings();
        //@ts-expect-error
        expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
    });

    it('It desplays max 10 jobs', async () => {
        useRouteMock.mockReturnValue({ query: {page:1} });
        const {jobsStore} = renderJobListings();
        //@ts-expect-error
        jobsStore.FILTERED_JOBS = Array(15).fill({});  //to make store.jobs with 15 elements

        const jobListings = await screen.findAllByRole('listitem'); //getByRole is sync, while findAllByRole is async //thus whole func has to beasync
        expect(jobListings).toHaveLength(10);
    });

    describe('When params exclude page number', () => {
        it('Displays page number 1', () => {
            useRouteMock.mockReturnValue({ query: {page:undefined} });
            renderJobListings();
//@ts-expect-error
            expect(screen.getByText('Page 1')).toBeInTheDocument();
        });
    });

    describe('When params include page number', () => {
        it('Displays page number 3', () => {
            useRouteMock.mockReturnValue({ query: {page:3} });
            renderJobListings();

            expect(screen.getByText('Page 3')).toBeInTheDocument();
        });
    });

    describe('When user is on first page', () => {
        it('Does not show link to previous page', async () => {

            useRouteMock.mockReturnValue({ query: {page:1} });
            const {jobsStore} = renderJobListings();
            //@ts-expect-error
            jobsStore.FILTERED_JOBS = Array(15).fill({});

            await screen.findAllByRole('listitem');

            const prevLink = screen.queryByRole('link', { name: /Previous/i });
            expect(prevLink).not.toBeInTheDocument();

        });

        it('It show link to next page', async () => {

            useRouteMock.mockReturnValue({ query: {page:'1'} });
            const {jobsStore} = renderJobListings();
            //@ts-expect-error
            jobsStore.FILTERED_JOBS = Array(15).fill({});

            await screen.findAllByRole('listitem');

            const nextLink = screen.queryByRole('link', { name: /Next/i });
            expect(nextLink).toBeInTheDocument();

        });
    });

    describe('When the user is on the last page', () => {
        it('Does not show link to next page', async () => {
            useRouteMock.mockReturnValue({ query: {page:'2'} });
            const {jobsStore} = renderJobListings();
            //@ts-expect-error
            jobsStore.FILTERED_JOBS = Array(15).fill({});

            await screen.findAllByRole('listitem');
            const nextLink = screen.queryByRole('link', { name: /Next/i });
            expect(nextLink).not.toBeInTheDocument();
        });

        it('It shows link to next page', async () => {
            useRouteMock.mockReturnValue({ query: {page:'2'} });
            const {jobsStore} = renderJobListings();
            //@ts-expect-error
            jobsStore.FILTERED_JOBS = Array(15).fill({});

            await screen.findAllByRole('listitem');
            const nextLink = screen.queryByRole('link', { name: /Previous/i });
            expect(nextLink).toBeInTheDocument();
        });
    });

});
