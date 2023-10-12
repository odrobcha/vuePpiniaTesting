import {expect, Mock} from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import {useUserStore} from "@/stores/user";

import JobFilterSidebarCheckboxGroup    from '../../../../../src/components/JobResults/JobFiltersBar/JobFilterSidebarCheckboxGroup.vue';


import {useRouter} from "vue-router";
const useRouterMock = useRouter as Mock;
vi.mock("vue-router");

describe("JobFilterSidebarCheckboxGroup", () => {
    interface JobFiltersSideBarCheckBoxGroups {
        uniqueValues: Set<string>
        action: Mock
    }
    const createProps = (props:Partial<JobFiltersSideBarCheckBoxGroups>  = {}): JobFiltersSideBarCheckBoxGroups=>{
        return {
            uniqueValues : new Set(['valueA', 'valueB']),
            action: vi.fn(),
              ...props
        }
    };

    const renderJobFiltersSidebarCheckboxGroup = (props: JobFiltersSideBarCheckBoxGroups) => {
        const pinia = createTestingPinia({stubActions:false}); //all action in pinia are no longer stubs.
        const userStore = useUserStore();

        render(JobFilterSidebarCheckboxGroup, {
            props: {
                ...props
            },
            global: {
                plugins: [pinia],
                // stubs: {
                //     FontAwesomeIcon: true,
                // },
            },
        });

        return {userStore}

    };

    it("renders unique list of values", () => {
        const props = createProps({
            uniqueValues: new Set(["Full-time", "Part-time"])
        });
        renderJobFiltersSidebarCheckboxGroup(props);

        const jobTypesListItems = screen.getAllByRole("listitem");
        const jobTypes = jobTypesListItems.map((node) => node.textContent);
        expect(jobTypes).toEqual(["Full-time", "Part-time"]);
    });

    describe("When user click checkbox" , () =>{
        it("communicates that user has selected checkbox for job type", async () => {
            const action = vi.fn();
            useRouterMock.mockReturnValue({push: vi.fn()});

            const props = createProps({
                uniqueValues: new Set(["Full-time", "Part-time"]),
                action
            });
             renderJobFiltersSidebarCheckboxGroup(props);

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
                uniqueValues: new Set(["Full-time", "Part-time"]),
            });
             renderJobFiltersSidebarCheckboxGroup(props);


            const fulTimeCheckbox = screen.getByRole("checkbox", {
                name: /full-time/i,
            });
            await userEvent.click(fulTimeCheckbox);
            expect(push).toHaveBeenCalledWith({name: "JobResults"});
        })
    })

    describe("when clears job filters", ()=>{
        it("uncheck all checked checkboxes", async ()=>{

            useRouterMock.mockReturnValue({push: vi.fn()});
            const props = createProps({
                uniqueValues: new Set(["Full-time", "Part-time"]),
            });
            const {userStore} = renderJobFiltersSidebarCheckboxGroup(props);

            const fulTimeCheckboxBeforeAction = screen.getByRole<HTMLInputElement>("checkbox", {
                name: /full-time/i,
            });

            await userEvent.click(fulTimeCheckboxBeforeAction);
            expect(fulTimeCheckboxBeforeAction.checked).toBe(true);

            userStore.CLEAR_USER_JOB_FILTER_SELECTIONS();

            const fulTimeCheckboxAfterAction = await screen.findByRole<HTMLInputElement>("checkbox", {
                name: /full-time/i,
            });
            expect(fulTimeCheckboxAfterAction.checked).toBe(false);


        })
    })
});
