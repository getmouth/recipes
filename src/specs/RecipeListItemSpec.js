/*eslint-disable */
import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import RecipeListItem from '../components/RecipeListItem';

const testRecipe = {
  id: 1,
  name: 'Test Recipe',
  category: 'Test category',
};

describe('<RecipeListItem />', () => {
  test('Should not break if no recipe passed', () => {
    const component = renderer.create(<RecipeListItem />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Should correctly render recipe', () => {
    const component = renderer.create(<RecipeListItem recipe={testRecipe} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Should render favorited state', () => {
    const component = renderer.create(
      <RecipeListItem recipe={testRecipe} favorited={true} />,
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Should call onClick when clicked', () => {
    const onClick = jest.fn();

    const component = mount(
      <RecipeListItem recipe={testRecipe} onClick={onClick} />,
    );
    component.simulate('click');

    expect(onClick.mock.calls.length).toBe(1);
  });

  test('Should call onFavorited when favorited', () => {
    const onFavorited = jest.fn();

    const component = mount(
      <RecipeListItem recipe={testRecipe} onFavorited={onFavorited} />,
    );
    component.find('div').simulate('click');

    expect(onFavorited.mock.calls.length).toBe(1);
  });

  test('Should call onFavorited when favorited', () => {
    const onFavorited = jest.fn();

    const component = mount(
      <RecipeListItem recipe={testRecipe} onFavorited={onFavorited} />,
    );
    component.find('div').simulate('click');

    expect(onFavorited.mock.calls.length).toBe(1);
  });

  test('Should not call onClick when onFavorited is called', () => {
    const onClick = jest.fn();
    const onFavorited = jest.fn();

    const component = mount(
      <RecipeListItem
        recipe={testRecipe}
        onClick={onClick}
        onFavorited={onFavorited}
      />,
    );
    component.find('div').simulate('click');

    expect(onClick.mock.calls.length).toBe(0);
    expect(onFavorited.mock.calls.length).toBe(1);
  });
});
