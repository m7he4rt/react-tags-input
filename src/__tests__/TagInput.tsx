import React from 'react'
import TagsInput from '@/components/TagInput'
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup, waitFor } from '@/utils/test-utils';

import { emails } from '@/mock/emails';

describe('TagsInput Component', () => {
  afterEach(jest.clearAllMocks)
  afterEach(cleanup)

  it('cria o snapshot do component', () => {
    const container = render(<TagsInput />)
    expect(container.asFragment()).toMatchSnapshot()
  })

  it('deve renderizar as tags enviadas por atributos', () => {
    render(<TagsInput tags={emails} />)
  })

  it('deve renderizar tags quando preencher o input e pressionar enter', async () => {
    render(<TagsInput />)
    const input = screen.getByRole('textbox')
    const text = "raro@gmail.com"

    userEvent.type(input, text);
    userEvent.keyboard('[Enter]');

    await waitFor(() => {
      expect(screen.getByRole('button', {name: 'raro@gmail.com'})).toBeInTheDocument();
    });
  })

  it('deve renderizar tags quando preencher o input e pressionar tab', async () => {
    render(<TagsInput />)
    const input = screen.getByRole('textbox')
    const text = "raro@gmail.com"

    userEvent.type(input, text);
    userEvent.tab();

    await waitFor(() => {
      expect(screen.getByRole('button', {name: 'raro@gmail.com'})).toBeInTheDocument();
    });
  })

  it('deve deletar a útima tag criada ao pressionar o botão de backspace', async () => {
    render(<TagsInput />)
    const input = screen.getByRole('textbox')
    const text = "raro@gmail.com;nao-responda@gmail.com"

    userEvent.type(input, text);
    userEvent.keyboard('[Enter]');

    expect(screen.getByRole('button', {name: 'raro@gmail.com'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'nao-responda@gmail.com'})).toBeInTheDocument();
 
    userEvent.keyboard('[Backspace]');
    
    await waitFor(() => {
      expect(screen.queryByText('nao-responda@gmail.com')).not.toBeInTheDocument();
    });
  })
})
