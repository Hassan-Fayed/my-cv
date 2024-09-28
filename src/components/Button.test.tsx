import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';

vi.mock("react-dom", () => {
    return {
        __esModule: true,
        useFormStatus: vi.fn()
            // add one for every test
            .mockReturnValueOnce({ pending: false })
            .mockReturnValueOnce({ pending: false })
            .mockReturnValueOnce({ pending: false })
            .mockReturnValueOnce({ pending: true }),
    }
});

describe('useFormStatus().pending === false', () => {
    it('Renders an enabled button element.', async () => {
        // Arrange
        const buttonTextContent = 'Test';
        render(<Button className="hidden">{buttonTextContent}</Button>);
        const buttonElement = screen.getByRole('button');
        const spanInsideButton = screen.getByText(buttonTextContent);

        // Assert
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toBeEnabled();
        expect(spanInsideButton).toBeInTheDocument();
    });

    it('Calls onClick() when it gets clicked.', async () => {
        // Arrange
        const handleClickMock = vi.fn();
        render(<Button onClick={handleClickMock}>Test</Button>);
        const buttonElement = screen.getByRole('button');

        // Act 
        await userEvent.click(buttonElement);

        // Assert
        expect(handleClickMock).toBeCalled();
    });

    it('Gets disabled if a disabled prop is passed to it with a value of true.', () => {
        // Arrange
        render(<Button disabled>Test</Button>);
        const buttonElement = screen.getByRole('button');

        // Assert 
        expect(buttonElement).toBeDisabled();
    });
});

describe('useFormStatus().pending === true', () => {
    it('Becomes disabled as long as useFormStatus().pending is true', async () => {
        // Arrange
        const buttonTextContent = 'Test';
        render(<Button>{buttonTextContent}</Button>);
        const buttonElement = screen.getByRole('button');

        // Asser
        expect(buttonElement).toBeDisabled();
    });
});