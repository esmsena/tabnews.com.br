// tests/unit/interface/components/SearchBox/index.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import SearchBox from 'pages/interface/components/SearchBox';
import { useRouter } from 'next/router';

// Mock do useRouter
vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('SearchBox', () => {
  let push;

  beforeEach(() => {
    push = vi.fn();
    useRouter.mockReturnValue({ push });
    localStorage.clear(); // Limpa o localStorage antes de cada teste
  });

  test('deve salvar o termo de pesquisa no localStorage ao submeter o formulário', () => {
    render(<SearchBox />);
    const input = screen.getByPlaceholderText('Pesquisar...');
    const button = screen.getByRole('button', { name: /pesquisar/i });

    // Simula a entrada do usuário
    fireEvent.change(input, { target: { value: 'consulta de teste' } });
    fireEvent.click(button);

    // Verifica se o termo de pesquisa foi salvo no localStorage
    expect(localStorage.getItem('ultimoTermoDePesquisa')).toBe('consulta de teste');
  });

  test('deve carregar o termo de pesquisa do localStorage ao montar o componente', () => {
    // Salva um termo de pesquisa no localStorage antes de renderizar o componente
    localStorage.setItem('ultimoTermoDePesquisa', 'consulta anterior');
    
    render(<SearchBox />);
    const input = screen.getByPlaceholderText('Pesquisar...');

    // Verifica se o input foi preenchido com o termo de pesquisa do localStorage
    expect(input.value).toBe('consulta anterior');
  });
});