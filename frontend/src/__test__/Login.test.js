import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from '../components/pages/Login/Login';

const handleLoggedInUser = jest.fn();
const handleLocalStorage = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/login',
  }),
}));

describe('InputField component existing', () => {
  it('should have an InputField component', () => {
    const wrapper = shallow(
      <Login
        handleLoggedInUser={handleLoggedInUser}
        handleLocalStorage={handleLocalStorage}
      />
    );
    expect(wrapper.find('InputField').exists()).toBeTruthy();
  });
});

describe('Login Form - layout', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Login />);
  });

  it('should have Login title', () => {
    const text = wrapper.find('h2');
    expect(text.text()).toBe('Bejelentkezés');
  });

  it('should have form', () => {
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
  });

  it('should have two inputfield', () => {
    const input = wrapper.find('input');
    expect(input).toHaveLength(2);
  });

  it('should have Email label', () => {
    const label = wrapper.find('label[htmlFor="email"]');
    expect(label.text()).toBe('Email cím');
  });

  it('should have email inputfield', () => {
    const inputEmail = wrapper.find('#email').last();
    expect(inputEmail).toHaveLength(1);
  });

  it('should have Password label', () => {
    const label = wrapper.find('label[htmlFor="password"]');
    expect(label.text()).toBe('Jelszó');
  });

  it('should have password inputfield', () => {
    const inputPassword = wrapper.find('#password').last();
    expect(inputPassword).toHaveLength(1);
  });

  it('should have button', () => {
    const label = wrapper.find('button');
    expect(label.text()).toBe('Belépés');
  });
});
