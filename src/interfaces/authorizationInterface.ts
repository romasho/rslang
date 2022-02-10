interface IAuthorizationState {
  regName: {
    value: string;
    errMessage: string;
  };
  regEmail: {
    value: string;
    errMessage: string;
  };
  regPassword: {
    value: string;
    errMessage: string;
  };
  logEmail: {
    value: string;
    errMessage: string;
  };
  logPassword: {
    value: string;
    errMessage: string;
  };
}

interface IAction {
  type: 'set-field-value' | 'set-err-message';
  payload: {
    name: string;
    value: string;
  }
}

export type { IAuthorizationState, IAction }