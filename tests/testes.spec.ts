import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("https://www.qapractice.com/register");
});

test.describe("Verificando a pagina de cadastro", () => {

    test("Registro com dados validos", async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email Address' }).fill('emailteste1@gmail.com');
        
        await page.getByLabel('Password', { exact: true }).fill('Senha@123');

    await page.getByLabel('Confirm Password').fill('Senha@123');

        await page.getByRole('button', { name: 'Register' }).click();

        await expect(page.getByText('Registration successful')).toBeVisible();
    });

    test("Email inválido e formulário vazio", async ({ page }) => {
        await page.getByRole('button', { name: 'Register' }).click();


        await expect(page).toHaveURL("https://www.qapractice.com/register");

        await page.getByLabel('Email Address').fill('emailinvalido');
        await page.getByLabel('Password', { exact: true }).fill('Senha@123');
        await page.getByLabel('Confirm Password').fill('Senha@123');

        await page.getByRole('button', { name: 'Register' }).click();

    });

    test('Registro com senhas diferentes nos campos de senha', async ({ page }) => {

        await page.getByLabel('Email Address').fill('aluno1@gmail.com');
        await page.getByLabel('Password', { exact: true }).fill('Senha@123');
        await page.getByLabel('Confirm Password').fill('Senha@1234');

        await page.getByRole('button', { name: 'Register' }).click();


        await expect(page.getByText('Passwords do not match')).toBeVisible();
    });

    test("Voltar para o login", async ({ page }) => {
        await page.getByRole('button', { name: 'Back To Login Page' }).click();

        await expect(page).toHaveURL("https://www.qapractice.com/practice-login-form");
    });

});