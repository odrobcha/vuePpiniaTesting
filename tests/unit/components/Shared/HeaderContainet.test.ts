import {render, screen} from '@testing-library/vue';
import HeaderContainer from '../../../../src/components/Shared/HeaderContainer.vue';

describe("HeaderContainer", ()=>{
    it("Allows to provide content", ()=>{
        render(HeaderContainer, {
            slots: {
                title: "<h2>Some title</h2>"
            }
        });
        expect(screen.getByText("Some title")).toBeInTheDocument();
    });

    it("Allows to provide subtitle content", ()=>{
        render(HeaderContainer, {
            slots: {
                subtitle: "<h3>Some subtitle</h3>"
            }
        });
        expect(screen.getByText("Some subtitle")).toBeInTheDocument();

    })
});
