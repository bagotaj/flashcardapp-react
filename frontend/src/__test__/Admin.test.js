import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import Admin from '../components/pages/Admin/Admin';

describe('Admin - layout', () => {
  let wrapper;

  beforeAll(() => {
    const history = createMemoryHistory();
    history.push('/admin');

    wrapper = mount(
      <Router history={history}>
        <Admin />
      </Router>
    );
  });

  it('should render without error', () => {
    const component = wrapper.find('Admin');
    expect(component).toHaveLength(1);
  });

  it('should have Links', () => {
    const link = wrapper.find('Link');
    expect(link).toHaveLength(4);
  });

  it('should have 4 link elements / "a" tag ', () => {
    const aTags = wrapper.find('a');
    expect(aTags).toHaveLength(4);
  });

  it('should have link with "Felhasználók listája" title', () => {
    const text = wrapper.find('a').at(0);
    expect(text.text()).toBe('Felhasználók listája');
  });

  it('should have link with "Felhasználók ranglistája" title', () => {
    const text = wrapper.find('a').at(1);
    expect(text.text()).toBe('Felhasználók ranglistája');
  });

  it('should have link with "Szókártya lista" title', () => {
    const text = wrapper.find('a').at(2);
    expect(text.text()).toBe('Szókártya lista');
  });

  it('should have link with "Egyéb kártyák listája', () => {
    const text = wrapper.find('a').at(3);
    expect(text.text()).toBe('Egyéb kártyák listája');
  });
});
