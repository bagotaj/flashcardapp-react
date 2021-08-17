import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import Dashboard from '../components/pages/Dashboard/Dashboard';

describe('Dashboard - layout', () => {
  let wrapper;

  beforeAll(() => {
    const history = createMemoryHistory();
    history.push('/dashboard');

    wrapper = mount(
      <Router history={history}>
        <Dashboard />
      </Router>
    );
  });

  it('should render without error', () => {
    const component = wrapper.find('Dashboard');
    expect(component).toHaveLength(1);
  });

  it('should have Links', () => {
    const link = wrapper.find('Link');
    expect(link).toHaveLength(2);
  });

  it('should have 2 link elements / "a" tags ', () => {
    const aTags = wrapper.find('a');
    expect(aTags).toHaveLength(2);
  });

  it('should have link path "/languagecards" with "Szókártyák" title', () => {
    const text = wrapper.find('a').at(0);
    expect(text.text()).toBe('Szókártyák');
    expect(text.html()).toContain('/languagecards');
  });

  it('should have link path "/othercards" with "Egyéb kártyák" title', () => {
    const text = wrapper.find('a').at(1);
    expect(text.text()).toBe('Egyéb kártyák');
    expect(text.html()).toContain('/othercards');
  });
});
