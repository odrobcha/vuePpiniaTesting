import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";



describe("CollapsibleAccordion", () => {
    const renderCollapsibleAccordion = (config = {}) => {
        render(CollapsibleAccordion, {
            global: {
                stubs: {
                    FontAwesomeIcon: true,
                },
            },
            props: {
                header: "My Category",
            },
            slots: {
                default: "<h3>My nested child</h3>",
            },
            ...config,
        });
    };

    it.only("renders child content", async () => {
        const props = {
            header: "My Category",
        };
        const slots = {
            default: "<h3>My nested child</h3>",
        };
        const config = { props, slots };

        renderCollapsibleAccordion(config);
        expect(screen.queryByText("My nested child")).not.toBeInTheDocument();
        const button = screen.getByRole("button", { name: /my category/i });
        await userEvent.click(button);
        expect(screen.getByText("My nested child")).toBeInTheDocument();
    });


   describe("When parrent doesnot privade slot content",  () => {
       it("renders default content", async () => {
           const props = {
               header: "My category"
           };
           const slots = {};

           const config = { props, slots }
           renderCollapsibleAccordion(config);

           const button = screen.getByRole("button", { name: /my category/i });
           await userEvent.click(button);
           expect(screen.getByText("Please, add slot content")).toBeInTheDocument();
       });
   });
});


