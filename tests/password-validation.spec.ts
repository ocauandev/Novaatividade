import { test, expect } from '@playwright/test';

test.describe('Validação do Campo de Senha - QA Practice Register', () => {

  test.beforeEach(async ({ page }) => {
    // Acessa a URL real de prática
    await page.goto('https://www.qapractice.com/register');
  });

  test('Deve verificar atributos básicos do campo de senha', async ({ page }) => {
    const passwordInput = page.locator('[data-testid="register-password"]');
    
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute('type', 'password');
    await expect(passwordInput).toHaveAttribute('placeholder', 'Create a password');
  });

  test('Deve validar o comprimento mínimo de 8 caracteres', async ({ page }) => {
    const passwordInput = page.locator('[data-testid="register-password"]');
    const lengthRequirement = page.locator('text=At least 8 characters');

    // Estado inicial: o requisito exibe erro (text-danger)
    await expect(lengthRequirement).toHaveClass(/text-danger/);

    // Digita 7 caracteres (Inválido)
    await passwordInput.fill('Ab1!xyz');
    await expect(lengthRequirement).toHaveClass(/text-danger/);

    // Completa 8 caracteres (Válido)
    await passwordInput.fill('Ab1!wxyz');
    await expect(lengthRequirement).not.toHaveClass(/text-danger/);
  });

  test('Deve validar a exigência de letra maiúscula', async ({ page }) => {
    const passwordInput = page.locator('[data-testid="register-password"]');
    const upperRequirement = page.locator('text=At least one uppercase letter (A-Z)');

    // Senha sem letra maiúscula
    await passwordInput.fill('abcdefg1!');
    await expect(upperRequirement).toHaveClass(/text-danger/);

    // Senha com letra maiúscula
    await passwordInput.fill('Abcdefg1!');
    await expect(upperRequirement).not.toHaveClass(/text-danger/);
  });

  test('Deve impedir sucesso no registro ao utilizar senha fraca', async ({ page }) => {
    await page.locator('[data-testid="register-email"]').fill('qa_tester@email.com');
    await page.locator('[data-testid="register-password"]').fill('fraca');
    await page.locator('[data-testid="register-confirm-password"]').fill('fraca');

    const submitButton = page.locator('[data-testid="register-submit"]');
    await submitButton.click();

    // Como os requisitos de senha não foram atendidos, o fluxo de registro deve barrar o envio
    await expect(page).toHaveURL('https://www.qapractice.com/register');
  });

});
