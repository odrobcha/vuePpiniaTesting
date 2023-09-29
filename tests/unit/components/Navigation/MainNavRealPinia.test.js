import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { RouterLinkStub } from '@vue/test-utils';
import MainNav from '@/components/Navigation/MainNav.vue';
import { createTestingPinia } from '@pinia/testing'; //to create testing pinia, Allactionby default going to be mocked

describe('MainNav', () => {
    const renderMainNav = () => {
        const pinia = createTestingPinia({
          stubActions: false //if true - replace by mock function,if false- take the real pinia function
        });
        const $route = {     //to simulate $route with the needed property
            name: 'Home'
        };
        render(MainNav, {
            global: {
                stubs: {
                    FontAwesomeIcon: true,      //
                    RouterLink: RouterLinkStub  // Used to replace RouterLink(component) by RouterLinkStub (it is suports default stub)
                },
                mocks: {  //to replace anything we have under $this keyword!!!!!
                    $route: $route
                },
                plugins:[pinia]
            },
        });
    };

    it('displays company name', () => {
        renderMainNav();
        const companyName = screen.getByText('Company');
        expect(companyName).toBeInTheDocument();
    });

    it('displays menu items for navigation', () => {
        renderMainNav();
        const navigationMenuItems = screen.getAllByRole('listitem');
        const navigationMenuTexts = navigationMenuItems.map(
          (item) => item.textContent
        );
        expect(navigationMenuTexts).toEqual([
            'Teams',
            'Locations',
            'Life at Bobo Corp',
            'How we hire',
            'Students',
            'Jobs',
        ]);
    });

    describe('when the user logs in', () => {
        it('displays user profile picture', async () => {
            renderMainNav();

            let profileImage = screen.queryByRole('img', {
                name: /user profile image/i,
            });
            expect(profileImage).not.toBeInTheDocument();

            const loginButton = screen.getByRole('button', {
                name: /sign in/i,
            });
            await userEvent.click(loginButton);

            profileImage = screen.getByRole('img', {
                name: /user profile image/i,
            });
            expect(profileImage).toBeInTheDocument();
        });
    });
});
