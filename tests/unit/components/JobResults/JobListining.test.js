import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';
import JobListing from '../../../../src/components/JobResults/JobListing.vue';

describe('JobListing', () => {
    const createJobProps = (jobProps = {}) =>{ // default value is {}
        return {
            title: 'Vue Developer',
            organization: 'AirBnB',
            locations: ["Gent"],
            minimumQualifications: ['Code'],
              ...jobProps  //to overwrite title or organization if needed
        }
    };
    const renderJobListing = (jobProps) => {
        render(JobListing, {
            global: {
                stubs: {
                    'router-link': RouterLinkStub, //to replace <router-link>
                }
            },
            props: {
                job: {
                    ...jobProps
                }
            }
        });
    };
    it('Renders job title', () => {
        const jobProps = createJobProps({title: "Vue Programmer"});
        renderJobListing(jobProps);
        expect(screen.getByText('Vue Programmer')).toBeInTheDocument();
    });

    it('Renders job organization', () => {
        const jobProps = createJobProps({organization: "Test organization"});
        renderJobListing(jobProps);
        expect(screen.getByText('Test organization')).toBeInTheDocument();
    });

    it('Renders job locations', ()=>{
        const jobProps = createJobProps({locations: ['Gent', "Lviv"]});
        renderJobListing(jobProps);
        expect(screen.getByText('Gent')).toBeInTheDocument();
        expect(screen.getByText("Lviv")).toBeInTheDocument();
    });

    it('Renders job qulalifications', ()=>{
        const jobProps = createJobProps({minimumQualifications: ['Code', "Develop"]});
        renderJobListing(jobProps);
        expect(screen.getByText('Code')).toBeInTheDocument();
        expect(screen.getByText("Develop")).toBeInTheDocument();
    })
});

