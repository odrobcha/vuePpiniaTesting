import {Mock} from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFilterSidebarCheckboxGroup    from '../../../../../src/components/JobResults/JobFiltersBar/JobFilterSidebarCheckboxGroup.vue';


import {useRouter} from "vue-router";
const useRouterMock = useRouter as Mock;
vi.mock("vue-router");

describe("JobFilterSidebarCheckboxGroup", () => {
    interface JobFiltersSideBarCheckBoxGroups {
        header: string,
        uniqueValues: Set<string>
        action: Mock
    }
    const createProps = (props:Partial<JobFiltersSideBarCheckBoxGroups>  = {}): JobFiltersSideBarCheckBoxGroups=>{
        return {
            header : "Some header",
            uniqueValues : new Set(['valueA', 'valueB']),
            action: vi.fn(),
              ...props
        }
    };

    const renderJobFiltersSidebarCheckboxGroup = (props: JobFiltersSideBarCheckBoxGroups) => {
        const pinia = createTestingPinia();

        render(JobFilterSidebarCheckboxGroup, {
            props: {
                ...props
            },
            global: {
                plugins: [pinia],
                stubs: {
                    FontAwesomeIcon: true,
                },
            },
        });

    };

    it("renders unique list of values", async () => {
        const props = createProps({
            header: "Job types",
            uniqueValues: new Set(["Full-time", "Part-time"])
        });
        renderJobFiltersSidebarCheckboxGroup(props);

        const button = screen.getByRole("button", { name: /job types/i });
        await userEvent.click(button);

        const jobTypesListItems = screen.getAllByRole("listitem");
        const jobTypes = jobTypesListItems.map((node) => node.textContent);
        expect(jobTypes).toEqual(["Full-time", "Part-time"]);
    });

    describe("When user click checkbox" , () =>{
        it("communicates that user has selected checkbox for job type", async () => {
            useRouterMock.mockReturnValue({push: vi.fn()});
            const action = vi.fn();
            const props = createProps({
                header: "Job types",
                uniqueValues: new Set(["Full-time", "Part-time"]),
                action
            });
             renderJobFiltersSidebarCheckboxGroup(props);

            const button = screen.getByRole("button", { name: /job types/i });
            await userEvent.click(button);

            const fulTimeCheckbox = screen.getByRole("checkbox", {
                name: /full-time/i,
            });
            await userEvent.click(fulTimeCheckbox);

            expect(action).toHaveBeenCalledWith([
                "Full-time",
            ]);
        });

        it('navigates user to /jobs/results on clicking on checkbox', async ()=>{
            const push = vi.fn();
            useRouterMock.mockReturnValue({push});
            const props = createProps({
                header: "Job types",
                uniqueValues: new Set(["Full-time", "Part-time"]),
            });
             renderJobFiltersSidebarCheckboxGroup(props);


            const button = screen.getByRole("button", { name: /job types/i });
            await userEvent.click(button);

            const fulTimeCheckbox = screen.getByRole("checkbox", {
                name: /full-time/i,
            });
            await userEvent.click(fulTimeCheckbox);
            expect(push).toHaveBeenCalledWith({name: "JobResults"});
        })
    })
});
