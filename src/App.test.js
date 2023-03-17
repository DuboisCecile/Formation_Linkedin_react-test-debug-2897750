import { fireEvent, render, screen } from '@testing-library/react';
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

// On vérifie que le texte saisi dans l'input est bien celui qui est renvoyé par l'input
test('should fire change event', () => {
    render(<App />);
    const inputNode = screen.getByRole('textbox');
    fireEvent.change(inputNode, { target: { value: 'new value' } });
    expect(inputNode.value).toBe('new value');
});

// On vérifie que le texte saisi dans l'input est bien celui qui est renvoyé par l'input, et que la soumission du formulaire est bien prise en compte
test('should fire submit event', () => {
    render(<App />);
    const inputNode = screen.getByRole('textbox');
    const formNode = screen.getByTestId('form'); // on récupère l'élément qui a le data-testid 'form'
    // fireEvent.change(inputNode, { target: { value: 'new value' } });
    fireEvent.submit(formNode);
    expect(inputNode.value).toBe('');
});
