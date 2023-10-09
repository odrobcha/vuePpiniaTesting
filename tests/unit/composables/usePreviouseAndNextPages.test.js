import usePreviousAndNextPage from '../../../src/composables/usePreviouseAndNextPages';

describe("useOreviousAndNexpPage", ()=>{
    const createPreviousAndNextPage = (curP = {}, maxP = {}) =>{
        const currentPage = {
            value : 8,
            ...curP
        };
        const maxPage = {
            value : 10,
            ...maxP
        };
        const {previousPage, nextPage} = usePreviousAndNextPage(currentPage, maxPage);
        return {previousPage, nextPage}
    };
    it('calculate page before current one',()=>{
        const {previousPage} = createPreviousAndNextPage({value :8}, {value : 10});
        expect(previousPage.value).toBe(7);
    });

    describe('when current page is the first page', ()=>{
        it("does not provide the previous page", ()=>{
            const {previousPage} = createPreviousAndNextPage({value :1}, {value : 1});
            expect(previousPage.value).toEqual(undefined);
        })
    });
        it("calculate page after current one", ()=>{
            const {nextPage} = createPreviousAndNextPage({value :3}, {value : 10});
            expect(nextPage.value).toBe(4);
        });

    describe('when current page is the last page', ()=>{
        it("does not provide the next page", ()=>{
            const {nextPage} = createPreviousAndNextPage({value :10}, {value : 10});
            expect(nextPage.value).toEqual(undefined);
        })
    });

});
