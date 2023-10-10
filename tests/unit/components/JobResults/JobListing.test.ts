import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';
import JobListing from '../../../../src/components/JobResults/JobListing.vue';
import type {Job} from "@/api/types";
import {createJob} from "../../../utils/createJob";

describe('JobListing', () => {

    const renderJobListing = (job:Job) => {
        render(JobListing, {
            global: {
                stubs: {
                    'router-link': RouterLinkStub, //to replace <router-link>
                }
            },
            props: {
                job: {
                    ...job
                }
            }
        });
    };
    it('Renders job title', () => {
        const jobProps = createJob({title: "Vue Programmer"});
        renderJobListing(jobProps);
        expect(screen.getByText('Vue Programmer')).toBeInTheDocument();
    });

    it('Renders job organization', () => {
        const jobProps = createJob({organization: "Test organization"});
        renderJobListing(jobProps);
        expect(screen.getByText('Test organization')).toBeInTheDocument();
    });

    it('Renders job locations', ()=>{
        const jobProps = createJob({locations: ['Gent', "Lviv"]});
        renderJobListing(jobProps);
        expect(screen.getByText('Gent')).toBeInTheDocument();
        expect(screen.getByText("Lviv")).toBeInTheDocument();
    });

    it('Renders job qulalifications', ()=>{
        const jobProps = createJob({minimumQualifications: ['Code', "Develop"]});
        renderJobListing(jobProps);
        expect(screen.getByText('Code')).toBeInTheDocument();
        expect(screen.getByText("Develop")).toBeInTheDocument();
    })
});

