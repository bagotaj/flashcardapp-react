import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import Cards from '../components/pages/Cards/Cards';

describe('Cards - layout', () => {
  let wrapper;

  beforeAll(() => {
    const history = createMemoryHistory();
    const state = {
      card: {
        cardType: 'Nyelv kártya',
        cardTitle: 'Magyar - Angol',
        description: 'Általános szavak, kifejezések',
        cards: [
          { side1: 'provide', side2: 'biztosít, ellát' },
          { side1: 'append', side2: 'mellékel, hozzáfűz' },
        ],
        userId: '6106ec1bdd061b303878e43d',
      },
    };
    history.push('/languagecards', state);

    wrapper = mount(
      <Router history={history}>
        <Cards />
      </Router>
    );
  });

  it('should render without error', () => {
    const component = wrapper.find('Cards');
    expect(component).toHaveLength(1);
  });

  it('should have Title', () => {
    const text = wrapper.find('h2');
    expect(text.text()).toBe('Magyar - Angol');
  });

  it('should have a link element / "a" tag ', () => {
    const aTag = wrapper.find('a');
    expect(aTag).toHaveLength(1);
  });

  it('should have two buttons', () => {
    const button = wrapper.find('button');
    expect(button).toHaveLength(2);
  });

  it('should have a flip card', () => {
    const flipcard = wrapper.find('.flip-card');
    expect(flipcard).toHaveLength(1);
  });
});
