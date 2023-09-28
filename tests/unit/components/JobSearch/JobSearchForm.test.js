import {render, screen} from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import {vi} from 'vitest'


import JobSearchForm from '../../../../src/components/JobSearch/JobSearchForm.vue';

describe('JobSearchForm ',()=>{
    describe("When user describe form", ()=>{
        it("It directs user to results page with enterd data as query", async ()=>{
            const push = vi.fn();  // global function via vitest. It is vitest mock function,which can track how many time it was invoked and with what arguments
            const $router = {push}; //the $router const , has method push()

            render(JobSearchForm,
              {
                  global : {
                      stubs : {
                          FontAwesomeIcon: true
                      },
                      mocks:{
                          $router: $router //this.$router is equal to const $router
                      }
                  }
              });

            const roleInput = screen.getByRole("textbox", {
                name: /role/i  //to find the textbox with label role <label>Role</label>
            });
           await userEvent.type(roleInput, "Vue Developer") // to simulate input. it is a promise, 1 argument - is the element, 2 - the input value;

            const roleLocation = screen.getByRole("textbox", {
                name: /where?/i  //to find the textbox with label role  <label>Where?</label>
            });
            await userEvent.type(roleLocation, "Gent") ;

            const submitButton = screen.getByRole('button', {
                name: /search/i    //to find button with text Search
            });

            await userEvent.click(submitButton);

            expect(push).toHaveBeenCalledWith(
              {
                  name: "JobResults",
                  query: {
                      role: "Vue Developer",
                      location : "Gent"
                  }
              }
            )
        })

    })

})


