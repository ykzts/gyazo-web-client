async function handleErrorAction(context, payload) {
  context.dispatch('HANDLE_ERROR', payload);
}

export default handleErrorAction;
