import {expect} from "vitest";
import {getByRole, render, screen} from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import {createTestingPinia} from "@pinia/testing";
import {useUserStore} from "@/stores/user";
import JobFiltersSidebarSkills from "@/components/JobResults/JobFiltersBar/JobFiltersSidebarSkills.vue"

describe("JobFilterSidebarSkills", () => {
    const renderJobsFilterSidebarSkills = () => {
        const pinia = createTestingPinia();
        const userStore = useUserStore();

        render(JobFiltersSidebarSkills, {
            global: {
                plugins: [pinia]
            }
        })

        return {userStore}
    }

    it("populate search input from store", async () => {
        const {userStore} = renderJobsFilterSidebarSkills();
        userStore.skillsSearchTerm = 'Search term';

        const input = await screen.findByRole<HTMLInputElement>('textbox');

        expect(input.value).toBe('Search term')
    })

    it("write user input tot store", async () => {
        const {userStore} = renderJobsFilterSidebarSkills();
        userStore.skillsSearchTerm = '';
        const input = screen.getByRole<HTMLInputElement>('textbox');

        await userEvent.type(input, "V");
        await userEvent.click(document.body) // to emulate clicking outside the input //to click somewhere

        expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith("V");
    })

    it ("removes white space from user input", async()=>{
        const {userStore} = renderJobsFilterSidebarSkills();
        userStore.skillsSearchTerm = '';
        const input = screen.getByRole<HTMLInputElement>('textbox');

        await userEvent.type(input, "   V    ");
        await userEvent.click(document.body) // to emulate clicking outside the input //to click somewhere

        expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith("V");
    })

})