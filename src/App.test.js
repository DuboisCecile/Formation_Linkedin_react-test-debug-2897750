import { fireEvent, render, screen } from '@testing-library/react';
import App, { TodoList, TrashButton } from './App';

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

// On teste que la liste a bien les 2 éléments passés en props via le test
test('should render an empty todo list', () => {
    const items = [
        { id: 122, value: 'todo #1', done: false },
        { id: 123, value: 'todo #2', done: false },
    ];
    const { rerender } = render(<TodoList items={items} />);
    // const { getByRole, rerender } = render(<TodoList items={items} />); // si on récupère getByRole ici pour l'utiliser sans screen. devant, cela affiche un message "Avoid desctructuring queries from 'render' result, use 'screen.getByRole' instead"
    const list = screen.getByRole('list');
    // On teste que la liste a bien les 2 éléments passés en props via le test
    expect(list.childNodes).toHaveLength(2);
    // On fait un rerender et on reteste, avec un tableau vide, ce qui fait échouer le test si on garde bien la valeur de 2
    rerender(<TodoList items={[]} />);
    // expect(list.childNodes).toHaveLength(2);
    // On teste que la liste a bien 0 élément, et ça passe
    expect(list.childNodes).toHaveLength(0);
});

test('should render trash button if any todo is done', () => {
    render(<TrashButton isVisible />);
    const button = screen.getByRole('button');
    expect(button).toBeVisible();
});
