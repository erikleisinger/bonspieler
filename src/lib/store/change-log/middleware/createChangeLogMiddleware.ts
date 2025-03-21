export const changeLogMiddleware = (store) => (next) => (action) => {
  return next(action);
};

export function createChangeLogMiddleware() {
  return changeLogMiddleware;
}
