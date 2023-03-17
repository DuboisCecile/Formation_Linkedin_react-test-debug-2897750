import { render, screen } from '@testing-library/react';
import App from './App';

// On teste si le composant App est bien rendu
test('should render App', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
});

// On teste si l'élément avec le texte 'La Todo Liste' est bien présent et visible
test('should render heading', () => {
    render(<App />);
    const heading = screen.getByText('La Todo Liste');
    expect(heading).toBeVisible();
});

// On teste si l'élément avec le rôle (la valeur sémantique, c'est à dire ce qui est renvoyé par le DOM à l'agent utilisateur) heading est bien présent et visible
test('should render heading list todo', () => {
    render(<App />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeVisible();
});

// import { render } from "@testing-library/react"
// import App from './App'

// test('should render App', () => {
//     const { container } = render(<App />)
//     expect(container).toBeInTheDocument()
// })

// test('should render heading', () => {
//     const { getByText } = render(<App />)
//     const heading = getByText('La Todo Liste');
//     expect(heading).toBeVisible()
// })

// test('should render heading list todo', () => {
//     const { getByRole } = render(<App />)
//     const heading = getByRole('heading');
//     expect(heading).toBeVisible()
// })
