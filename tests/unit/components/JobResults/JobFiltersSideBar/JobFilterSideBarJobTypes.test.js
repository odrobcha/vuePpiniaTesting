import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFilterSidebarJobTypes    from '../../../../../src/components/JobResults/JobFiltersBar/JobFilterSidebarJobTypes.vue';
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

describe("JobFilterSidebarJobTypes", () => {
    const renderJobFiltersSidebarJobTypes = () => {
        const pinia = createTestingPinia();
        const userStore = useUserStore();
        const jobsStore = useJobsStore();
        const $router = {push: vi.fn()}

        render(JobFilterSidebarJobTypes, {
            global: {
                mocks:{
                    $router
                },
                plugins: [pinia],
                stubs: {
                    FontAwesomeIcon: true,
                },
            },
        });

        return { jobsStore, userStore, $router };
    };

    it("renders unique list of jobTypes from jobs", async () => {
        const { jobsStore } = renderJobFiltersSidebarJobTypes();
        jobsStore.UNIQUE_JOB_TYPES = new Set(["Full-time", "Part-time"]);

        const button = screen.getByRole("button", { name: /job types/i });
        await userEvent.click(button);

        const jobTypesListItems = screen.getAllByRole("listitem");
        const jobTypes = jobTypesListItems.map((node) => node.textContent);
        expect(jobTypes).toEqual(["Full-time", "Part-time"]);
    });

    describe("When user click checkbox" , () =>{
        it("communicates that user has selected checkbox for job type", async () => {
            const { jobsStore, userStore } = renderJobFiltersSidebarJobTypes();
            jobsStore.UNIQUE_JOB_TYPES = new Set(["Full-time", "Part-time"]);

            const button = screen.getByRole("button", { name: /job type/i });
            await userEvent.click(button);

            const fulTimeCheckbox = screen.getByRole("checkbox", {
                name: /full-time/i,
            });
            await userEvent.click(fulTimeCheckbox);

            expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith([
                "Full-time",
            ]);
        });

        it('navigates user to /jobs/results on clicking on checkbox', async ()=>{
            const { jobsStore, $router} = renderJobFiltersSidebarJobTypes();
            jobsStore.UNIQUE_JOB_TYPES = new Set(["Full-time", "Part-time"]);

            const button = screen.getByRole("button", { name: /job type/i });
            await userEvent.click(button);

            const fulTimeCheckbox = screen.getByRole("checkbox", {
                name: /full-time/i,
            });
            await userEvent.click(fulTimeCheckbox);
            expect($router.push).toHaveBeenCalledWith({name: "JobResults"});

        })
    })



});
