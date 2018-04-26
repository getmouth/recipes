import { actionTypes } from '../actions/recipes';

const initialState = [];

const mergeById = (src, dist) =>
  src.concat(dist).reduce((acc, element) => {
    const idx = acc.findIndex(d => d.id === element.id);

    if (idx !== -1) {
      return acc
        .slice(0, idx)
        .concat({ ...acc[idx], ...element })
        .concat(acc.slice(idx + 1));
    }
    return [...acc, element];
  }, []);

const ACTION_HANDLERS = {
  [`${actionTypes.LOAD_RECIPES}_SUCCESS`]: (state, actions) =>
    mergeById(state, actions.data),

  [`${actionTypes.LOAD_RECIPE}_SUCCESS`]: (state, actions) =>
    mergeById(state, [actions.data]),
};

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
