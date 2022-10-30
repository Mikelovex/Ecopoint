import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Home from '.'
import Header from '../../components/Header'


describe('Home Component', () => {
    test('deve conter o component de header', () => {
        render(<Home />);
        expect(screen.getByText(/Cadastre um ponto de coleta/i)).toBeInTheDocument()
    })

    test('deve conter um botão para pesquisar pontos de coleta', () => {
        render(<Home />);

        const searchButton = screen.getByRole('button', { name: /Pesquisar pontos de coleta/i })

        expect(searchButton).toBeInTheDocument()
    })

    test('deve abrir um modal ao clickar no botão de pesquisa', async () => {
        const { baseElement } = render(<Home />);

        const searchButton = screen.getByRole('button', { name: /Pesquisar pontos de coleta/i })

        userEvent.click(searchButton)

        expect(baseElement).toMatchSnapshot()

        await waitFor(() => expect(screen.queryByText('Modal Title')))
    })

    test('deve conter uma botão de pesquisa no modal', async () => {
        const { baseElement } = render(<Home />);

        const searchButton = screen.getByRole('button', { name: /Pesquisar pontos de coleta/i })

        userEvent.click(searchButton)

        expect(baseElement).toMatchSnapshot()

        await waitFor(() => expect(screen.queryByText('Buscar ponto de coleta')))
    })
})