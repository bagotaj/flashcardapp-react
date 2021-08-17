import React from 'react';
import { shallow, mount } from 'enzyme';
import Register from '../components/pages/Register/Register';

describe('InputField component existing', () => {
  it('should have an InputField component', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.find('InputField').exists()).toBeTruthy();
  });
});

describe('Register Form - the Look', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Register />);
  });

  it('should have Register title', () => {
    const text = wrapper.find('h2');
    expect(text.text()).toBe('Regisztráció');
  });

  it('should have form', () => {
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
  });

  it('should have two inputfield', () => {
    const input = wrapper.find('input');
    expect(input).toHaveLength(4);
  });

  it('should have last name inputfield', () => {
    const inputLastName = wrapper.find('#lastName').last();
    expect(inputLastName).toHaveLength(1);
  });

  it('should have Last Name label', () => {
    const label = wrapper.find('label[htmlFor="lastName"]');
    expect(label.text()).toBe('Vezetéknév');
  });

  it('should have first name inputfield', () => {
    const inputFirstName = wrapper.find('#firstName').last();
    expect(inputFirstName).toHaveLength(1);
  });

  it('should have First Name label', () => {
    const label = wrapper.find('label[htmlFor="firstName"]');
    expect(label.text()).toBe('Keresztnév');
  });

  it('should have email inputfield', () => {
    const inputEmail = wrapper.find('#email').last();
    expect(inputEmail).toHaveLength(1);
  });

  it('should have Email label', () => {
    const label = wrapper.find('label[htmlFor="email"]');
    expect(label.text()).toBe('Email cím');
  });

  it('should have password inputfield', () => {
    const inputPassword = wrapper.find('#password').last();
    expect(inputPassword).toHaveLength(1);
  });

  it('should have Password label', () => {
    const label = wrapper.find('label[htmlFor="password"]');
    expect(label.text()).toBe('Jelszó');
  });

  it('should have button', () => {
    const label = wrapper.find('button');
    expect(label.text()).toBe('Elküldés');
  });
});
