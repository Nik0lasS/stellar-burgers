import userSlice, {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logout,
  forgotPassword,
  resetPassword,
  checkIsAuth,
  clearUserErrors,
  userInitialState
} from './user-slice';
import { describe, expect, test } from '@jest/globals';

var localStorageMock = (function () {
  var store: Record<string, string> = {};
  return {
    getItem: function (key: string) {
      return store[key];
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key: string) {
      delete store[key];
    }
  };
})();
beforeAll(() => {
  Object.defineProperty(global, 'localStorage', { value: localStorageMock });
});

jest.mock('../../../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

describe('Проверка редьюсеров user-slice', () => {
  describe('Проверка редьюсера registerUser', () => {
    test('Ожидание выполнения запроса', () => {
      const state = userSlice.reducer(
        userInitialState,
        registerUser.pending('', {
          email: '',
          name: '',
          password: ''
        })
      );
      expect(state).toEqual({
        ...userInitialState,
        isLoading: true
      });
    });

    test('Успешное выполение запроса', () => {
      const payload = {
        success: true,
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        user: {
          email: 'payload@gmail.com',
          name: 'Test Test'
        }
      };
      const state = userSlice.reducer(
        userInitialState,
        registerUser.fulfilled(payload, '', {
          email: '',
          name: '',
          password: ''
        })
      );
      expect(state).toEqual({
        ...userInitialState,
        isLoading: false,
        user: payload.user,
        isAuth: true
      });
    });

    test('Ошибка выполнения запроса', () => {
      const error = 'error';
      const state = userSlice.reducer(
        userInitialState,
        registerUser.rejected(new Error(error), '', {
          email: '',
          name: '',
          password: ''
        })
      );
      expect(state).toEqual({
        ...userInitialState,
        isLoading: false,
        error: error
      });
    });
  });
  describe('Проверка редьюсера loginUser', () => {
    test('Ожидание выполнения запроса', () => {
      const state = userSlice.reducer(
        userInitialState,
        loginUser.pending('', {
          email: '',
          password: ''
        })
      );
      expect(state).toEqual({
        ...userInitialState,
        isLoading: true
      });
    });

    test('Успешное выполение запроса', () => {
      const payload = {
        success: true,
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        user: {
          email: 'payload@gmail.com',
          name: 'Test Test'
        }
      };
      const state = userSlice.reducer(
        userInitialState,
        loginUser.fulfilled(payload, '', {
          email: '',
          password: ''
        })
      );
      expect(state).toEqual({
        ...userInitialState,
        isLoading: false,
        user: payload.user,
        isAuth: true
      });
    });

    test('Ошибка выполнения запроса', () => {
      const error = 'error';
      const state = userSlice.reducer(
        userInitialState,
        loginUser.rejected(new Error(error), '', {
          email: '',
          password: ''
        })
      );
      expect(state).toEqual({
        ...userInitialState,
        isLoading: false,
        error: error
      });
    });
  });
  describe('Проверка редьюсера getUser', () => {
    test('Ожидание выполнения запроса', () => {
      const state = userSlice.reducer(userInitialState, getUser.pending(''));
      expect(state).toEqual({
        ...userInitialState,
        isLoading: true
      });
    });

    test('Успешное выполение запроса', () => {
      const payload = {
        success: true,
        user: {
          email: 'payload@gmail.com',
          name: 'Test Test'
        }
      };
      const state = userSlice.reducer(
        userInitialState,
        getUser.fulfilled(payload, '')
      );
      expect(state).toEqual({
        ...userInitialState,
        isLoading: false,
        user: payload.user,
        isAuth: true
      });
    });

    test('Ошибка выполнения запроса', () => {
      const error = 'error';
      const state = userSlice.reducer(
        userInitialState,
        getUser.rejected(new Error(error), '')
      );
      expect(state).toEqual({
        ...userInitialState,
        isLoading: false,
        error: error
      });
    });
  });
  describe('Проверка редьюсера updateUser', () => {
    test('Ожидание выполнения запроса', () => {
      const state = userSlice.reducer(
        userInitialState,
        updateUser.pending('', {
          email: '',
          name: '',
          password: ''
        })
      );
      expect(state).toEqual({
        ...userInitialState,
        isLoading: true
      });
    });

    test('Успешное выполение запроса', () => {
      const payload = {
        success: true,
        user: {
          email: 'payload@gmail.com',
          name: 'Test Test'
        }
      };
      const state = userSlice.reducer(
        userInitialState,
        updateUser.fulfilled(payload, '', {
          email: '',
          name: '',
          password: ''
        })
      );
      expect(state).toEqual({
        ...userInitialState,
        isLoading: false,
        user: payload.user,
        isAuth: true
      });
    });

    test('Ошибка выполнения запроса', () => {
      const error = 'error';
      const state = userSlice.reducer(
        userInitialState,
        updateUser.rejected(new Error(error), '', {
          email: '',
          name: '',
          password: ''
        })
      );
      expect(state).toEqual({
        ...userInitialState,
        isLoading: false,
        error: error
      });
    });
  });
  describe('Проверка редьюсера logout', () => {
    test('Ожидание выполнения запроса', () => {
      const state = userSlice.reducer(userInitialState, logout.pending(''));
      expect(state).toEqual({
        ...userInitialState,
        isLoading: true
      });
    });

    test('Успешное выполение запроса', () => {
      const state = userSlice.reducer(
        userInitialState,
        logout.fulfilled({ success: true }, '')
      );
      expect(state).toEqual({
        ...userInitialState,
        isLoading: false,
        user: null
      });
    });

    test('Ошибка выполнения запроса', () => {
      const error = 'error';
      const state = userSlice.reducer(
        userInitialState,
        logout.rejected(new Error(error), '')
      );
      expect(state).toEqual({
        ...userInitialState,
        isLoading: false,
        error: error
      });
    });
  });
  describe('Проверка редьюсера forgotPassword', () => {
    test('Ожидание выполнения запроса', () => {
      const state = userSlice.reducer(
        userInitialState,
        forgotPassword.pending('', {
          email: ''
        })
      );
      expect(state).toEqual({
        ...userInitialState,
        isLoading: true
      });
    });

    test('Успешное выполение запроса', () => {
      const state = userSlice.reducer(
        userInitialState,
        forgotPassword.fulfilled({ success: true }, '', {
          email: ''
        })
      );
      expect(state).toEqual({
        ...userInitialState,
        isLoading: false
      });
    });

    test('Ошибка выполнения запроса', () => {
      const error = 'error';
      const state = userSlice.reducer(
        userInitialState,
        forgotPassword.rejected(new Error(error), '', {
          email: ''
        })
      );
      expect(state).toEqual({
        ...userInitialState,
        isLoading: false,
        error: error
      });
    });
  });
  describe('Проверка редьюсера resetPassword', () => {
    test('Ожидание выполнения запроса', () => {
      const state = userSlice.reducer(
        userInitialState,
        resetPassword.pending('', {
          password: '',
          token: ''
        })
      );
      expect(state).toEqual({
        ...userInitialState,
        isLoading: true
      });
    });

    test('Успешное выполение запроса', () => {
      const state = userSlice.reducer(
        userInitialState,
        resetPassword.fulfilled({ success: true }, '', {
          password: '',
          token: ''
        })
      );
      expect(state).toEqual({
        ...userInitialState,
        isLoading: false
      });
    });

    test('Ошибка выполнения запроса', () => {
      const error = 'error';
      const state = userSlice.reducer(
        userInitialState,
        resetPassword.rejected(new Error(error), '', {
          password: '',
          token: ''
        })
      );
      expect(state).toEqual({
        ...userInitialState,
        isLoading: false,
        error: error
      });
    });
  });
  test('Проверка редьюсера checkIsAuth', () => {
    const state = userSlice.reducer(
      { ...userInitialState, isAuthChecked: true },
      checkIsAuth()
    );
    expect(state).toEqual({
      ...userInitialState,
      isAuthChecked: true
    });
  });
  test('Проверка редьюсера clearUserErrors', () => {
    const state = userSlice.reducer(
      { ...userInitialState, error: 'error' },
      clearUserErrors()
    );
    expect(state).toEqual({
      ...userInitialState,
      error: null
    });
  });
});
