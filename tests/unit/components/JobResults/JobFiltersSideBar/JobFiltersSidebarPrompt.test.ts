
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import JobFiltersSidebarPrompt from "@/components/JobResults/JobFiltersBar/JobFiltersSidebarPrompt.vue";
import {useUserStore} from "@/stores/user";


describe("JobFiltersSidebarPrompt ", ()=>{
    describe('when user clicks "clearfilters, ', ()=>{
        it.only('CLEAR_USER_JOB_FILTER_SELECTIONS has to be called', async()=>{
            const pinia = createTestingPinia();
            const userStore = useUserStore();
            render(JobFiltersSidebarPrompt, {
                global: {
                    plugins: [pinia]
                }
            });
            const button = screen.getByRole("button", {
                name: /clear filter/i,
            });

            await userEvent.click(button);
            expect(userStore.CLEAR_USER_JOB_FILTER_SELECTIONS).toBeCalled();

        })

    })
})
