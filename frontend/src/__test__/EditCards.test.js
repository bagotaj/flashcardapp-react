import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import EditCards from '../components/pages/EditCards/EditCards';

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
      loggedInUser: {
        userId: '6106ec1bdd061b303878e43d',
      },
    };
    history.push('/languagecards', state);

    wrapper = mount(
      <Router history={history}>
        <EditCards />
      </Router>
    );

    console.log(wrapper.debug());
  });

  it('should render without error', () => {
    const component = wrapper.find('EditCards');
    expect(component).toHaveLength(1);
  });

  it('should have h2 tag', () => {
    const text = wrapper.find('h2');
    expect(text.text()).toBe('Kártyacsomag szerkesztése');
  });

  it('should have h3 tag', () => {
    const text = wrapper.find('h3');
    expect(text.text()).toBe('Kártya létrehozása');
  });

  it('should have label tags', () => {
    const formLabel = wrapper.find('.form-label');
    expect(formLabel).toHaveLength(5);
    expect(formLabel.at(0).text()).toBe('Kártyacsomag típusa');
    expect(formLabel.at(1).text()).toBe('Kártyacsomag neve');
    expect(formLabel.at(2).text()).toBe('Leírás');
    expect(formLabel.at(3).text()).toBe('Első oldal');
    expect(formLabel.at(4).text()).toBe('Második oldal');
  });

  it('should have 5 InputFields', () => {
    const fields = wrapper.find('InputField');
    expect(fields).toHaveLength(5);
  });

  it('should have 6 buttons', () => {
    const button = wrapper.find('button');
    expect(button).toHaveLength(6);
  });
});
