# Testing i React (Todo-app)

Vi använder **React Testing Library + user-event** för att skriva enkla tester som efterliknar hur en användare använder appen.

---

## Unit Testing

Testar en liten del i isolation.

Exempel:
- En funktion
- En enkel komponent

```ts
const add = (a, b) => a + b;
expect(add(1, 2)).toBe(3);
```

I React:
- Renderar komponenten rätt innehåll?
- Visas rätt text baserat på props?

---

## Integration Testing

Testar att flera komponenter fungerar tillsammans.

I vår todo-app:
- Input + knapp → lägger till en todo
- Lista + list-item → uppdateras när man interagerar

Exempel:

```tsx
render(<App />);

await user.type(screen.getByRole("textbox"), "Learn testing");
await user.click(screen.getByRole("button", { name: /add/i }));

expect(screen.getByText("Learn testing")).toBeInTheDocument();
```

---

## E2E (End-to-End)

Testar hela flöden i en riktig browser.

Exempel:
- Skapa todo → visas i listan

⚠️ Vi gör inte E2E i denna lektion.

---

## Fokus idag

- Skriva enkla tester med React Testing Library
- Använda `user-event` för att simulera användaren
- Testa beteende istället för implementation
