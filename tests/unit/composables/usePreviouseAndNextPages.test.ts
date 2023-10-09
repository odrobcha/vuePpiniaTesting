import usePreviousAndNextPage from '../../../src/composables/usePreviouseAndNextPages';
import {ref} from 'vue';

describe("useOreviousAndNexpPage", ()=>{
    const createPreviousAndNextPage = (curP = null, maxP = null) =>{
        const current = curP || 8;
        const currentPage = ref(current);
        const max = maxP || 10
        const maxPage = ref(max);
        const {previousPage, nextPage} = usePreviousAndNextPage(currentPage, maxPage);
        return {previousPage, nextPage}
    };
    it('calculate page before current one',()=>{
        const {previousPage} = createPreviousAndNextPage(8, 10);
        expect(previousPage.value).toBe(7);
    });

    describe('when current page is the first page', ()=>{
        it("does not provide the previous page", ()=>{
            const {previousPage} = createPreviousAndNextPage(1,  1);
            expect(previousPage.value).toEqual(undefined);
        })
    });
        it("calculate page after current one", ()=>{
            const {nextPage} = createPreviousAndNextPage(3,  10);
            expect(nextPage.value).toBe(4);
        });

    describe('when current page is the last page', ()=>{
        it("does not provide the next page", ()=>{
            const {nextPage} = createPreviousAndNextPage(10, 10);
            expect(nextPage.value).toEqual(undefined);
        })
    });

});
