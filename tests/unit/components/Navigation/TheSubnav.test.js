// import { render, screen } from '@testing-library/vue';
//
// import TheSubnav from '@/components/Navigation/TheSubnav.vue';
//
// describe('TheSubnav', () => {
//
//     const renderSubNav = (routeName)=>{
//         render(TheSubnav, {
//             global: {
//                 mocks: {  //to replace anything we have under $this keyword!!!!!
//                     $route: routeName
//                 },
//                 stubs: {
//                     FontAwesomeIcon: true,
//                 },
//             },
//             // data () {             //to simulate the data object
//             //     return {
//             //         onJobResultsPage: true,
//             //     };
//             // },
//         });
//     }
//
//     describe('when user is on jobs page', () => {
//         /*const $route = {     //to simulate $route with the needed property
//             name: 'JobResults'
//         };*/
//
//
//         it('displays job count', () => {
//             const routeName = 'JobResults';
//             renderSubNav(routeName);
//             const jobCount = screen.getByText('1653');
//             console.log(jobCount)
//             expect(jobCount).toBeInTheDocument();
//         });
//     });
//
//     describe('when user is not on jobs page', () => {
//         it('does NOT display job count', () => {
//             const routeName = 'Home';
//             renderSubNav(routeName);
//             // const jobCount = screen.queryByText('1653');
//             // expect(jobCount).not.toBeInTheDocument();
//         });
//     });
// });

import { render, screen } from "@testing-library/vue";

import TheSubnav from "@/components/Navigation/TheSubnav.vue";

describe("TheSubnav", () => {
    const renderTheSubnav = (routeName) => {
        render(TheSubnav, {
            global: {
                mocks: {   //to replace anything we have under $this keyword!!!!!
                    $route: {
                        name: routeName,   //to simulate $route with the needed property
                    },
                },
                stubs: {
                    FontAwesomeIcon: true,
                },

                // data () {             //to simulate the data object
             //     return {
             //         onJobResultsPage: true,
             //     };
             // },
            },
        });
    };

    describe("when user is on jobs page", () => {
        it("displays job count", () => {
            const routeName = "JobResults";

            renderTheSubnav(routeName);

            const jobCount = screen.getByText("1653");
            expect(jobCount).toBeInTheDocument();
        });
    });

    describe("when user is not on jobs page", () => {
        it("does NOT display job count", () => {
            const routeName = "Home";

            renderTheSubnav(routeName);

            const jobCount = screen.queryByText("1653");
            expect(jobCount).not.toBeInTheDocument();
        });
    });
});
