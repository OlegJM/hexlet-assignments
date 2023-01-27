/* eslint-disable  no-undef */

const port = 5000;
const host = 'localhost';
const appUrl = `http://${host}:${port}`;

// BEGIN
const appArticlesUrl = `${appUrl}/articles`;
const newArticleUrl = `${appArticlesUrl}/new`;

let page;

beforeEach(async () => {
    page = await browser.newPage();
});

describe('Test App', () => {
    it('1. Open main page', async () => {
        await page.goto(appUrl);
        await expect(page).toMatch('Welcome to a Simple blog!');
    });

    it('2. Мы можем перейти на страницу со всеми статьями и увидеть там их список', async () => {
        await page.goto(appUrl);
        await Promise.all([
            page.click('a[data-testid="nav-articles-index-link"]'),
            page.waitForNavigation(),
        ]);
        await expect(page).toMatch('Create new article');
    });

    it('3. Можем нажать на кнопку создать статью и увидеть форму', async () => {
        await page.goto(appArticlesUrl);
        await Promise.all([
            page.click('a[data-testid="article-create-link"]'),
            page.waitForNavigation(),
        ]);
        await expect(page).toMatch('Create article');
    });

    it('4-5. Может заполнить форму и создать новую статью. ' +
        'После создания статьи нас перенаправляет на страницу со всеми статьями. ' +
        'В списке есть новая статья', async () => {
        await page.goto(newArticleUrl);
        await expect(page).toMatch('Create article');

        await expect(page).toFillForm('form', {
            'article[name]': 'First article',
            'article[content]': 'First article content',
        });
        await expect(page).toSelect('select[name="article[categoryId]"]', '1');


        await Promise.all([
            page.click('input[data-testid="article-create-button"]'),
            page.waitForNavigation(),
        ]);
        await expect(page).toMatch('First article');
    });

    it('6. Мы можем отредактировать статью. После этого данные на странице со всеми статьями меняются', async () => {
        await page.goto(appArticlesUrl);
        await Promise.all([
            page.click('a[data-testid="article-edit-link-5"]'),
            page.waitForNavigation(),
        ]);

        await expect(page).toMatch('Edit article');
        await expect(page).toMatch('Content');

        await expect(page).toFillForm('form', {
            'article[name]': 'Edited article',
            'article[content]': 'Edited article content',
        });
        await expect(page).toSelect('select[name="article[categoryId]"]', '2');

        await Promise.all([
            page.click('input[data-testid="article-update-button"]'),
            page.waitForNavigation(),
        ]);
        await expect(page).toMatch('Edited article');
    });
})

// END
